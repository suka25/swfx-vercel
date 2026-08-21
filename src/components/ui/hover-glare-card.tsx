"use client";

import React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────
// TYPES & CONTEXT
// ─────────────────────────────────────────────

export type HoverGlareCardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HoverGlareCardShape = "default" | "square" | "rounded" | "sharp";
export type HoverGlareCardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface HoverGlareCardContextType {
  color: HoverGlareCardColor;
  shape: HoverGlareCardShape;
  spacing: HoverGlareCardSpacing;
}

const HoverGlareCardContext = React.createContext<HoverGlareCardContextType>({
  color: "default",
  shape: "default",
  spacing: "default"
});

export const useHoverGlareCard = () => React.useContext(HoverGlareCardContext);

export const hoverColorThemeMap: Record<HoverGlareCardColor, { glow: string; glowSecondary: string; text: string; textGlow: string; gradient: string; bgSoft: string; iconShadow: string; actionPrimary: string; actionSecondary: string; actionGhost: string; actionLink: string; actionHover: string; badgeText: string; badgeBorder: string; badgeShadow: string; }> = {
  default: { glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-white/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-white/30", text: "text-white", textGlow: "0 0 20px rgba(255,255,255,0.8)", gradient: "from-white/40 via-white/10 to-transparent", bgSoft: "bg-white/10", iconShadow: "shadow-[0_0_20px_rgba(255,255,255,0.15)]", actionPrimary: "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]", actionSecondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10", actionGhost: "hover:text-white", actionLink: "hover:text-white hover:border-white/50", actionHover: "hover:bg-white/10", badgeText: "text-foreground", badgeBorder: "border-white/10", badgeShadow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]" },
  blue: { glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/30", text: "text-blue-400", textGlow: "0 0 20px rgba(59,130,246,0.8)", gradient: "from-blue-500 via-blue-400/20 to-transparent", bgSoft: "bg-blue-500/20", iconShadow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]", actionPrimary: "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.2)]", actionSecondary: "bg-white/5 border border-blue-500/20 text-blue-400 hover:bg-blue-500/10", actionGhost: "hover:text-blue-400", actionLink: "text-blue-400/70 hover:text-blue-400 hover:border-blue-500/50", actionHover: "hover:bg-blue-500/10", badgeText: "text-blue-400", badgeBorder: "border-blue-500/20", badgeShadow: "shadow-[0_0_10px_rgba(59,130,246,0.1)]" },
  emerald: { glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:border-emerald-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-emerald-500/30", text: "text-emerald-400", textGlow: "0 0 20px rgba(16,185,129,0.8)", gradient: "from-emerald-500 via-emerald-400/20 to-transparent", bgSoft: "bg-emerald-500/20", iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]", actionPrimary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.2)]", actionSecondary: "bg-white/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10", actionGhost: "hover:text-emerald-400", actionLink: "text-emerald-400/70 hover:text-emerald-400 hover:border-emerald-500/50", actionHover: "hover:bg-emerald-500/10", badgeText: "text-emerald-400", badgeBorder: "border-emerald-500/20", badgeShadow: "shadow-[0_0_10px_rgba(16,185,129,0.1)]" },
  rose: { glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.2)] hover:border-rose-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:border-rose-500/30", text: "text-rose-400", textGlow: "0 0 20px rgba(244,63,94,0.8)", gradient: "from-rose-500 via-rose-400/20 to-transparent", bgSoft: "bg-rose-500/20", iconShadow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]", actionPrimary: "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.2)]", actionSecondary: "bg-white/5 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10", actionGhost: "hover:text-rose-400", actionLink: "text-rose-400/70 hover:text-rose-400 hover:border-rose-500/50", actionHover: "hover:bg-rose-500/10", badgeText: "text-rose-400", badgeBorder: "border-rose-500/20", badgeShadow: "shadow-[0_0_10px_rgba(244,63,94,0.1)]" },
  amber: { glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:border-amber-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-500/30", text: "text-amber-400", textGlow: "0 0 20px rgba(245,158,11,0.8)", gradient: "from-amber-500 via-amber-400/20 to-transparent", bgSoft: "bg-amber-500/20", iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]", actionPrimary: "bg-amber-500 text-white hover:bg-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.2)]", actionSecondary: "bg-white/5 border border-amber-500/20 text-amber-400 hover:bg-amber-500/10", actionGhost: "hover:text-amber-400", actionLink: "text-amber-400/70 hover:text-amber-400 hover:border-amber-500/50", actionHover: "hover:bg-amber-500/10", badgeText: "text-amber-400", badgeBorder: "border-amber-500/20", badgeShadow: "shadow-[0_0_10px_rgba(245,158,11,0.1)]" },
  violet: { glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:border-violet-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:border-violet-500/30", text: "text-violet-400", textGlow: "0 0 20px rgba(139,92,246,0.8)", gradient: "from-violet-500 via-violet-400/20 to-transparent", bgSoft: "bg-violet-500/20", iconShadow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]", actionPrimary: "bg-violet-500 text-white hover:bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.2)]", actionSecondary: "bg-white/5 border border-violet-500/20 text-violet-400 hover:bg-violet-500/10", actionGhost: "hover:text-violet-400", actionLink: "text-violet-400/70 hover:text-violet-400 hover:border-violet-500/50", actionHover: "hover:bg-violet-500/10", badgeText: "text-violet-400", badgeBorder: "border-violet-500/20", badgeShadow: "shadow-[0_0_10px_rgba(139,92,246,0.1)]" },
  indigo: { glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:border-indigo-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:border-indigo-500/30", text: "text-indigo-400", textGlow: "0 0 20px rgba(99,102,241,0.8)", gradient: "from-indigo-500 via-indigo-400/20 to-transparent", bgSoft: "bg-indigo-500/20", iconShadow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]", actionPrimary: "bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.2)]", actionSecondary: "bg-white/5 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10", actionGhost: "hover:text-indigo-400", actionLink: "text-indigo-400/70 hover:text-indigo-400 hover:border-indigo-500/50", actionHover: "hover:bg-indigo-500/10", badgeText: "text-indigo-400", badgeBorder: "border-indigo-500/20", badgeShadow: "shadow-[0_0_10px_rgba(99,102,241,0.1)]" },
  sky: { glow: "hover:shadow-[0_0_40px_rgba(14,165,233,0.2)] hover:border-sky-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:border-sky-500/30", text: "text-sky-400", textGlow: "0 0 20px rgba(14,165,233,0.8)", gradient: "from-sky-500 via-sky-400/20 to-transparent", bgSoft: "bg-sky-500/20", iconShadow: "shadow-[0_0_20px_rgba(14,165,233,0.15)]", actionPrimary: "bg-sky-500 text-white hover:bg-sky-600 shadow-[0_0_20px_rgba(14,165,233,0.2)]", actionSecondary: "bg-white/5 border border-sky-500/20 text-sky-400 hover:bg-sky-500/10", actionGhost: "hover:text-sky-400", actionLink: "text-sky-400/70 hover:text-sky-400 hover:border-sky-500/50", actionHover: "hover:bg-sky-500/10", badgeText: "text-sky-400", badgeBorder: "border-sky-500/20", badgeShadow: "shadow-[0_0_10px_rgba(14,165,233,0.1)]" },
  slate: { glow: "hover:shadow-[0_0_40px_rgba(100,116,139,0.2)] hover:border-slate-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(100,116,139,0.1)] hover:border-slate-500/30", text: "text-slate-400", textGlow: "0 0 20px rgba(100,116,139,0.8)", gradient: "from-slate-500 via-slate-400/20 to-transparent", bgSoft: "bg-slate-500/20", iconShadow: "shadow-[0_0_20px_rgba(100,116,139,0.15)]", actionPrimary: "bg-slate-500 text-white hover:bg-slate-600 shadow-[0_0_20px_rgba(100,116,139,0.2)]", actionSecondary: "bg-white/5 border border-slate-500/20 text-slate-400 hover:bg-slate-500/10", actionGhost: "hover:text-slate-400", actionLink: "text-slate-400/70 hover:text-slate-400 hover:border-slate-500/50", actionHover: "hover:bg-slate-500/10", badgeText: "text-slate-400", badgeBorder: "border-slate-500/20", badgeShadow: "shadow-[0_0_10px_rgba(100,116,139,0.1)]" },
  orange: { glow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/50", glowSecondary: "hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] hover:border-orange-500/30", text: "text-orange-400", textGlow: "0 0 20px rgba(249,115,22,0.8)", gradient: "from-orange-500 via-orange-400/20 to-transparent", bgSoft: "bg-orange-500/20", iconShadow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]", actionPrimary: "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.2)]", actionSecondary: "bg-white/5 border border-orange-500/20 text-orange-400 hover:bg-orange-500/10", actionGhost: "hover:text-orange-400", actionLink: "text-orange-400/70 hover:text-orange-400 hover:border-orange-500/50", actionHover: "hover:bg-orange-500/10", badgeText: "text-orange-400", badgeBorder: "border-orange-500/20", badgeShadow: "shadow-[0_0_10px_rgba(249,115,22,0.1)]" },
};

