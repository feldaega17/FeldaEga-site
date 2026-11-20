// Magnetic hover — element drifts toward the cursor (21st.dev "magnetic button" pattern)
import { useRef } from "react";
import { motion as Motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 14, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 14, mass: 0.4 });

  const onMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <Motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y, display: "inline-flex" }}>
      {children}
    </Motion.div>
  );
}
