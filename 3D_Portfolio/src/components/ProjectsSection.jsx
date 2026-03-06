import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect, useMemo } from "react";
import { Html, Stars, MeshDistortMaterial } from "@react-three/drei";
import SecondIsland from "../models/Second";
import * as THREE from "three";

/* ── Project data ── */
const projects = [
  { id: 1, title: "Ecko Consulting",   description: "Consulting platform for sustainable business.",     link: "https://greenuser1.github.io/Eckoconsulting.com/",       color: "#0072ff", category: "websites"  },
  { id: 2, title: "SPA Website",       description: "Single Page App with smooth navigation.",           link: "https://v0-spa-website-tyj2ge.vercel.app/",              color: "#00c6ff", category: "websites"  },
  { id: 3, title: "Cafeteria Website", description: "Modern cafe with online ordering.",                 link: "https://v0-cafeteria-website-design-bponlb.vercel.app/", color: "#10b981", category: "websites"  },
  { id: 4, title: "Fearthelord.co",    description: "Visually striking website design.",                 link: "https://fearthelord.co/index.html",                      color: "#f59e0b", category: "websites"  },
  { id: 5, title: "Designer Portfolio",description: "Creative portfolio showcase.",                      link: "https://byte500.github.io/EricPortfolio/",               color: "#8b5cf6", category: "websites"  },
  { id: 6, title: "Management App",    description: "Business management web app.",                      link: "https://github.com/Marco0204/drama",                     color: "#ef4444", category: "fullstack" },
  { id: 7, title: "Car Manager",       description: "Car dealership inventory system.",                  link: "https://github.com/Marco0204/Car-manager",               color: "#0072ff", category: "fullstack" },
  { id: 8, title: "Plant Care App",    description: "Plant care schedules and reminders.",               link: "https://pleasefix-1.onrender.com",                       color: "#10b981", category: "fullstack" },
  { id: 9, title: "SEO Analyzer",      description: "Keyword density analysis tool.",                    link: "https://github.com/Marco0204/SEO",                       color: "#f59e0b", category: "tools"     },
];

/* ── Animated neon particles floating in space ── */
const NeonParticles = ({ count = 80 }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40 - 15],
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        color: ["#00c6ff", "#0072ff", "#8b5cf6", "#f59e0b", "#10b981"][Math.floor(Math.random() * 5)]
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array;
    particles.forEach((p, i) => {
      const t = clock.elapsedTime * p.speed + p.offset;
      positions[i * 3] = p.position[0] + Math.sin(t) * 2;
      positions[i * 3 + 1] = p.position[1] + Math.cos(t * 0.7) * 1.5;
      positions[i * 3 + 2] = p.position[2] + Math.sin(t * 0.5) * 1;
    });
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#00c6ff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

/* ── Animated glowing orb ── */
const GlowOrb = ({ position, color, scale = 1 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.scale.setScalar(scale * (1 + Math.sin(t * 2) * 0.1));
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

/* ── Floating project orb with glow effect - smaller size ── */
const ProjectOrb = ({ position, project, onSelect, index }) => {
  const groupRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const downPos = useRef(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime + index * 0.5;
    const baseScale = hovered ? 1.3 : 1 + Math.sin(t * 2) * 0.1;
    groupRef.current.scale.setScalar(baseScale);
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 1.8 : 1.5 + Math.sin(t * 3) * 0.2);
      glowRef.current.material.opacity = hovered ? 0.5 : 0.25 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow - smaller */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.25} side={THREE.BackSide} />
      </mesh>
      
      {/* Main orb - smaller (0.7 instead of 1.5) */}
      <mesh
        ref={groupRef}
        onPointerDown={(e) => { e.stopPropagation(); downPos.current = { x: e.clientX, y: e.clientY }; }}
        onPointerUp={(e) => {
          e.stopPropagation();
          if (!downPos.current) return;
          const dx = Math.abs(e.clientX - downPos.current.x);
          const dy = Math.abs(e.clientY - downPos.current.y);
          downPos.current = null;
          if (dx < 12 && dy < 12) onSelect(project);
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.7, 24, 24]} />
        <MeshDistortMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          distort={hovered ? 0.3 : 0.15}
          speed={2}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Label */}
      {hovered && (
        <Html center distanceFactor={6} style={{ pointerEvents: "none", userSelect: "none" }}>
          <div className="tooltip-label-dark-big">
            <span>{project.title}</span>
            <span className="tooltip-arrow">&#8599;</span>
          </div>
        </Html>
      )}
    </group>
  );
};