const getShapeClass = (shape: HoverGlareCardShape, element: "container" | "inner" | "action" | "avatar" | "badge" = "container") => {
  if (element === "avatar") {
    switch(shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-md";
      case "default": return "rounded-full";
    }
  }
  if (element === "badge") {
    switch(shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-md";
      case "default": return "rounded-full";
    }
  }
  if (element === "action") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[2px]";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-lg";
    }
  }
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return element === "container" ? "rounded-3xl" : "rounded-2xl";
    case "default": return element === "container" ? "rounded-xl" : "rounded-lg";
  }
};

const getSpacingClass = (spacing: HoverGlareCardSpacing, element: "container" | "inner" | "action" | "padding" = "padding") => {
  if (element === "action") {
    switch (spacing) {
      case "2x": return "py-1 px-3 text-[10px]";
      case "4x": return "py-1.5 px-4 text-xs";
      case "6x": return "py-3 px-6 text-sm";
      case "8x": return "py-4 px-8 text-base";
      default: return "py-2.5 px-5 text-xs";
    }
  }
  if (element === "inner") {
    switch (spacing) {
      case "2x": return "gap-1.5";
      case "4x": return "gap-3";
      case "6x": return "gap-5";
      case "8x": return "gap-6";
      default: return "gap-4";
    }
  }
  if (element === "container") {
    switch (spacing) {
      case "2x": return "gap-3";
      case "4x": return "gap-4";
      case "6x": return "gap-8";
      case "8x": return "gap-10";
      default: return "gap-6";
    }
  }
  switch (spacing) {
    case "2x": return "p-3";
    case "4x": return "p-4";
    case "6x": return "p-8";
    case "8x": return "p-10";
    default: return "p-6";
  }
};

