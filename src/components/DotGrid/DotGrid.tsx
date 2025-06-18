import React, { useRef, useState, useEffect, useMemo } from "react";
import styles from "./DotGrid.module.css";

const DOT_SIZE = 4;
const DOT_GAP = 36;
const BASE_HOVER_RADIUS = 80;
const MAX_EXTRA_RADIUS = 100;
const MAX_GROWTH = 4;

const GREEN_GRAD_ID = "greenDotGradient";
const PURPLE_GRAD_ID = "purpleDotGradient";

const COLORS = [
  "green",   // yeşil nokta
  "purple"   // mor nokta
];
const GRAY = "#222";

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
  const [prevMouse, setPrevMouse] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Renk haritası: "green", "purple" veya "gray"
  const { dots, colorMap } = useMemo(() => {
    const d = generateDots(window.innerWidth, window.innerHeight);
    const cm: string[] = [];
    for (let i = 0; i < d.length; i++) {
      const rand = Math.random();
      if (rand < 0.55) {
        cm.push(COLORS[Math.random() > 0.5 ? 1 : 0]); // green veya purple
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
    if (!mouse || !prevMouse) return;
    const dx = mouse.x - prevMouse.x;
    const dy = mouse.y - prevMouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setMouseSpeed(distance);

    const timeout = setTimeout(() => setPrevMouse(mouse), 16);
    return () => clearTimeout(timeout);
  }, [mouse]);

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
    if (!prevMouse) setPrevMouse(pos);
  };

  const handleMouseLeave = () => {
    setMouse(null);
    setPrevMouse(null);
    setMouseSpeed(0);
    setParallax({ x: 0, y: 0 });
  };

  const normalizedSpeed = Math.min(mouseSpeed, 80) / 80;
  const dynamicHoverRadius = BASE_HOVER_RADIUS + normalizedSpeed * MAX_EXTRA_RADIUS;

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
      {/* Gradient tanımları */}
      <defs>
        <linearGradient id={GREEN_GRAD_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a8e063" />
          <stop offset="100%" stopColor="#56ab2f" />
        </linearGradient>
        <linearGradient id={PURPLE_GRAD_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3c1053" />
          <stop offset="100%" stopColor="#ad5389" />
        </linearGradient>
      </defs>
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

          // Nokta renkli ise hover'a tepki verir, gri ise sabit kalır
          if (colorMap[idx] === "green" || colorMap[idx] === "purple") {
            if (mouse) {
              const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
              if (dist < dynamicHoverRadius) {
                const falloff = 1 - dist / dynamicHoverRadius;
                if (idx === nearestIdx) {
                  radius += MAX_GROWTH;
                } else {
                  radius += MAX_GROWTH * 0.6 * falloff;
                }
                fill = colorMap[idx] === "green"
                  ? `url(#${GREEN_GRAD_ID})`
                  : `url(#${PURPLE_GRAD_ID})`;
              } else {
                // Hover dışında renkli noktalar yine düz GRAY gözüksün ister misin? 
                // Yoksa hover dışında da gradient mi olsun? 
                // Eğer gradient istersen aşağıdaki satırı aç:
                // fill = colorMap[idx] === "green" ? `url(#${GREEN_GRAD_ID})` : `url(#${PURPLE_GRAD_ID})`;
              }
            }
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