import React, { useRef, useState, useEffect, useMemo } from "react";
import styles from "./DotGrid.module.css";

const DOT_SIZE = 4;
const DOT_GAP = 36;
const BASE_HOVER_RADIUS = 200; // DAHA GENİŞ HOVER ALANI!
const MAX_GROWTH = 4;

const GRAY = "#222";

// Gradient renkleri
const gradientStops = [
  { stop: 0, color: [199, 226, 84] },    // #C7E254
  { stop: 0.5, color: [218, 199, 240] }, // #DAC7F0
  { stop: 1, color: [70, 51, 140] }      // #46338C
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

type Dot = {
  x: number;
  y: number;
  baseRadius: number;
};



const generateDots = (width: number, height: number) => {
  const dots: Dot[] = [];
  const cols = Math.floor(width / DOT_GAP);
  const rows = Math.floor(height / DOT_GAP);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      dots.push({
        x: i * DOT_GAP,
        y: j * DOT_GAP,
        baseRadius: DOT_SIZE,
      });
    }
  }
  return dots;
};

const DotGrid: React.FC = () => {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const svgRef = useRef<SVGSVGElement>(null);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Renk haritası: "green", "purple" veya "gray"
  const { dots, colorMap } = useMemo(() => {
    const d = generateDots(window.innerWidth, window.innerHeight);
    const cm: string[] = [];
    for (let i = 0; i < d.length; i++) {
      const rand = Math.random();
      if (rand < 0.55) {
        cm.push(Math.random() > 0.5 ? "green" : "purple");
      } else {
        cm.push("gray");
      }
    }
    return { dots: d, colorMap: cm };
  }, []);

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mouse) {
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
  }, [mouse, size]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setMouse(pos);
  };

  const handleMouseLeave = () => {
    setMouse(null);
    setParallax({ x: 0, y: 0 });
  };

  // SABİT VE GENİŞ HOVER RADIUS!
  const dynamicHoverRadius = BASE_HOVER_RADIUS;

  // 1. Etkilenen noktaları bul ve sırala
  let hoverDots: { idx: number; x: number; y: number }[] = [];
  if (mouse) {
    dots.forEach((dot, idx) => {
      const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
      if (dist < dynamicHoverRadius) {
        hoverDots.push({ idx, x: dot.x, y: dot.y });
      }
    });
    hoverDots.sort((a, b) => a.x - b.x);
  }

  // 2. HoverDot'lar için gradient aralığına göre fill ata
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

  // En yakın noktayı bul
  let nearestIdx = -1;
  let nearestDist = Infinity;
  if (mouse) {
    dots.forEach((dot, idx) => {
      const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = idx;
      }
    });
  }

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
        display: "block"
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

          return (
            <circle
              key={idx}
              cx={dot.x}
              cy={dot.y}
              r={radius}
              fill={fill}
              style={{ transition: "r 0.18s, fill 0.2s" }}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default DotGrid;