// ─────────────────────────────────────────────
// HOVER GLARE ROOT
// ─────────────────────────────────────────────

const hoverGlareCardVariants = cva(
  "relative overflow-hidden border transition-all duration-500 flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-black/40 backdrop-blur-xl border-white/10 text-foreground shadow-2xl",
        glass: "bg-foreground/[0.02] backdrop-blur-[40px] border-white/5 text-foreground",
        solid: "bg-foreground border-border text-background",
        ghost: "bg-transparent border-transparent hover:bg-foreground/[0.02] text-foreground",
      },
      // kept glow for backwards compatibility if anyone passes it
      glow: {
        none: "",
        primary: "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:border-[#8b5cf6]/50",
        secondary: "hover:shadow-[0_0_40px_rgba(0,255,204,0.15)] hover:border-[#00ffcc]/50",
        white: "hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-white/50",
      }
    },
    defaultVariants: {
      variant: "glass",
      glow: "none",
    },
  }
);

export interface HoverGlareCardRootProps
  extends Omit<HTMLMotionProps<"div">, "color" | "transition">,
    VariantProps<typeof hoverGlareCardVariants> {
  glareOpacity?: number;
  children?: React.ReactNode;
  color?: HoverGlareCardColor;
  shape?: HoverGlareCardShape;
  spacing?: HoverGlareCardSpacing;
}

