"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type CinematicErrorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CinematicErrorShape = "default" | "square" | "rounded" | "sharp";
export type CinematicErrorSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type CinematicErrorTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone" | "simple";
export type CinematicErrorVariant = "solid" | "outline" | "ghost" | "link";

export interface CinematicErrorProps {
  errorCode?: string;
  title?: string;
  description?: string;
  onBack?: () => void;
  className?: string;
  color?: CinematicErrorColor;
  shape?: CinematicErrorShape;
  spacing?: CinematicErrorSpacing;
  theme?: CinematicErrorTheme;
  variant?: CinematicErrorVariant;
}

const colorThemeMap: Record<CinematicErrorColor, { radial: string; bg: string; text: string; bgSoft: string; border: string; shadow: string; brutalShadow: string; brutalBg: string; hoverBg: string; textHover: string; glow: string; }> = {
  default: { radial: "rgba(128,128,128,0.5)", bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]", brutalBg: "bg-white dark:bg-zinc-900 border-foreground text-foreground", hoverBg: "hover:bg-primary", textHover: "hover:text-primary-foreground", glow: "shadow-[0_0_40px_-10px_rgba(128,128,128,0.5)]" },
  blue: { radial: "#2563eb", bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/10 dark:shadow-blue-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]", brutalBg: "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400 text-white", hoverBg: "hover:bg-blue-600 dark:hover:bg-blue-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]" },
  emerald: { radial: "#16a34a", bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/10 dark:shadow-emerald-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]", brutalBg: "bg-emerald-400 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-400 text-white", hoverBg: "hover:bg-emerald-600 dark:hover:bg-emerald-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]" },
  rose: { radial: "#e11d48", bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/10 dark:shadow-rose-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(225,29,72,1)]", brutalBg: "bg-rose-400 dark:bg-rose-600 border-rose-600 dark:border-rose-400 text-white", hoverBg: "hover:bg-rose-600 dark:hover:bg-rose-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)]" },
  amber: { radial: "#d97706", bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/10 dark:shadow-amber-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(217,119,6,1)]", brutalBg: "bg-amber-400 dark:bg-amber-600 border-amber-600 dark:border-amber-400 text-white", hoverBg: "hover:bg-amber-600 dark:hover:bg-amber-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)]" },
  violet: { radial: "#7c3aed", bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/10 dark:shadow-violet-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]", brutalBg: "bg-violet-400 dark:bg-violet-600 border-violet-600 dark:border-violet-400 text-white", hoverBg: "hover:bg-violet-600 dark:hover:bg-violet-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]" },
  indigo: { radial: "#4f46e5", bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/10 dark:shadow-indigo-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]", brutalBg: "bg-indigo-400 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-400 text-white", hoverBg: "hover:bg-indigo-600 dark:hover:bg-indigo-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]" },
  sky: { radial: "#0284c7", bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/10 dark:shadow-sky-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(2,132,199,1)]", brutalBg: "bg-sky-400 dark:bg-sky-600 border-sky-600 dark:border-sky-400 text-white", hoverBg: "hover:bg-sky-600 dark:hover:bg-sky-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(2,132,199,0.5)]" },
  slate: { radial: "#475569", bg: "bg-slate-600 dark:bg-slate-400", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/10 dark:shadow-slate-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(71,85,105,1)]", brutalBg: "bg-slate-400 dark:bg-slate-600 border-slate-600 dark:border-slate-400 text-white", hoverBg: "hover:bg-slate-600 dark:hover:bg-slate-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(71,85,105,0.5)]" },
  orange: { radial: "#ea580c", bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/10 dark:shadow-orange-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(234,88,12,1)]", brutalBg: "bg-orange-400 dark:bg-orange-600 border-orange-600 dark:border-orange-400 text-white", hoverBg: "hover:bg-orange-600 dark:hover:bg-orange-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]" },
};

const getShapeClass = (shape: CinematicErrorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-full";
  }
};

const getContainerShapeClass = (shape: CinematicErrorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-lg";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-3xl"; // Avoids turning full-width wrapper into a circle
  }
};

const getSpacingClass = (spacing: CinematicErrorSpacing) => {
  switch (spacing) {
    case "2x": return "mt-4 gap-4";
    case "4x": return "mt-6 gap-5";
    case "6x": return "mt-8 gap-6";
    case "8x": return "mt-12 gap-8";
    default: return "mt-8 gap-6";
  }
};

