// Number ticker — counts up when scrolled into view (21st.dev / Magic UI pattern)
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

export function NumberTicker({ value, prefix = "", suffix = "", className, style }) {
  const ref = useRef(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 120 });
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  useEffect(() => spring.on("change", (v) => {
    if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
  }), [spring, prefix, suffix]);

  return <span ref={ref} className={className} style={style}>{prefix}0{suffix}</span>;
}