export const HoverGlareCardRoot = React.forwardRef<HTMLDivElement, HoverGlareCardRootProps>(
  ({ className, variant = "glass", glow = "none", glareOpacity = 0.15, color = "default", shape = "default", spacing = "default", children, ...props }, ref) => {
    const activeTheme = hoverColorThemeMap[color];
    
    let hoverBorderGlow = "";
    if (color !== "default") {
      hoverBorderGlow = activeTheme.glow;
    } else {
      if (glow === "primary") hoverBorderGlow = "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:border-[#8b5cf6]/50";
      else if (glow === "secondary") hoverBorderGlow = "hover:shadow-[0_0_40px_rgba(0,255,204,0.15)] hover:border-[#00ffcc]/50";
      else if (glow === "white") hoverBorderGlow = "hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-white/50";
    }

    return (
      <HoverGlareCardContext.Provider value={{ color, shape, spacing }}>
        <motion.div
          ref={ref}
          initial="initial"
          whileHover="hover"
          className={cn(hoverGlareCardVariants({ variant, glow: "none" }), getShapeClass(shape, "container"), hoverBorderGlow, className)}
          {...props}
        >
          {/* Premium Diagonal Glare Layer */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
            <motion.div 
              className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] z-20 origin-center"
              variants={{
                initial: { x: "-100%", y: "-100%", rotate: 45 },
                hover: { x: "100%", y: "100%", rotate: 45 }
              }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: `linear-gradient(90deg, transparent 35%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, ${glareOpacity * 0.4}) 48%, rgba(255, 255, 255, ${glareOpacity}) 50%, rgba(255, 255, 255, ${glareOpacity * 0.4}) 52%, rgba(255, 255, 255, 0) 60%, transparent 65%)`,
              }}
            />
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full w-full">
            {children}
          </div>
        </motion.div>
      </HoverGlareCardContext.Provider>
    );
  }
);
HoverGlareCardRoot.displayName = "HoverGlareCardRoot";

// ─────────────────────────────────────────────
// PREMIUM SUB-COMPONENTS
// ─────────────────────────────────────────────

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, Omit<HTMLMotionProps<"h3">, "color" | "transition"> & { children?: React.ReactNode }>(
  ({ className, children, ...props }, ref) => {
    const { color } = useHoverGlareCard();
    const activeTheme = hoverColorThemeMap[color];
    
    return (
      <motion.h3 
        ref={ref} 
        variants={{
          initial: { color: "var(--foreground)" },
          hover: { color: "var(--foreground)", textShadow: "0 0 15px rgba(255,255,255,0.3)" }
        }}
        className={cn("text-lg font-bold leading-snug tracking-wide", color === "default" ? "" : activeTheme.text, className)} 
        {...props}
      >
        {children}
      </motion.h3>
    );
  }
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground/80 leading-relaxed font-medium tracking-wide", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { spacing } = useHoverGlareCard();
    return (
      <div ref={ref} className={cn("flex flex-col relative z-10", getSpacingClass(spacing, "inner"), className)} {...props} />
    );
  }
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { spacing } = useHoverGlareCard();
    return (
      <div ref={ref} className={cn("flex items-center pt-4 mt-auto border-t border-white/5", getSpacingClass(spacing, "inner"), className)} {...props} />
    );
  }
);
CardFooter.displayName = "CardFooter";

