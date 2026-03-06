import { useEffect } from "react";

const skills = [
  { category: "Web Development", items: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js & Next.js", "Node.js & Express", "RESTful APIs"] },
  { category: "Web App Development", items: ["Full-Stack Dev", "SQL & NoSQL", "Cloud Services", "PWAs", "Performance"] },
  { category: "Entrepreneurship", items: ["Business Strategy", "Product Dev", "Market Research", "Startups", "Pitching"] },
];

const AboutOverlay = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-lg" />

      {/* Modal - much bigger */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-modal-in flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - profile photo placeholder */}
        <div className="hidden lg:flex flex-col items-center justify-center w-72 bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-50 relative overflow-hidden gap-6 py-12 px-8">
          {/* Background glow */}
          <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 50% 40%, #00c6ff33, transparent 60%)" }} />
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 70%, #0072ff22, transparent 50%)" }} />

          {/* Circular photo placeholder */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #e0f2fe, #bfdbfe)",
                border: "3px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: "0 0 0 3px rgba(0,114,255,0.25), 0 20px 60px rgba(0,114,255,0.15)",
              }}
            >
              {/* Inner ring */}
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#0072ff]/20 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="opacity-30">
                  <circle cx="12" cy="8" r="4" stroke="#0072ff" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#0072ff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-poppins text-slate-700 font-semibold tracking-wide">Marco Raro Moreno</p>
              <p className="text-xs font-poppins text-slate-400 mt-1">Web Dev & Entrepreneur</p>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0072ff]/30" />
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 overflow-y-auto p-10 sm:p-14">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Header */}
          <div className="mb-12">
            <p className="text-sm tracking-[0.5em] uppercase text-slate-400 font-poppins font-light mb-4">
              Get to know me
            </p>
            <h2 className="text-4xl sm:text-5xl font-poppins font-extralight text-slate-800 tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-light">
                Me
              </span>
            </h2>
            <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-[#00c6ff] to-transparent rounded-full" />
          </div>

          {/* Bio */}
          <div className="mb-12 space-y-5">
            <p className="text-lg text-slate-600 leading-relaxed font-poppins font-light">
              {"Hello! I'm Marco Raro Moreno, a web development student and entrepreneur passionate about building digital solutions that make an impact."}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-poppins font-light">
              My journey in tech is driven by curiosity and a constant desire to learn and grow. I love solving problems and turning ideas into reality through code.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-poppins font-light">
              {"Beyond coding, I'm exploring emerging technologies, working on entrepreneurial ventures, and always brainstorming new ideas."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-poppins font-medium text-slate-800 mb-8 tracking-tight">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {skills.map((group) => (
                <div
                  key={group.category}
                  className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-7 border border-slate-200/60"
                >
                  <h4 className="text-sm font-semibold text-slate-700 font-poppins mb-5 tracking-wide">
                    {group.category}
                  </h4>
                  <ul className="space-y-3.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-slate-500 font-poppins font-light flex items-center gap-3"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOverlay;
