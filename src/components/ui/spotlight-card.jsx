// Spotlight card — mouse-following radial glow (21st.dev "spotlight card" pattern)
import { useRef } from "react";
import { cn } from "../../lib/utils";

export function SpotlightCard({ as = "div", className, children, color = "157,78,221", style, ...props }) {
  const Tag = as;
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={cn("spotlight-card glass", className)}
      style={{ "--spot": color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
