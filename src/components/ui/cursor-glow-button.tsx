"use client";



import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CursorGlowButtonVariant = "primary" | "ghost" | "outline" | "soft" | "elevated" | "gradient" | "glass";
export type CursorGlowButtonLayout = "icon" | "with-icon" | "with-tail-icon" | "none" | "cut-2" | "cut-all";
export type CursorGlowButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CursorGlowButtonShape = "default" | "square" | "rounded" | "sharp" | "cut-two" | "cut-all";
export type CursorGlowButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const colorThemeMap: Record<CursorGlowButtonColor, { radial: string; bg: string; text: string; bgSoft: string; border: string; shadow: string; brutalShadow: string; brutalBg: string; hoverBg: string; textHover: string; glow: string; }> = {
  default: { radial: "rgba(128,128,128,0.5)", bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]", brutalBg: "bg-white dark:bg-zinc-900 border-foreground text-foreground", hoverBg: "hover:bg-primary", textHover: "hover:text-primary-foreground", glow: "shadow-[0_0_40px_-10px_rgba(128,128,128,0.5)]" },
  blue: { radial: "rgba(37,99,235,1)", bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/10 dark:shadow-blue-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]", brutalBg: "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400 text-white", hoverBg: "hover:bg-blue-600 dark:hover:bg-blue-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]" },
  emerald: { radial: "rgba(22,163,74,1)", bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/10 dark:shadow-emerald-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]", brutalBg: "bg-emerald-400 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-400 text-white", hoverBg: "hover:bg-emerald-600 dark:hover:bg-emerald-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]" },
  rose: { radial: "rgba(225,29,72,1)", bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/10 dark:shadow-rose-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(225,29,72,1)]", brutalBg: "bg-rose-400 dark:bg-rose-600 border-rose-600 dark:border-rose-400 text-white", hoverBg: "hover:bg-rose-600 dark:hover:bg-rose-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)]" },
  amber: { radial: "rgba(217,119,6,1)", bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/10 dark:shadow-amber-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(217,119,6,1)]", brutalBg: "bg-amber-400 dark:bg-amber-600 border-amber-600 dark:border-amber-400 text-white", hoverBg: "hover:bg-amber-600 dark:hover:bg-amber-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)]" },
  violet: { radial: "rgba(124,58,237,1)", bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/10 dark:shadow-violet-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]", brutalBg: "bg-violet-400 dark:bg-violet-600 border-violet-600 dark:border-violet-400 text-white", hoverBg: "hover:bg-violet-600 dark:hover:bg-violet-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]" },
  indigo: { radial: "rgba(79,70,229,1)", bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/10 dark:shadow-indigo-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]", brutalBg: "bg-indigo-400 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-400 text-white", hoverBg: "hover:bg-indigo-600 dark:hover:bg-indigo-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]" },
  sky: { radial: "rgba(2,132,199,1)", bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/10 dark:shadow-sky-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(2,132,199,1)]", brutalBg: "bg-sky-400 dark:bg-sky-600 border-sky-600 dark:border-sky-400 text-white", hoverBg: "hover:bg-sky-600 dark:hover:bg-sky-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(2,132,199,0.5)]" },
  slate: { radial: "rgba(71,85,105,1)", bg: "bg-slate-600 dark:bg-slate-400", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/10 dark:shadow-slate-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(71,85,105,1)]", brutalBg: "bg-slate-400 dark:bg-slate-600 border-slate-600 dark:border-slate-400 text-white", hoverBg: "hover:bg-slate-600 dark:hover:bg-slate-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(71,85,105,0.5)]" },
  orange: { radial: "rgba(234,88,12,1)", bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/10 dark:shadow-orange-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(234,88,12,1)]", brutalBg: "bg-orange-400 dark:bg-orange-600 border-orange-600 dark:border-orange-400 text-white", hoverBg: "hover:bg-orange-600 dark:hover:bg-orange-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]" },
};

const getShapeClass = (shape: CursorGlowButtonShape | CursorGlowButtonLayout) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-xl";
    case "cut-two":
    case "cut-2": return "rounded-none [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";
    case "cut-all": return "rounded-none [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)]";
    case "default": return "rounded-full";
    default: return "rounded-full";
  }
};

const getSpacingStyles = (spacing: CursorGlowButtonSpacing, isIconOnly: boolean) => {
  if (isIconOnly) {
    switch (spacing) {
      case "2x": return "w-7 h-7 p-0 flex items-center justify-center text-xs";
      case "4x": return "w-9 h-9 p-0 flex items-center justify-center text-sm";
      case "6x": return "w-11 h-11 p-0 flex items-center justify-center text-base";
      case "8x": return "w-14 h-14 p-0 flex items-center justify-center text-lg";
      default: return "w-10 h-10 p-0 flex items-center justify-center text-sm";
    }
  }
  switch (spacing) {
    case "2x": return "px-3 py-1 text-xs h-7";
    case "4x": return "px-4 py-2 text-sm h-9";
    case "6x": return "px-6 py-2.5 text-base h-11";
    case "8x": return "px-8 py-3.5 text-lg h-14";
    default: return "px-5 py-2.5 text-sm h-10";
  }
};