/* ── Orbiting positions — one per project (9 total) ── */
const orbitConfigs = [
  { radius: 12, height: 6,  speed: 0.15, offset: 0,             id: 1 },
  { radius: 12, height: 6,  speed: 0.15, offset: Math.PI,       id: 2 },
  { radius: 10, height: 10, speed: 0.12, offset: Math.PI / 2,   id: 3 },
  { radius: 14, height: 3,  speed: 0.18, offset: Math.PI / 3,   id: 4 },
  { radius: 14, height: 3,  speed: 0.18, offset: Math.PI * 4/3, id: 5 },
  { radius: 11, height: 0,  speed: 0.14, offset: Math.PI / 4,   id: 6 },
  { radius: 13, height: 8,  speed: 0.1,  offset: Math.PI * 3/4, id: 7 },
  { radius: 8,  height: 14, speed: 0.08, offset: 0,             id: 8 },
  { radius: 15, height: -2, speed: 0.16, offset: Math.PI * 5/6, id: 9 },
];

/* ── Orbiting project orb - like the plane with banking/tilting ── */
const OrbitingOrb = ({ config, project, onSelect, index, isRotating }) => {
  const groupRef = useRef();
  const prevAngle = useRef(0);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * config.speed + config.offset;
    
    // Position on circular orbit
    groupRef.current.position.x = Math.cos(t) * config.radius;
    groupRef.current.position.z = Math.sin(t) * config.radius;
    groupRef.current.position.y = config.height + Math.sin(t * 2) * 0.8;
    
    // Calculate angular velocity for banking effect
    const currentAngle = t;
    const angularVelocity = currentAngle - prevAngle.current;
    prevAngle.current = currentAngle;
    
    // Plane-like banking and tilting effect when orbiting/rotating
    const baseBank = isRotating ? 0.25 : 0.08;
    groupRef.current.rotation.z = Math.sin(t * 4) * baseBank;
    groupRef.current.rotation.x = Math.sin(t * 3) * 0.05;
    
    // Make it "look" towards the direction of movement
    groupRef.current.rotation.y = -t + Math.PI / 2;
  });
  
  return (
    <group ref={groupRef}>
      <ProjectOrb
        position={[0, 0, 0]}
        project={project}
        onSelect={onSelect}
        index={index}
      />
    </group>
  );
};

/* ── Main 3D Scene ── */
const Scene = ({ onSelect, isRotating, setIsRotating }) => {
  return (
    <>
      {/* Ambient neon glow orbs in background */}
      <GlowOrb position={[-15, 8, -20]} color="#0072ff" scale={4} />
      <GlowOrb position={[18, -5, -25]} color="#8b5cf6" scale={5} />
      <GlowOrb position={[0, -10, -30]} color="#00c6ff" scale={6} />
      
      {/* Neon particles */}
      <NeonParticles count={100} />

      {/* Island - bigger */}
      <SecondIsland
        position={[0, -5, -15]}
        scale={[0.55, 0.55, 0.55]}
        rotation={[0, 0, 0]}
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        autoRotate
      />
      
      {/* Orbiting project orbs around the island center */}
      <group position={[0, -5, -15]}>
        {orbitConfigs.map((config, i) => {
          const project = projects.find((p) => p.id === config.id);
          return (
            <OrbitingOrb
              key={config.id}
              config={config}
              project={project}
              onSelect={onSelect}
              index={i}
              isRotating={isRotating}
            />
          );
        })}
      </group>
    </>
  );
};

