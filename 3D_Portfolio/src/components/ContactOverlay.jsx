import { useEffect, useRef, useState } from "react";

const ContactOverlay = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const formRef = useRef();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwvrejyn", {
        method: "POST",
        body: new FormData(formRef.current),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-lg" />

      {/* Modal */}
      <div
        className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-modal-in flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - message panel */}
        <div className="hidden lg:flex flex-col justify-between w-80 bg-gradient-to-br from-[#0072ff] via-[#005ee0] to-[#003ba3] relative overflow-hidden p-12">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 20% 80%, #00c6ff55, transparent 50%), radial-gradient(circle at 80% 20%, #ffffff22, transparent 40%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />

          {/* Top — icon */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-3xl font-poppins font-light text-white leading-snug tracking-tight">
              Let&apos;s build<br />
              <span className="font-semibold">something great</span><br />
              together.
            </h3>
            <p className="mt-6 text-sm font-poppins text-white/70 leading-relaxed">
              Whether it&apos;s a new project, a collaboration, or just a conversation — I&apos;m always open to hearing from you.
            </p>
          </div>

          {/* Bottom — response time badge */}
          <div className="relative z-10 flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4 border border-white/15">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0 shadow-[0_0_8px_#4ade80]" />
            <div>
              <p className="text-xs font-poppins font-semibold text-white">Usually responds within 24h</p>
              <p className="text-xs font-poppins text-white/50 mt-0.5">Available for new projects</p>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
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
          <div className="mb-10">
            <p className="text-sm tracking-[0.5em] uppercase text-slate-400 font-poppins font-light mb-4">
              Get in touch
            </p>
            <h2 className="text-4xl sm:text-5xl font-poppins font-extralight text-slate-800 tracking-tight">
              Contact{" "}
              <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-light">
                Me
              </span>
            </h2>
            <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-[#00c6ff] to-transparent rounded-full" />
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 font-poppins mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#00c6ff]/30 focus:border-[#00c6ff] transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 font-poppins mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#00c6ff]/30 focus:border-[#00c6ff] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 font-poppins mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#00c6ff]/30 focus:border-[#00c6ff] transition-all duration-300 resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white font-poppins font-medium text-base tracking-wide hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-green-600 font-poppins text-sm text-center">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-poppins text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-poppins tracking-wider">OR CONNECT</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-5">
            <a
              href="https://github.com/Marco0204"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-800/30"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#0077b5] hover:bg-[#006699] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0077b5]/30"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:opacity-90 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOverlay;