export const CardSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn("border-none border-t border-white/5 my-2", className)} {...props} />
  )
);
CardSeparator.displayName = "CardSeparator";

const badgeVariants = cva(
  "inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-md",
  {
    variants: {
      tone: {
        default: "bg-white/5 border-white/10 text-foreground",
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
        warning: "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
        danger: "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export const CardBadge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants> & { showDot?: boolean }>(
  ({ className, tone, showDot = true, children, ...props }, ref) => {
    const { shape, color } = useHoverGlareCard();
    const activeTheme = hoverColorThemeMap[color];

    const dotColors = {
      default: "bg-white",
      success: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
      warning: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
      danger: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
      info: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    };
    
    let overrideClass = "";
    if (color !== "default" && tone === "default") {
      overrideClass = `bg-white/5 ${activeTheme.badgeText} ${activeTheme.badgeBorder} ${activeTheme.badgeShadow}`;
    }

    return (
      <span ref={ref} className={cn(badgeVariants({ tone }), getShapeClass(shape, "badge"), overrideClass, className)} {...props}>
        {showDot && (
          <span className="relative flex h-1.5 w-1.5">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColors[tone || "default"])}></span>
            <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotColors[tone || "default"])}></span>
          </span>
        )}
        {children}
      </span>
    );
  }
);
CardBadge.displayName = "CardBadge";

export const CardAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { src?: string; initials?: string; size?: "sm" | "md" | "lg" }>(
  ({ className, src, initials = "?", size = "md", ...props }, ref) => {
    const { shape } = useHoverGlareCard();
    const avatarSizes = { sm: "w-10 h-10 text-xs", md: "w-14 h-14 text-sm", lg: "w-16 h-16 text-base" };
    return (
      <div ref={ref} className={cn("relative shrink-0 flex items-center justify-center", avatarSizes[size], className)} {...props}>
        {/* Rotating HUD Ring */}
        <motion.div 
          variants={{
            initial: { rotate: 0, opacity: 0.5 },
            hover: { rotate: 180, opacity: 1, scale: 1.05 }
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={cn("absolute inset-0 border border-dashed border-white/40", getShapeClass(shape, "avatar"))}
        />
        <motion.div 
          variants={{
            initial: { rotate: 0 },
            hover: { rotate: -180 }
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className={cn("absolute inset-0.5 border border-dotted border-white/20", getShapeClass(shape, "avatar"))}
        />
        
        {/* Inner Avatar */}
        <div className={cn("absolute inset-1.5 overflow-hidden bg-white/5 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]", getShapeClass(shape, "avatar"))}>
          {src ? (
            <Image src={src} alt={initials} fill className="object-cover" unoptimized />
          ) : (
            initials
          )}
        </div>
      </div>
    );
  }
);
CardAvatar.displayName = "CardAvatar";

export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; aspectRatio?: "video" | "square" | "auto" }>(
  ({ className, src, alt = "", aspectRatio = "video", children, ...props }, ref) => {
    const aspectMap = { video: "aspect-video", square: "aspect-square", auto: "" };
    return (
      <div ref={ref} className={cn("relative w-full bg-black/40 overflow-hidden", aspectMap[aspectRatio], className)} {...props}>
        {src ? (
          <motion.div
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.08 }
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full relative"
          >
            <Image src={src} alt={alt} fill className="object-cover opacity-80" unoptimized />
          </motion.div>
        ) : (
          children
        )}
      </div>
    );
  }
);
CardMedia.displayName = "CardMedia";

export const CardStat = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string; label: string; trend?: "up" | "down" | "neutral"; trendValue?: string }>(
  ({ className, value, label, trend, trendValue, ...props }, ref) => {
    const trendColor = trend === "up" ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" : trend === "down" ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" : "text-muted-foreground";
    const { color } = useHoverGlareCard();
    const activeTheme = hoverColorThemeMap[color];

    return (
      <div ref={ref} className={cn("flex flex-col gap-1 relative", className)} {...props}>
        <div className="flex items-baseline gap-2">
          <motion.span 
            variants={{
              initial: { textShadow: "0 0 0px rgba(255,255,255,0)" },
              hover: { textShadow: "0 0 15px rgba(255,255,255,0.4)" }
            }}
            className={cn("text-3xl font-bold tracking-tight tabular-nums font-mono", color === "default" ? "text-white" : activeTheme.text)}
          >
            {value}
          </motion.span>
          {trendValue && <span className={cn("text-xs font-bold tracking-wider", trendColor)}>{trend === "up" ? "▲" : trend === "down" ? "▼" : "—"} {trendValue}</span>}
        </div>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">{label}</span>
      </div>
    );
  }
);
CardStat.displayName = "CardStat";

const actionVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 overflow-hidden relative",
  {
    variants: {
      tone: {
        primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]",
        secondary: "bg-white/5 border border-white/10 text-white",
        ghost: "text-muted-foreground hover:text-white px-3 py-2",
        link: "text-white/70 hover:text-white p-0 h-auto border-b border-transparent hover:border-white/50 rounded-none pb-0.5",
      },
    },
    defaultVariants: { tone: "secondary" },
  }
);

