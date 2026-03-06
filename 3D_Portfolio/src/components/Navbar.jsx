import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ onAboutClick, onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectsClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/?scroll=projects");
    }
  };

  const handleAbout = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => onAboutClick?.(), 100);
    } else {
      onAboutClick?.();
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => onContactClick?.(), 100);
    } else {
      onContactClick?.();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-transparent ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="group relative flex items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative w-11 h-11 rounded-xl bg-white/90 flex items-center justify-center shadow-lg shadow-black/10 group-hover:shadow-black/20 transition-all duration-300 group-hover:scale-105 backdrop-blur-sm">
            <span className="bg-gradient-to-br from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-bold text-sm font-poppins tracking-wider">
              MRM
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1 backdrop-blur-md rounded-2xl px-2 py-1.5">
          <button
            onClick={handleAbout}
            className="relative px-5 py-2 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10"
          >
            About
          </button>
          <button
            onClick={handleContact}
            className="relative px-5 py-2 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10"
          >
            Contact
          </button>
          <button
            onClick={handleProjectsClick}
            className="relative px-5 py-2 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10"
          >
            Projects
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-md hover:bg-white/90 transition-all duration-300 shadow-md shadow-black/5"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 items-center justify-center">
            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </div>
        </button>
      </div>

        {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-400 ease-out overflow-hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 pb-4 pt-2 flex flex-col gap-1 bg-black/40 backdrop-blur-xl mt-2 mx-4 rounded-2xl border border-white/10">
          <button
            onClick={handleAbout}
            className="px-4 py-3 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 text-left"
          >
            About
          </button>
          <button
            onClick={handleContact}
            className="px-4 py-3 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 text-left"
          >
            Contact
          </button>
          <button
            onClick={handleProjectsClick}
            className="px-4 py-3 rounded-xl text-sm font-medium font-poppins tracking-wide transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 text-left"
          >
            Projects
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
