// 3D tilt on hover (21st.dev "tilt card" pattern)
import { useRef } from "react";
import { motion as Motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function Tilt({ children, max = 7, style, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <Motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }} {...props}>
      {children}
    </Motion.div>
  );
}