export const CardAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof actionVariants> & { showIcon?: boolean }>(
  ({ className, tone = "secondary", children, showIcon = true, ...props }, ref) => {
    const { color, shape, spacing } = useHoverGlareCard();
    const activeTheme = hoverColorThemeMap[color];

    let actionToneClass = "";
    if (color !== "default") {
      if (tone === "primary") actionToneClass = activeTheme.actionPrimary;
      else if (tone === "secondary") actionToneClass = activeTheme.actionSecondary;
      else if (tone === "ghost") actionToneClass = activeTheme.actionGhost;
      else if (tone === "link") actionToneClass = activeTheme.actionLink;
    } else {
      if (tone === "secondary") {
         actionToneClass = "hover:bg-white/10 hover:border-white/20";
      }
    }

    return (
      <button ref={ref} className={cn(actionVariants({ tone }), tone !== "link" ? getShapeClass(shape, "action") : "", tone !== "link" ? getSpacingClass(spacing, "action") : "", actionToneClass, "group/btn", className)} {...props}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showIcon && tone !== "ghost" && (
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          )}
        </span>
        {tone === "secondary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        )}
      </button>
    );
  }
);
CardAction.displayName = "CardAction";


// ─────────────────────────────────────────────
// PRESET COMPONENT: HoverGlareCard
// ─────────────────────────────────────────────

export interface HoverGlareCardProps extends Omit<HTMLMotionProps<"div">, "title" | "color" | "transition" | "layout"> {
  // Styling variants
  variant?: "default" | "glass" | "solid" | "ghost";
  glow?: "none" | "primary" | "secondary" | "white";
  glareOpacity?: number;
  color?: HoverGlareCardColor;
  shape?: HoverGlareCardShape;
  spacing?: HoverGlareCardSpacing;
  children?: React.ReactNode;
  
  // Layout variants
  layout?: "default" | "media" | "content" | "stats" | "compact" | "feature";
  
