// Word rotate — cycles words with blur/slide (21st.dev "text rotate" pattern)
import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";

export function WordRotate({ words, interval = 2600, className }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span style={{ display: "inline-grid", verticalAlign: "bottom" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <Motion.span
          key={words[i]}
          className={className}
          style={{ gridArea: "1/1" }}
          initial={{ opacity: 0, y: "60%", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-60%", filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </Motion.span>
      </AnimatePresence>
    </span>
  );
}