/* ── All Projects list modal ── */
const AllProjectsModal = ({ onClose, onSelect }) => {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const categories = ["all", "websites", "fullstack", "tools"];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-6 sm:p-10" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
      <div
        className="relative w-full max-w-2xl max-h-[80vh] flex flex-col mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl shadow-2xl border border-slate-700/40 animate-modal-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -inset-0.5 rounded-3xl opacity-20 blur-xl pointer-events-none" style={{ background: "linear-gradient(135deg, #0072ff, #8b5cf6)" }} />

        {/* Header */}
        <div className="relative flex items-center justify-between px-10 pt-10 pb-6 border-b border-slate-700/40">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-slate-500 font-poppins mb-1">All work</p>
            <h2 className="text-3xl font-poppins font-light text-white tracking-tight">
              Projects{" "}
              <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">Gallery</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3l8 8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="relative flex gap-2 px-10 py-5 border-b border-slate-700/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-poppins font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-gradient-to-r from-[#0072ff] to-[#00c6ff] text-white shadow-lg"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="relative overflow-y-auto p-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => { onClose(); onSelect(project); }}
              className="group text-left p-6 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/30 hover:border-slate-600/60 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: project.color, boxShadow: `0 0 12px ${project.color}88` }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-white font-poppins group-hover:text-[#00c6ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-poppins mt-1 leading-relaxed">{project.description}</p>
                  <span className="inline-block mt-3 text-xs tracking-wider uppercase text-slate-500 font-poppins px-2.5 py-1 rounded-full bg-slate-700/50">
                    {project.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Project modal ── */
const Modal = ({ project, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-lg" />
      <div
        className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-12 max-w-lg w-full shadow-2xl border border-slate-700/50 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-30 blur-xl"
          style={{ background: `linear-gradient(135deg, ${project.color}44, transparent)` }}
        />
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3l8 8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        <div className="relative">
          <div className="w-5 h-5 rounded-full mb-6 shadow-lg" style={{ background: project.color, boxShadow: `0 0 20px ${project.color}66` }} />
          <h3 className="text-3xl font-semibold text-white font-poppins mb-4">{project.title}</h3>
          <p className="text-lg text-slate-400 leading-relaxed font-poppins mb-4">{project.description}</p>
          <span className="inline-block text-xs tracking-wider uppercase text-slate-500 font-poppins px-3 py-1 rounded-full bg-slate-700/50">{project.category}</span>
          
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-lg font-medium font-poppins tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
              boxShadow: `0 10px 40px ${project.color}33`
            }}
          >
            View Project
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Main section ── */
const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section id="projects" className="relative h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#030712]" />
      
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 114, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 40%), radial-gradient(ellipse 80% 60% at 80% 80%, rgba(0, 198, 255, 0.12) 0%, transparent 40%)"
        }}
      />
      
      {/* Moving light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-[#0072ff]/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] -bottom-32 -right-32 bg-[#8b5cf6]/10 rounded-full blur-[80px] animate-pulse-slower" />
        <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00c6ff]/5 rounded-full blur-[60px] animate-pulse-slow" />
      </div>

      {/* Header */}
      <div className="absolute top-10 inset-x-0 z-10 text-center pointer-events-none">
        <p className="text-sm tracking-[0.5em] uppercase text-slate-500 font-poppins font-light mb-4">
        
        </p>
        
      </div>

      {/* View All button */}
      <div className="absolute bottom-10 inset-x-0 z-10 flex flex-col items-center gap-4 pointer-events-none">
        <button
          className="pointer-events-auto px-8 py-3.5 rounded-full text-sm font-poppins font-medium text-white border border-slate-600/60 bg-slate-900/60 backdrop-blur-sm hover:bg-slate-800/80 hover:border-[#00c6ff]/50 hover:shadow-lg hover:shadow-[#00c6ff]/10 transition-all duration-300 flex items-center gap-2.5"
          onClick={() => setShowAll(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="#94a3b8" strokeWidth="1.5"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="#94a3b8" strokeWidth="1.5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="#94a3b8" strokeWidth="1.5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="#94a3b8" strokeWidth="1.5"/>
          </svg>
          View All Projects
        </button>
        <p className={`text-xs font-poppins tracking-[0.3em] uppercase transition-opacity duration-500 ${isRotating ? "opacity-0" : "opacity-40"} text-slate-400`}>
          Drag to rotate
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        className={`w-full h-full ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 500, position: [0, 5, 22], fov: 50 }}
        gl={{ alpha: false, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#030712")}
      >
        <Suspense fallback={null}>
          {/* Stars */}
          <Stars radius={150} depth={80} count={5000} factor={5} saturation={0.3} fade speed={0.3} />

          {/* Lighting - brighter to show island colors */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, 15, -5]} intensity={1.5} color="#ffeedd" />
          <pointLight position={[-15, 10, -15]} intensity={1.5} color="#00c6ff" distance={60} />
          <pointLight position={[15, 5, 15]} intensity={1.2} color="#8b5cf6" distance={50} />
          <pointLight position={[0, 10, 0]} intensity={1} color="#ffffff" distance={40} />
          <hemisphereLight skyColor="#87ceeb" groundColor="#1e3a5f" intensity={0.6} />
          <fog attach="fog" args={["#030712", 40, 150]} />

          <Scene
            onSelect={setSelected}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>

      <Modal project={selected} onClose={() => setSelected(null)} />
      {showAll && (
        <AllProjectsModal
          onClose={() => setShowAll(false)}
          onSelect={(p) => setSelected(p)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