export interface CursorGlowButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: CursorGlowButtonVariant;
  color?: CursorGlowButtonColor;
  shape?: CursorGlowButtonShape;
  spacing?: CursorGlowButtonSpacing;
  layout?: CursorGlowButtonLayout;
  glowColor?: string;
  glowSize?: number;
  borderWidth?: string;
  icon?: LucideIcon;
  tailIcon?: LucideIcon;
}

export const CursorGlowButton = React.memo(React.forwardRef<HTMLButtonElement, CursorGlowButtonProps>(
  (
    {
      className,
      variant = "primary",
      color = "default",
      shape = "default",
      spacing = "default",
      layout,
      children,
      glowColor: glowColorProp,
      glowSize = 200,
      borderWidth = "2px",
      icon: Icon,
      tailIcon: TailIcon = ArrowRight,
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
      disabled,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const activeTheme = colorThemeMap[color];
    const isDefault = color === "default";
    
    // Determine the glow color (same for background and border)
    let baseGlowColor = glowColorProp;
    if (!baseGlowColor) {
      baseGlowColor = isDefault ? "rgba(160,160,170,1)" : activeTheme.radial;
    }
    
    const highlightBgColor = baseGlowColor.includes("rgba") 
        ? baseGlowColor.replace(/[\d.]+\)$/g, '0.9)') 
        : baseGlowColor;

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
      if (onMouseMove) onMouseMove(e);
    }

    const iconSize = spacing === "2x" ? 14 : spacing === "6x" || spacing === "8x" ? 22 : 18;
    const isIconOnly = layout === "icon";

    // Background and border styles for the base button layer
    const variantContainerStyles = {
      primary: cn(isDefault ? "bg-foreground" : activeTheme.bg),
      ghost: cn("bg-transparent"),
      outline: cn("bg-transparent border", isDefault ? "border-zinc-300 dark:border-zinc-700" : activeTheme.border),
      soft: cn(isDefault ? "bg-zinc-100 dark:bg-zinc-800" : activeTheme.bgSoft),
      elevated: cn(isDefault ? "bg-foreground shadow-lg" : cn(activeTheme.bg, activeTheme.shadow, "shadow-lg")),
      gradient: cn("bg-transparent"), 
      glass: cn("bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10"),
    };

    // Text colors for the content
    const variantTextStyles = {
      primary: cn(isDefault ? "text-background" : "text-white"),
      ghost: cn(isDefault ? "text-foreground" : activeTheme.text),
      outline: cn(isDefault ? "text-foreground" : activeTheme.text),
      soft: cn(isDefault ? "text-foreground" : activeTheme.text),
      elevated: cn(isDefault ? "text-background" : "text-white"),
      gradient: cn(isDefault ? "text-foreground" : "text-white"),
      glass: cn(isDefault ? "text-foreground" : activeTheme.text),
    };

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-tight transition-all duration-300 cursor-pointer outline-none select-none overflow-hidden",
      getShapeClass(layout === "cut-2" ? "cut-two" : layout === "cut-all" ? "cut-all" : shape),
      getSpacingStyles(spacing, isIconOnly),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const renderContent = (isHighlight: boolean = false) => {
      // For the muted base, we lower opacity of the text. For highlight, it's fully bright.
      const textClass = isHighlight ? variantTextStyles[variant] : cn(variantTextStyles[variant], "opacity-50 dark:opacity-40");
      
      const content = (
        <>
          {layout === "icon" && (Icon ? <Icon size={iconSize} className="text-current" /> : <span className="text-current">{children}</span>)}
          
          {(layout === "with-icon" || layout === "cut-2" || layout === "cut-all") && Icon && <Icon size={iconSize} className="text-current" />}
          
          {layout !== "icon" && <span className="text-current">{children}</span>}
          
          {(layout === "with-tail-icon" || layout === "cut-all") && <TailIcon size={iconSize} className="text-current" />}
        </>
      );

      return (
        <span className={cn("relative z-10 flex items-center justify-center gap-2 w-full h-full", textClass)}>
          {content}
        </span>
      );
    };

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e: any) => {
          const { left, top } = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - left);
          mouseY.set(e.clientY - top);
          setIsHovered(true);
          if (onMouseEnter) onMouseEnter(e);
        }}
        onMouseLeave={(e: any) => {
          setIsHovered(false);
          if (onMouseLeave) onMouseLeave(e);
        }}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={cn(baseStyles, "bg-transparent border-transparent")} // Parent handles sizing but is fully transparent
        disabled={disabled}
        {...(props as any)}
      >
        {/* Layer 1: Base Muted Button */}
        {/* This is the button when NOT hovered. It shows the native theme colors. */}
        <div className={cn(
          "absolute inset-0 rounded-[inherit] transition-all duration-500",
          variantContainerStyles[variant],
          isHovered ? "border-transparent opacity-10" : ""
        )} />
        
        {/* Render base muted content in normal flow so the button size is calculated correctly */}
        {renderContent(false)}

        {/* Layer 2: Highlight Spotlight (Masked by Cursor) */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none flex items-center justify-center z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            background: highlightBgColor,
            WebkitMaskImage: useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, black 15%, transparent 100%)`,
            maskImage: useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, black 15%, transparent 100%)`,
          }}
        >
          {/* Render fully bright highlighted content */}
          {renderContent(true)}
        </motion.div>
      </motion.button>
    );
  }
));

CursorGlowButton.displayName = "CursorGlowButton";