  // Content Props
  name?: string;
  title?: string;
  description?: string;
  avatarInitials?: string;
  avatarSrc?: string;
  stats?: Array<{ label: string; value: string }>;
  badge?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const HoverGlareCard = React.forwardRef<HTMLDivElement, HoverGlareCardProps>(
  (
    {
      className,
      variant = "glass",
      glow = "none",
      glareOpacity = 0.15,
      color = "default",
      shape = "default",
      spacing = "default",
      layout = "default",
      children,
      // Preset content props
      name = "SYSTEM.NODE",
      title = "NEURAL LINK ACTIVE",
      description = "Establishing secure connection to mainframe. Latency optimal. All systems green.",
      avatarInitials = "SN",
      avatarSrc = "/developer-avatar.png",
      badge = "ONLINE",
      stats = [
        { label: "PACKETS", value: "84.2K" },
        { label: "PING", value: "12ms" },
        { label: "NODES", value: "04" },
      ],
      primaryCtaText = "INITIALIZE",
      secondaryCtaText = "VIEW LOGS",
      onPrimaryClick,
      onSecondaryClick,
      ...props
    },
    ref
  ) => {
    // If children are explicitly passed, act as a generic wrapper
    if (children) {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={className} {...props}>
          {children}
        </HoverGlareCardRoot>
      );
    }

    if (layout === "media") {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full group", className)} {...props}>
          <CardMedia src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" aspectRatio="square" />
          
          <motion.div 
            variants={{
              initial: { y: 20, opacity: 0.9 },
              hover: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-4 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-1">
                <CardBadge tone="info" showDot={false}>CORE.MEDIA</CardBadge>
                {badge && <CardBadge tone="success">{badge}</CardBadge>}
              </div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription className="text-white/70 line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardFooter className="px-0 pb-0 pt-2 border-none">
              {primaryCtaText && (
                <CardAction tone="primary" onClick={onPrimaryClick} className="w-full">
                  {primaryCtaText}
                </CardAction>
              )}
            </CardFooter>
          </motion.div>
        </HoverGlareCardRoot>
      );
    }

    if (layout === "content") {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", getSpacingClass(spacing, "padding"), className)} {...props}>
          {/* Cyber Timeline Line */}
          <motion.div 
            variants={{
              initial: { height: "0%" },
              hover: { height: "100%" }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("absolute left-0 top-0 w-0.5 bg-gradient-to-b z-10", hoverColorThemeMap[color].gradient)}
          />
          
          <div className={cn("flex flex-col relative z-10 flex-1 pl-2", getSpacingClass(spacing, "container"))}>
            <CardHeader>
              <CardBadge tone="info" className="w-fit mb-3">INTELLIGENCE</CardBadge>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription className={cn("text-[10px] uppercase tracking-widest mt-2", hoverColorThemeMap[color].text)}>SYS.ADMIN • 10:42 PM</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-white/60">{description}</CardDescription>
            </CardContent>
            <CardFooter className="px-0 pb-0 pt-4 border-white/10 mt-auto">
              <CardAction tone="link" onClick={onPrimaryClick}>
                READ_PROTOCOL_FILE 
              </CardAction>
            </CardFooter>
          </div>
        </HoverGlareCardRoot>
      );
    }

    if (layout === "stats") {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", getSpacingClass(spacing, "padding"), className)} {...props}>
          {/* Faint Tech Grid */}
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          
          <div className={cn("relative z-10 flex flex-col h-full", getSpacingClass(spacing, "container"))}>
            <CardHeader className="flex-row items-center justify-between gap-2">
              <CardTitle className="text-xs font-mono text-muted-foreground tracking-widest">{title}</CardTitle>
              {badge && <CardBadge tone="success">{badge}</CardBadge>}
            </CardHeader>
            
            <CardContent className="p-0 flex-1 flex flex-col justify-center">
              <div className="flex items-baseline gap-3">
                <motion.span 
                  variants={{
                    initial: { textShadow: "0 0 0px rgba(16,185,129,0)" },
                    hover: { textShadow: "0 0 20px rgba(16,185,129,0.8)" }
                  }}
                  className={cn("text-5xl font-bold tracking-tighter tabular-nums font-mono", hoverColorThemeMap[color].text)}
                >
                  99.9%
                </motion.span>
                <span className="text-xs font-bold text-emerald-500 tracking-widest">▲ OPTIMAL</span>
              </div>
              <CardDescription className="text-[10px] mt-2 font-mono uppercase text-white/40 tracking-widest">System uptime correlation</CardDescription>
            </CardContent>
            
            <CardFooter className="border-t border-dashed border-white/20 pt-4">
              <CardAction tone="ghost" className="w-full text-center font-mono text-[10px]" onClick={onSecondaryClick}>
                [ RUN_DIAGNOSTICS ]
              </CardAction>
            </CardFooter>
          </div>
        </HoverGlareCardRoot>
      );
    }

    if (layout === "compact") {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full p-4", className)} {...props}>
          <div className="flex items-center gap-5 relative z-10 w-full">
            <CardAvatar initials={avatarInitials} src={avatarSrc} size="md" />
            <div className="flex flex-col flex-1 gap-1">
              <CardTitle className="text-sm">{name}</CardTitle>
              <CardDescription className={cn("text-[10px] uppercase tracking-widest", hoverColorThemeMap[color].text)}>{title}</CardDescription>
            </div>
            <CardAction tone="secondary" showIcon={false} onClick={onSecondaryClick} className="px-3 py-1.5 border-white/20">
              CONNECT
            </CardAction>
          </div>
        </HoverGlareCardRoot>
      );
    }

