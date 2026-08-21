"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type ExpandingCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ExpandingCardShape = "default" | "square" | "rounded" | "sharp";
export type ExpandingCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type ExpandingCardTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type ExpandingCardVariant = "solid" | "outline" | "ghost" | "link";

export interface ExpandingCardOption {
  id: string | number;
  img: string;
  icon: React.ReactNode;
  main: string;
  sub: string;
}

export interface ExpandingFlexCardProps {
  options?: ExpandingCardOption[];
  className?: string;
  color?: ExpandingCardColor;
  shape?: ExpandingCardShape;
  spacing?: ExpandingCardSpacing;
  theme?: ExpandingCardTheme;
  variant?: ExpandingCardVariant;
}

const colorThemeMap: Record<ExpandingCardColor, { bg: string; text: string; iconBg: string; iconText: string; gradient: string; border: string }> = {
  default: { bg: "bg-white/70 dark:bg-black/50", border: "border-white/50 dark:border-white/10", text: "text-slate-900 dark:text-white", iconBg: "bg-white dark:bg-white", iconText: "text-slate-900 dark:text-black", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  blue: { bg: "bg-blue-600/80 dark:bg-blue-900/80", border: "border-blue-500/50 dark:border-blue-700/50", text: "text-white", iconBg: "bg-blue-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  emerald: { bg: "bg-emerald-600/80 dark:bg-emerald-900/80", border: "border-emerald-500/50 dark:border-emerald-700/50", text: "text-white", iconBg: "bg-emerald-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  rose: { bg: "bg-rose-600/80 dark:bg-rose-900/80", border: "border-rose-500/50 dark:border-rose-700/50", text: "text-white", iconBg: "bg-rose-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  amber: { bg: "bg-amber-500/80 dark:bg-amber-900/80", border: "border-amber-400/50 dark:border-amber-700/50", text: "text-white", iconBg: "bg-amber-400", iconText: "text-slate-900", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  violet: { bg: "bg-violet-600/80 dark:bg-violet-900/80", border: "border-violet-500/50 dark:border-violet-700/50", text: "text-white", iconBg: "bg-violet-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  indigo: { bg: "bg-indigo-600/80 dark:bg-indigo-900/80", border: "border-indigo-500/50 dark:border-indigo-700/50", text: "text-white", iconBg: "bg-indigo-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  sky: { bg: "bg-sky-500/80 dark:bg-sky-900/80", border: "border-sky-400/50 dark:border-sky-700/50", text: "text-white", iconBg: "bg-sky-400", iconText: "text-slate-900", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  slate: { bg: "bg-slate-600/80 dark:bg-slate-900/80", border: "border-slate-500/50 dark:border-slate-700/50", text: "text-white", iconBg: "bg-slate-500", iconText: "text-white", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" },
  orange: { bg: "bg-orange-500/80 dark:bg-orange-900/80", border: "border-orange-400/50 dark:border-orange-700/50", text: "text-white", iconBg: "bg-orange-400", iconText: "text-slate-900", gradient: "from-white/10 via-white/40 to-white/80 dark:from-black/10 dark:via-black/40 dark:to-black/90" }
};

const getShapeClass = (shape: ExpandingCardShape, state: "open" | "closed" | "mobile" | "content" | "icon") => {
  if (state === "icon") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-2xl";
    }
  }
  if (state === "content") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-2xl";
    }
  }
  if (state === "closed") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[4px]";
      case "rounded": return "rounded-3xl";
      case "default": return "rounded-full";
    }
  }
  // open / mobile
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-[24px]";
  }
};

const getSpacingClass = (spacing: ExpandingCardSpacing, element: "container" | "content" | "bottomOffset") => {
  if (element === "bottomOffset") {
    switch(spacing) {
      case "2x": return "bottom-2 left-2 right-2";
      case "4x": return "bottom-4 left-4 right-4";
      case "6x": return "bottom-6 left-6 right-6";
      case "8x": return "bottom-8 left-8 right-8";
      default: return "bottom-5 left-5 right-5";
    }
  }
  if (element === "content") {
    switch (spacing) {
      case "2x": return "p-2 gap-2";
      case "4x": return "p-3 gap-2.5";
      case "6x": return "p-5 gap-4";
      case "8x": return "p-6 gap-5";
      default: return "p-4 gap-3";
    }
  }
  // container
  switch (spacing) {
    case "2x": return "gap-1";
    case "4x": return "gap-2";
    case "6x": return "gap-4";
    case "8x": return "gap-6";
    default: return "gap-3";
  }
};

const getThemeClasses = (theme: ExpandingCardTheme) => {
  switch (theme) {
    case "modern": return "border border-border/50 shadow-xl backdrop-blur-sm";
    case "clean": return "border-none shadow-none";
    case "futuristic": return "border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]";
    case "brutal": return "border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]";
    case "halftone": return "border-2 border-dashed bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]";
    default: return "border-none shadow-none";
  }
};

