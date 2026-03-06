import { useState, useEffect, useRef } from "react";

const WelcomeIntro = ({ sceneReady, onComplete }) => {
  const [phase, setPhase] = useState("loading");
  const hasTriggeredReveal = useRef(false);
  const hasTriggeredFadeout = useRef(false);

  // Auto-advance to reveal after scene ready OR after max 3 seconds
  useEffect(() => {
    const maxWait = setTimeout(() => {
      if (!hasTriggeredReveal.current) {
        hasTriggeredReveal.current = true;
        setPhase("reveal");
      }
    }, 3000);

    return () => clearTimeout(maxWait);
  }, []);

  useEffect(() => {
    if (sceneReady && !hasTriggeredReveal.current) {
      const t = setTimeout(() => {
        hasTriggeredReveal.current = true;
        setPhase("reveal");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [sceneReady]);

  useEffect(() => {
    if (phase === "reveal" && !hasTriggeredFadeout.current) {
      hasTriggeredFadeout.current = true;
      const t = setTimeout(() => setPhase("fadeout"), 2600);
      return () => clearTimeout(t);
    }
    if (phase === "fadeout") {
      const t = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all ease-out ${
        phase === "fadeout"
          ? "opacity-0 pointer-events-none duration-1000"
          : "opacity-100 duration-300"
      }`}
      style={{ background: "#0a0f1a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,114,255,0.06) 0%, transparent 70%)",
        }}
      />

      {phase === "loading" && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-white/40 rounded-full animate-loading-bar" />
          </div>
        </div>
      )}

      {(phase === "reveal" || phase === "fadeout") && (
        <div className="flex flex-col items-center gap-5 px-6">
          <div className="overflow-hidden">
            <p
              className="text-white/30 text-[10px] sm:text-xs tracking-[0.5em] uppercase font-poppins font-light animate-slide-up"
              style={{ animationDelay: "0ms" }}
            >
              Welcome to
            </p>
          </div>

          <div className="overflow-hidden">
            <h1
              className="text-white text-4xl sm:text-6xl md:text-7xl font-poppins font-extralight tracking-tight animate-slide-up text-center"
              style={{ animationDelay: "150ms" }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-light">
                Portfolio
              </span>
            </h1>
          </div>

          <div className="animate-line-expand" style={{ animationDelay: "400ms" }}>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="overflow-hidden">
            <p
              className="text-white/20 text-[10px] sm:text-xs tracking-[0.3em] font-poppins font-light animate-slide-up"
              style={{ animationDelay: "550ms" }}
            >
              Explore the island
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeIntro;
