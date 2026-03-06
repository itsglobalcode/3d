import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import WelcomeIntro from "../components/WelcomeIntro";
import ProjectsSection from "../components/ProjectsSection";
import AboutOverlay from "../components/AboutOverlay";
import ContactOverlay from "../components/ContactOverlay";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const scrollY = useRef(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Scroll to projects if navigated with ?scroll=projects
  useEffect(() => {
    if (location.search.includes("scroll=projects")) {
      const timer = setTimeout(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.max(0, (scrollY.current - vh * 0.3) / (vh * 0.7));
      setParallaxOffset(Math.min(progress * 80, 80));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const adjustIslandForScreenSize = () => {
    const w = window.innerWidth;
    if (w < 768) {
      return [[0.65, 0.65, 0.65], [0, -1.5, -43], [0.12, 4.7, 0]];
    }
    return [[0.8, 0.8, 0.8], [0, -2.2, -43], [0.12, 4.7, 0]];
  };

  const adjustPlaneForScreenSize = () => {
    if (window.innerWidth < 768) {
      return [[1.2, 1.2, 1.2], [0, 0.8, 0]];
    }
    return [[2.2, 2.2, 2.2], [0, 1.2, -4]];
  };

  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <div className="w-full overflow-x-hidden">
      {/* Custom navbar with overlay handlers */}
      <Navbar
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />

      {/* Overlays */}
      {showAbout && <AboutOverlay onClose={() => setShowAbout(false)} />}
      {showContact && <ContactOverlay onClose={() => setShowContact(false)} />}

      {/* SECTION 1: Fox Island */}
      <section ref={heroRef} className="w-full h-screen relative">
        {showIntro && (
          <WelcomeIntro
            sceneReady={sceneReady}
            onComplete={() => setShowIntro(false)}
          />
        )}

        {!showIntro && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-2">
            <p className={`text-xs font-poppins tracking-[0.3em] uppercase transition-all duration-500 ${isRotating ? "opacity-0" : "opacity-70"} text-slate-500`}>
             
            </p>
            <div className={`transition-all duration-500 ${isRotating ? "opacity-0" : "opacity-60 animate-bounce"}`}>
             
                <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
             
            </div>
          </div>
        )}

        <Canvas
          className={`w-full h-screen bg-transparent select-none ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
          camera={{ near: 0.1, far: 1000, position: [0, 3, 18], fov: 55 }}
          onCreated={handleSceneReady}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

            <Bird onBirdClick={() => setShowAbout(true)} />
            <Sky isRotating={isRotating} />

            <Island
              position={islandPosition}
              scale={islandScale}
              rotation={islandRotation}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              onHouseClick={() => setShowContact(true)}
            />

            <Plane
              isRotating={isRotating}
              scale={planeScale}
              position={planePosition}
              rotation={[0, 20.1, 0]}
            />
          </Suspense>
        </Canvas>
      </section>

      {/* PARALLAX DIVIDER */}
      <div
        className="relative z-10 pointer-events-none h-0"
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      {/* SECTION 2: Flying Island + Projects */}
      <div
        ref={projectsRef}
        style={{ transform: `translateY(${-parallaxOffset}px)`, marginBottom: `${-parallaxOffset}px` }}
      >
        <ProjectsSection />
      </div>
    </div>
  );
};

export default Home;
