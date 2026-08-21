"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils"

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

export type ParticlesColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const colorThemeMap: Record<ParticlesColor, { hex: string }> = {
  default: { hex: "#ffffff" }, // or black based on theme Adaptive later
  blue: { hex: "#3b82f6" },
  emerald: { hex: "#10b981" },
  rose: { hex: "#f43f5e" },
  amber: { hex: "#f59e0b" },
  violet: { hex: "#8b5cf6" },
  indigo: { hex: "#6366f1" },
  sky: { hex: "#0ea5e9" },
  slate: { hex: "#64748b" },
  orange: { hex: "#f97316" },
};

export interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: ParticlesColor | (string & {});
  vx?: number;
  vy?: number;
  themeAdaptive?: boolean;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export const Particles: React.FC<ParticlesProps> = React.memo(({
          className = "",
          quantity = 100,
          staticity = 50,
          ease = 50,
          size = 0.4,
          refresh = false,
          color = "default",
          vx = 0,
          vy = 0,
          themeAdaptive = true,
          ...props
        }) => {
          const canvasRef = useRef<HTMLCanvasElement>(null)
          const canvasContainerRef = useRef<HTMLDivElement>(null)
          const context = useRef<CanvasRenderingContext2D | null>(null)
          const circles = useRef<Circle[]>([])
          const mouse = useRef({ x: 0, y: 0 })
          const canvasSize = useRef({ w: 0, h: 0 })
          const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
          const rafID = useRef<number | null>(null)
          const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
          
          const initCanvasRef = useRef<() => void>(() => { })
          const animateRef = useRef<() => void>(() => { })

          const resolvedColorWithVariant = (colorThemeMap as Record<string, { hex: string }>)[color]?.hex || color;

          const [resolvedColor, setResolvedColor] = React.useState(resolvedColorWithVariant || "#ffffff");

          useEffect(() => {
            if (resolvedColorWithVariant && !themeAdaptive) {
              setResolvedColor(resolvedColorWithVariant);
              return;
            }

            const updateColor = () => {
              const isDark = document.documentElement.classList.contains("dark");
              if (color === "default") {
                setResolvedColor(isDark ? "#ffffff" : "#000000");
              } else {
                setResolvedColor(isDark ? (resolvedColorWithVariant || "#ffffff") : (resolvedColorWithVariant || "#000000"));
              }
            };

            updateColor();

            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                  updateColor();
                }
              });
            });

            observer.observe(document.documentElement, { attributes: true });

            return () => observer.disconnect();
          }, [resolvedColorWithVariant, themeAdaptive, color]);

          const rgb = useMemo(() => hexToRgb(resolvedColor), [resolvedColor])

          const circleParams = (): Circle => {
            const x = Math.floor(Math.random() * canvasSize.current.w)
            const y = Math.floor(Math.random() * canvasSize.current.h)
            const translateX = 0
            const translateY = 0
            const pSize = Math.floor(Math.random() * 2) + size
            const alpha = 0
            const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
            const dx = (Math.random() - 0.5) * 0.1
            const dy = (Math.random() - 0.5) * 0.1
            const magnetism = 0.1 + Math.random() * 4
            return {
              x,
              y,
              translateX,
              translateY,
              size: pSize,
              alpha,
              targetAlpha,
              dx,
              dy,
              magnetism,
            }
          }

          const drawCircle = (circle: Circle, update = false) => {
            if (context.current) {
              const { x, y, translateX, translateY, size, alpha } = circle
              context.current.translate(translateX, translateY)
              context.current.beginPath()
              context.current.arc(x, y, size, 0, 2 * Math.PI)
              context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
              context.current.fill()
              context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

              if (!update) {
                circles.current.push(circle)
              }
            }
          }

          const clearContext = () => {
            if (context.current) {
              context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
            }
          }

          const drawParticles = () => {
            clearContext()
            const particleCount = quantity
            for (let i = 0; i < particleCount; i++) {
              const circle = circleParams()
              drawCircle(circle)
            }
          }

          const resizeCanvas = () => {
            if (canvasContainerRef.current && canvasRef.current && context.current) {
              canvasSize.current.w = canvasContainerRef.current.offsetWidth
              canvasSize.current.h = canvasContainerRef.current.offsetHeight

              canvasRef.current.width = canvasSize.current.w * dpr
              canvasRef.current.height = canvasSize.current.h * dpr
              canvasRef.current.style.width = `${canvasSize.current.w}px`
              canvasRef.current.style.height = `${canvasSize.current.h}px`
              context.current.setTransform(1, 0, 0, 1, 0, 0)
              context.current.scale(dpr, dpr)

              circles.current = []
              for (let i = 0; i < quantity; i++) {
                const circle = circleParams()
                drawCircle(circle)
              }
            }
          }

          const initCanvas = () => {
            resizeCanvas()
            drawParticles()
          }

          const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
            const remapped =
              ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
            return remapped > 0 ? remapped : 0
          }

          const animate = () => {
            clearContext()
            circles.current.forEach((circle, i) => {
              const edge = [
                circle.x + circle.translateX - circle.size, 
                canvasSize.current.w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                canvasSize.current.h - circle.y - circle.translateY - circle.size,
              ]
              const closestEdge = edge.reduce((a, b) => Math.min(a, b))
              const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
              if (remapClosestEdge > 1) {
                circle.alpha += 0.02
                if (circle.alpha > circle.targetAlpha) {
                  circle.alpha = circle.targetAlpha
                }
              } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge
              }
              circle.x += circle.dx + vx
              circle.y += circle.dy + vy
              circle.translateX +=
                (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
                ease
              circle.translateY +=
                (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
                ease

              drawCircle(circle, true)

              if (
                circle.x < -circle.size ||
                circle.x > canvasSize.current.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.current.h + circle.size
              ) {
                circles.current.splice(i, 1)
                const newCircle = circleParams()
                drawCircle(newCircle)
              }
            })
            rafID.current = window.requestAnimationFrame(animateRef.current)
          }

          useEffect(() => {
            initCanvasRef.current = initCanvas
            animateRef.current = animate
          })

          useEffect(() => {
            if (canvasRef.current) {
              context.current = canvasRef.current.getContext("2d")
            }
            initCanvasRef.current()
            animateRef.current()

            const handleResize = () => {
              if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current)
              }
              resizeTimeout.current = setTimeout(() => {
                initCanvasRef.current()
              }, 50)
            }

            const resizeObserver = new ResizeObserver(() => {
              handleResize()
            })

            if (canvasContainerRef.current) {
              resizeObserver.observe(canvasContainerRef.current)
            }

            const handleMouseMove = (event: MouseEvent) => {
              if (!canvasRef.current) return;

              const rect = canvasRef.current.getBoundingClientRect();
              const { w, h } = canvasSize.current;

              const x = event.clientX - rect.left - w / 2;
              const y = event.clientY - rect.top - h / 2;

              const inside =
                x < w / 2 &&
                x > -w / 2 &&
                y < h / 2 &&
                y > -h / 2;

              if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
              }
            };

            window.addEventListener("mousemove", handleMouseMove, { passive: true });

            return () => {
              if (rafID.current != null) {
                window.cancelAnimationFrame(rafID.current)
              }
              if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current)
              }
              resizeObserver.disconnect()
              window.removeEventListener("mousemove", handleMouseMove)
            };
          }, [resolvedColor, vx, vy, quantity, staticity, ease, size])

          useEffect(() => {
            initCanvasRef.current()
          }, [refresh])



          return (
            <div
              ref={canvasContainerRef}
              aria-hidden="true"
              {...props}
              className={cn(
                "pointer-events-none relative w-full h-full overflow-hidden",
                className
              )}
            >
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          );
        })
Particles.displayName = "Particles";
Particles.displayName = "Particles";