export const CinematicError: React.FC<CinematicErrorProps> = React.memo(({
  errorCode = "404",
  title = "Lost in the void",
  description = "The reality you are looking for has collapsed or never existed in this timeline.",
  onBack,
  className,
  color = "default",
  shape = "default",
  spacing = "default",
  theme = "modern",
  variant = "solid"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid cinematic movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Transforms for parallax
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  const textX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const glowX = useTransform(smoothX, [-1, 1], [-60, 60]);
  const glowY = useTransform(smoothY, [-1, 1], [-60, 60]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width * 2 - 1;
    const y = (e.clientY - top) / height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isLink = variant === "link";
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";
  const isSolid = variant === "solid" || (!isLink && !isOutline && !isGhost);

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const spacingClass = getSpacingClass(spacing);

  const is3D = theme === "modern" || theme === "futuristic" || theme === "default";

  const errorSizeClass = 
    isLink ? "text-[60px] md:text-[100px]" :
    (theme === "clean" || theme === "simple") ? "text-[100px] md:text-[200px]" :
    (theme === "modern" || theme === "default" || theme === "halftone") ? "text-[140px] md:text-[280px]" :
    "text-[120px] md:text-[240px]";

  const backgrounds = (
    <>
      {(theme === "modern" || theme === "default") && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            className="absolute inset-0 opacity-40 dark:opacity-20 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeTheme.radial} 0%, transparent 50%)`,
              x: glowX,
              y: glowY,
            }}
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[80px]" />
        </div>
      )}

      {theme === "futuristic" && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background">
          <div 
            className={cn("absolute inset-0 opacity-20", activeTheme.text)} 
            style={{ 
              backgroundSize: '40px 40px', 
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)` 
            }} 
          />
          <motion.div 
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeTheme.radial} 0%, transparent 60%)`,
              x: glowX, y: glowY,
            }}
          />
        </div>
      )}

      {theme === "brutal" && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-background">
          <div className={cn("absolute inset-0 opacity-10", activeTheme.bg)} style={{ backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 2px, transparent 2px, transparent 10px)` }} />
        </div>
      )}

      {theme === "halftone" && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-background">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${activeTheme.radial} 2px, transparent 2px)`, backgroundSize: '16px 16px' }} />
        </div>
      )}

      {theme === "clean" && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-background" />
      )}

      {theme === "simple" && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-background" />
      )}
    </>
  );

  const ErrorText = () => (
    <motion.div
      style={is3D ? { x: textX, y: textY } : {}}
      className="relative"
    >
      {theme === "futuristic" ? (
        <div className="relative">
          <h1 className={cn(`${errorSizeClass} font-black leading-none tracking-tighter mix-blend-screen animate-pulse`, activeTheme.text)} style={{ textShadow: `4px 0px 0px rgba(255,0,0,0.5), -4px 0px 0px rgba(0,255,255,0.5)` }}>
            {errorCode}
          </h1>
          <h1 className={cn(`absolute inset-0 ${errorSizeClass} font-black leading-none tracking-tighter blur-xl mix-blend-screen opacity-50`, activeTheme.text)}>
            {errorCode}
          </h1>
        </div>
      ) : theme === "brutal" ? (
        <h1 className={cn(`${errorSizeClass} font-black leading-none tracking-tighter uppercase border-b-8`, !isLink && "mb-4 pb-2", activeTheme.text, activeTheme.border)} style={{ textShadow: activeTheme.brutalShadow.replace('shadow-', '') }}>
          {errorCode}
        </h1>
      ) : theme === "clean" || theme === "simple" ? (
        <h1 className={`${errorSizeClass} font-light leading-none tracking-tight text-foreground opacity-90 select-none`}>
          {errorCode}
        </h1>
      ) : (
        // modern / halftone / default
        <>
          <h1 className={`${errorSizeClass} font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-transparent opacity-90 drop-shadow-2xl select-none`}>
            {errorCode}
          </h1>
          <h1 className={cn(`absolute top-0 left-0 w-full text-center ${errorSizeClass} font-black leading-none tracking-tighter blur-[60px] opacity-30 select-none -z-10 mix-blend-screen pointer-events-none`, activeTheme.text)}>
            {errorCode}
          </h1>
        </>
      )}
    </motion.div>
  );

  const DescriptionText = () => (
    <div className={cn("space-y-2 text-center", isLink && "text-left space-y-1")}>
      <h2 className={cn("text-2xl md:text-4xl font-bold tracking-tight text-foreground", isLink && "text-xl md:text-2xl", theme === "clean" && "font-medium", theme === "brutal" && "uppercase font-black text-3xl md:text-5xl", theme === "brutal" && isLink && "text-2xl md:text-3xl", theme === "futuristic" && "font-mono tracking-widest uppercase")}>
        {title}
      </h2>
      <p className={cn("text-muted-foreground text-sm md:text-base leading-relaxed", isLink && "text-xs md:text-sm max-w-sm", theme === "brutal" && "font-bold text-foreground", theme === "futuristic" && "font-mono text-xs")}>
        {description}
      </p>
    </div>
  );

  const ActionButton = () => (
    <button
      onClick={onBack}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 font-semibold transition-all duration-300 cursor-pointer h-12 text-sm",
        shapeClass,
        // Spacing modifiers applied for the button
        spacing === "2x" ? "px-6 h-10 text-xs" : spacing === "6x" ? "px-10 h-14 text-base" : spacing === "8x" ? "px-12 h-16 text-lg" : "px-8 h-12 text-sm",
        isLink ? "bg-transparent border-0 shadow-none hover:bg-transparent underline underline-offset-4" : "",
        // Theme logic
        theme === "brutal" && !isLink ? cn("border-4 border-foreground font-black uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]", activeTheme.brutalBg, "active:translate-x-[4px] active:translate-y-[4px]") :
        theme === "futuristic" && !isLink ? cn("border border-dashed hover:scale-105 font-mono uppercase tracking-widest bg-black/50 text-white backdrop-blur-md", activeTheme.border, activeTheme.glow) :
        theme === "clean" && !isLink ? cn("border-none hover:-translate-y-1 font-medium bg-transparent", activeTheme.text, "hover:opacity-70") :
        theme === "simple" && !isLink ? cn("transition-all hover:-translate-y-0.5 hover:shadow-lg", color === "default" ? "bg-foreground text-background" : cn(activeTheme.bg, "text-white", activeTheme.glow)) :
        !isLink ? cn("border backdrop-blur-md shadow-xl hover:scale-105 active:scale-95", activeTheme.bgSoft, activeTheme.text, activeTheme.border, activeTheme.hoverBg, activeTheme.textHover, activeTheme.shadow) :
        cn(activeTheme.text, activeTheme.textHover) // link text hover
      )}
    >
      {!isLink && (
        <span className="absolute top-0 left-0 h-full w-[40%] pointer-events-none bg-gradient-to-r from-transparent via-foreground/20 to-transparent group-hover:animate-[shimmer_2s_ease-in-out_infinite]" style={{ transform: "translateX(-200%) skewX(-15deg)" }} />
      )}
      <ArrowLeft className={cn("w-4 h-4 transition-transform duration-300", theme !== "brutal" && !isLink && "group-hover:-translate-x-1")} />
      Return Home
    </button>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden min-h-[500px]",
        (isSolid || isOutline) ? "bg-background" : "bg-transparent",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {isSolid && backgrounds}

      {isOutline ? (
        <div className={cn(
          "relative z-10 flex flex-col items-center justify-center w-full h-full border-2 backdrop-blur-md overflow-hidden shadow-2xl",
          activeTheme.border, activeTheme.bgSoft, getContainerShapeClass(shape)
        )}>
          {backgrounds}
          <motion.div style={is3D ? { rotateX, rotateY } : {}} className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8 md:p-24">
            <ErrorText />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className={cn("flex flex-col items-center max-w-md relative z-20 mt-8", spacingClass)}>
              <DescriptionText />
              <ActionButton />
            </motion.div>
          </motion.div>
        </div>
      ) : isLink ? (
        <motion.div style={is3D ? { rotateX, rotateY } : {}} className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full px-8 md:px-16 gap-8 md:gap-16">
          <ErrorText />
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1 }} className={cn("flex flex-col items-center md:items-start max-w-md relative z-20", spacingClass)}>
            <DescriptionText />
            <ActionButton />
          </motion.div>
        </motion.div>
      ) : isGhost ? (
        <motion.div style={is3D ? { rotateX, rotateY } : {}} className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 opacity-80 hover:opacity-100 transition-opacity duration-700">
          <ErrorText />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className={cn("flex flex-col items-center max-w-md relative z-20", spacingClass)}>
            <DescriptionText />
            <ActionButton />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div style={is3D ? { rotateX, rotateY } : {}} className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <ErrorText />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className={cn("flex flex-col items-center max-w-md relative z-20", spacingClass)}>
            <DescriptionText />
            <ActionButton />
          </motion.div>
        </motion.div>
      )}

      {(isSolid || isOutline) && (
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none mix-blend-overlay z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      
      {/* Tailwind keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0%, 10% {
            transform: translateX(-200%) skewX(-15deg);
          }
          90%, 100% {
            transform: translateX(400%) skewX(-15deg);
          }
        }
      `}</style>
    </div>
  );
});
CinematicError.displayName = "CinematicError";