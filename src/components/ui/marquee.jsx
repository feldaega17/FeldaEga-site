// Infinite marquee (21st.dev / Magic UI pattern)
import { cn } from "../../lib/utils";

export function Marquee({ children, reverse = false, duration = 30, className }) {
  return (
    <div className={cn("marquee group", className)} style={{ "--duration": `${duration}s` }}>
      {[0, 1].map((i) => (
        <div key={i} aria-hidden={i === 1} className={cn("marquee-track", reverse && "marquee-reverse")}>
          {children}
        </div>
      ))}
    </div>
  );
}
