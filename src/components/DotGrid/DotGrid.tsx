import React, { useRef, useState, useEffect, useMemo } from "react";
import styles from "./DotGrid.module.css";

const DOT_SIZE = 4;
const DOT_GAP = 36;
const BASE_HOVER_RADIUS = 200;
const MAX_GROWTH = 4;
const GRAY = "#222";

const gradientStops = [
  { stop: 0, color: [199, 226, 84] },
  { stop: 0.5, color: [218, 199, 240] },
  { stop: 1, color: [70, 51, 140] }
];

function lerpColor(a: number[], b: number[], t: number) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function getGradientColor(stops: typeof gradientStops, t: number) {
  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i], s1 = stops[i + 1];
    if (t >= s0.stop && t <= s1.stop) {
      const localT = (t - s0.stop) / (s1.stop - s0.stop);
      const c = lerpColor(s0.color, s1.color, localT);
      return `rgb(${c[0]},${c[1]},${c[2]})`;
    }
  }
  const c = stops[stops.length - 1].color;
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function blend(a: string, b: string, alpha: number) {
  const re = /rgb\((\d+),(\d+),(\d+)\)/;
  const ma = a.match(re);
  const mb = b.match(re);
  if (ma && mb) {
    const ar = parseInt(ma[1]), ag = parseInt(ma[2]), ab = parseInt(ma[3]);
    const br = parseInt(mb[1]), bg = parseInt(mb[2]), bb = parseInt(mb[3]);
    return `rgb(${Math.round(ar * (1 - alpha) + br * alpha)},${Math.round(
      ag * (1 - alpha) + bg * alpha
    )},${Math.round(ab * (1 - alpha) + bb * alpha)})`;
  }
  return b;
}

type Dot = {
  x: number;
  y: number;
  baseRadius: number;
};

const generateDots = (width: number, height: number) => {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / DOT_GAP);
  const rows = Math.ceil(height / DOT_GAP);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * DOT_GAP;
      const y = j * DOT_GAP;
      if (x <= width && y <= height) {
        dots.push({
          x,
          y,
          baseRadius: DOT_SIZE,
        });
      }
    }
  }
  return dots;
};

const MOBILE_MAX_WIDTH = 700;

const DotGrid: React.FC = () => {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const svgRef = useRef<SVGSVGElement>(null);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_MAX_WIDTH);

  const { dots } = useMemo(() => {
    const d = generateDots(size.width, size.height);
    return { dots: d };
  }, [size.width, size.height]);

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => setScrollY(window.scrollY || window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!mouse || isMobile) {
      setParallax({ x: 0, y: 0 });
      return;
    }
    const center = { x: size.width / 2, y: size.height / 2 };
    const relX = (mouse.x - center.x) / center.x;
    const relY = (mouse.y - center.y) / center.y;
    const maxShift = 20;
    setParallax({
      x: relX * maxShift,
      y: relY * maxShift,
    });
  }, [mouse, size, isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setMouse(pos);
  };

  const handleMouseLeave = () => {
    setMouse(null);
    setParallax({ x: 0, y: 0 });
  };

  let hoverDots: { idx: number; x: number; y: number }[] = [];
  const dynamicHoverRadius = BASE_HOVER_RADIUS;
  if (mouse && !isMobile) {
    dots.forEach((dot, idx) => {
      const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
      if (dist < dynamicHoverRadius) {
        hoverDots.push({ idx, x: dot.x, y: dot.y });
      }
    });
    hoverDots.sort((a, b) => a.x - b.x);
  }

  const hoverDotColorMap: { [idx: number]: string } = {};
  if (hoverDots.length > 1) {
    const minX = hoverDots[0].x;
    const maxX = hoverDots[hoverDots.length - 1].x;
    const range = maxX - minX || 1;
    hoverDots.forEach((hd) => {
      const t = (hd.x - minX) / range;
      hoverDotColorMap[hd.idx] = getGradientColor(gradientStops, t);
    });
  }

  let nearestIdx = -1;
  let nearestDist = Infinity;
  if (mouse && !isMobile) {
    dots.forEach((dot, idx) => {
      const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = idx;
      }
    });
  }

  // Dalga grid altından DOT_GAP+fadeLen kadar aşağıdan başlasın!
  const fadeLen = isMobile ? 30 : 80; // mobilde daha hızlı renklenir!
  const gridBottom = dots.length > 0 ? Math.max(...dots.map(dot => dot.y)) : size.height;
  const waveY = gridBottom + DOT_GAP + fadeLen - scrollY;

  return (
    <svg
      ref={svgRef}
      width={size.width}
      height={size.height}
      className={styles.dotGrid}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "auto"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <g
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          transition: "transform 0.25s cubic-bezier(.42,0,.58,1)",
          willChange: "transform",
        }}
      >
        {dots.map((dot, idx) => {
          let radius = dot.baseRadius;
          let fill = GRAY;

          if (isMobile) {
            const t = dot.x / size.width;
            const gradColor = getGradientColor(gradientStops, t);

            if (dot.y < waveY - fadeLen) {
              fill = GRAY;
            } else if (dot.y < waveY) {
              const fade = (dot.y - (waveY - fadeLen)) / fadeLen;
              fill = blend(GRAY, gradColor, fade);
            } else {
              fill = gradColor;
            }
          } else {
            if (hoverDotColorMap[idx]) {
              if (idx === nearestIdx) {
                radius += MAX_GROWTH;
              } else {
                const dist = Math.hypot(dot.x - mouse!.x, dot.y - mouse!.y);
                const falloff = 1 - dist / dynamicHoverRadius;
                radius += MAX_GROWTH * 0.6 * falloff;
              }
              fill = hoverDotColorMap[idx];
            }
          }

          return (
            <circle
              key={idx}
              cx={dot.x}
              cy={dot.y}
              r={radius}
              fill={fill}
              style={{ transition: "r 0.18s, fill 0.5s" }}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default DotGrid;