    if (layout === "feature") {
      return (
        <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full items-center text-center", getSpacingClass(spacing, "padding"), className)} {...props}>
          {/* Radial Glow */}
          <motion.div 
            variants={{
              initial: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.8 }}
            className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[40px] z-0 pointer-events-none", hoverColorThemeMap[color].bgSoft)}
          />
          
          <motion.div 
            variants={{
              initial: { y: 0 },
              hover: { y: -5 }
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className={cn("w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10", hoverColorThemeMap[color].text, hoverColorThemeMap[color].iconShadow)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </motion.div>
          
          <CardHeader className="relative z-10 gap-3">
            <CardTitle className="text-xl">Quantum Processing</CardTitle>
            <CardDescription className="leading-loose text-white/60">{description}</CardDescription>
          </CardHeader>
          
          <CardContent className="w-full mt-6 p-0 relative z-10">
            <CardAction tone="primary" className="w-full shadow-[0_0_20px_rgba(255,255,255,0.1)]" onClick={onPrimaryClick}>
              {primaryCtaText}
            </CardAction>
          </CardContent>
        </HoverGlareCardRoot>
      );
    }

    // layout === "default" (Premium Cyber Identity Card)
    return (
      <HoverGlareCardRoot ref={ref} variant={variant} glow={glow} glareOpacity={glareOpacity} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", getSpacingClass(spacing, "padding"), className)} {...props}>
        <div className={cn("flex flex-col relative z-10 h-full", getSpacingClass(spacing, "container"))}>
          {/* Header */}
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <CardAvatar initials={avatarInitials} src={avatarSrc} size="lg" />
                <div className="flex flex-col gap-1.5">
                  <CardTitle className="text-xl tracking-wider">{name}</CardTitle>
                  <CardDescription className={cn("text-[10px] font-mono uppercase tracking-[0.2em]", hoverColorThemeMap[color].text)}>{title}</CardDescription>
                </div>
              </div>
            </div>
            {badge && (
              <div className="absolute top-0 right-0">
                <CardBadge tone="success">{badge}</CardBadge>
              </div>
            )}
          </CardHeader>

          <CardSeparator />

          {/* Body */}
          <CardContent className="p-0 flex-1 mt-2">
            <CardDescription className="text-white/60 leading-relaxed font-mono text-xs">{description}</CardDescription>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {stats.map((s, i) => (
                  <CardStat key={i} value={s.value} label={s.label} />
                ))}
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="px-0 pb-0 flex-col sm:flex-row pt-6">
            {primaryCtaText && (
              <CardAction tone="primary" onClick={onPrimaryClick} className="w-full flex-1">
                {primaryCtaText}
              </CardAction>
            )}
            {secondaryCtaText && (
              <CardAction tone="secondary" onClick={onSecondaryClick} className="w-full flex-1">
                {secondaryCtaText}
              </CardAction>
            )}
          </CardFooter>
        </div>
      </HoverGlareCardRoot>
    );
  }
);
HoverGlareCard.displayName = "HoverGlareCard";