const getContentVariantClasses = (variant: ExpandingCardVariant, themeInfo: any, theme: ExpandingCardTheme) => {
  const isSolid = variant === "solid" || !variant;
  
  if (variant === "outline") {
    return `bg-background/20 backdrop-blur-md border-2 ${themeInfo.border} ${themeInfo.text}`;
  }
  if (variant === "ghost") {
    return `bg-transparent border-transparent ${themeInfo.text} hover:bg-black/10 dark:hover:bg-white/10`;
  }
  if (variant === "link") {
    return `bg-transparent border-transparent ${themeInfo.text} hover:underline underline-offset-4`;
  }
  
  // Solid variant responds to theme
  switch(theme) {
    case "modern": return `backdrop-blur-xl bg-background/60 border border-white/20 shadow-2xl ${themeInfo.text}`;
    case "clean": return `bg-transparent ${themeInfo.text}`;
    case "futuristic": return `bg-black/80 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${themeInfo.text}`;
    case "brutal": return `bg-background border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] text-foreground`;
    case "halftone": return `bg-background/90 backdrop-blur-sm border-2 border-dashed border-foreground text-foreground`;
    default: return `${themeInfo.bg} ${themeInfo.border} ${themeInfo.text}`;
  }
};

export const ExpandingFlexCard: React.FC<ExpandingFlexCardProps> = React.memo(({ 
  options = [], 
  className,
  color = "default",
  shape = "default",
  spacing = "default",
  theme = "default",
  variant = "solid"
}) => {
  const [activeOption, setActiveOption] = useState<string | number | undefined>(options[0]?.id);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTheme = colorThemeMap[color];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!options.length) return null;

  // Limit to 8 cards
  const displayOptions = options.slice(0, 8);
  const themeContainerClasses = getThemeClasses(theme);
  const contentVariantClasses = getContentVariantClasses(variant, activeTheme, theme);

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)} ref={containerRef}>
      <style>{`
        .expanding-card {
          position: relative;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          height: 100%;
          min-width: 60px;
        }
        .expanding-card.closed {
          flex: 0.5;
        }
        .expanding-card.open {
          flex: 4;
        }
        .card-content {
          position: absolute;
          display: flex;
          align-items: center;
          pointer-events: none;
          z-index: 20;
          transition: all 0.3s ease;
        }
        
        .card-icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .card-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .card-title {
          font-weight: 700;
          font-size: 16px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .card-label {
          font-size: 12px;
          opacity: 0.8;
          white-space: nowrap;
        }
        
        /* Desktop/Tablet Specific */
        .closed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 20;
        }
        
        @media (min-width: 768px) {
          .desktop-only-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease 0.2s;
          }
          .expanding-card.open .desktop-only-content {
            opacity: 1;
            transform: translateY(0);
          }
          .expanding-card.open .closed-icon {
            opacity: 0;
          }
        }

        /* Mobile Specific Carousel Fixes */
        .mobile-card {
          height: 400px;
          position: relative;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
      `}</style>

      {isMobile ? (
        <div className="relative w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 w-[calc(100%+2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {displayOptions.map((opt) => (
              <div
                key={opt.id}
                className={cn("mobile-card snap-center shrink-0 w-[85%] sm:w-[60%]", getShapeClass(shape, "mobile"), themeContainerClasses)}
                style={{ backgroundImage: `url("${opt.img}")` }}
              >
                {theme !== "clean" && <div className={cn("absolute inset-0 bg-linear-to-b pointer-events-none z-10", activeTheme.gradient)} />}
                <div className={cn("card-content opacity-100 transform-none", getShapeClass(shape, "content"), getSpacingClass(spacing, "content"), getSpacingClass(spacing, "bottomOffset"), contentVariantClasses)}>
                  <div className={cn("card-icon-wrapper", getShapeClass(shape, "icon"), activeTheme.iconBg, activeTheme.iconText)}>
                    {opt.icon}
                  </div>
                  <div className="card-info flex flex-col">
                    <div className="card-title">{opt.main}</div>
                    <div className="card-label">{opt.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("flex h-[28rem] items-center justify-center", getSpacingClass(spacing, "container"))}>
          {displayOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setActiveOption(opt.id)}
              className={cn(
                "expanding-card",
                themeContainerClasses,
                activeOption === opt.id ? "open" : "closed",
                activeOption === opt.id ? getShapeClass(shape, "open") : getShapeClass(shape, "closed")
              )}
              style={{ backgroundImage: `url("${opt.img}")` }}
            >
              {theme !== "clean" && <div className={cn("absolute inset-0 bg-linear-to-b pointer-events-none z-10", activeTheme.gradient)} />}
              
              <div className={cn("closed-icon drop-shadow-sm dark:drop-shadow-md", color === "default" || theme === "brutal" ? "text-slate-900 dark:text-white" : "text-white", theme === "clean" && "drop-shadow-lg")}>{opt.icon}</div>
              
              <div className={cn("card-content desktop-only-content", getShapeClass(shape, "content"), getSpacingClass(spacing, "content"), getSpacingClass(spacing, "bottomOffset"), contentVariantClasses)}>
                <div className={cn("card-icon-wrapper", getShapeClass(shape, "icon"), activeTheme.iconBg, activeTheme.iconText)}>
                  {opt.icon}
                </div>
                <div className="card-info flex flex-col">
                  <div className="card-title">{opt.main}</div>
                  <div className="card-label">{opt.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ExpandingFlexCard.displayName = "ExpandingFlexCard";