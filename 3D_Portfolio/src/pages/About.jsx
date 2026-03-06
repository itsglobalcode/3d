const skills = [
  { category: "Web Development", items: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js & Next.js", "Node.js & Express", "RESTful API Design"] },
  { category: "Web App Development", items: ["Full-Stack Development", "Database Design (SQL & NoSQL)", "Cloud Services (AWS, Azure)", "Progressive Web Apps (PWAs)", "Performance Optimization"] },
  { category: "Entrepreneurship", items: ["Business Strategy", "Product Development", "Market Research", "Startup Management", "Pitching & Fundraising"] },
];

const About = () => {
  return (
    <section className="min-h-screen bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-slate-400 font-poppins font-light mb-4">
            Get to know me
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-extralight text-slate-800 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-light">
              Me
            </span>
          </h1>
          <div className="mt-4 w-12 h-px bg-gradient-to-r from-slate-300 to-transparent" />
        </div>

        {/* Bio */}
        <div className="mb-20 space-y-5 max-w-2xl">
          <p className="text-base text-slate-600 leading-relaxed font-poppins font-light">
            {"Hello! I'm Marco Raro Moreno, a web development student and entrepreneur passionate about building digital solutions that make an impact. Through real-world projects, I've gained hands-on experience in both front-end and back-end development."}
          </p>
          <p className="text-base text-slate-600 leading-relaxed font-poppins font-light">
            My journey in tech is driven by curiosity and a constant desire to learn and grow. I love solving problems and turning ideas into reality through code, always looking for new ways to push the boundaries of web development.
          </p>
          <p className="text-base text-slate-600 leading-relaxed font-poppins font-light">
            {"Beyond coding, I'm exploring emerging technologies, working on entrepreneurial ventures, and always brainstorming new ideas. I believe in the power of technology to drive change and improve businesses."}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl sm:text-2xl font-poppins font-light text-slate-800 mb-10 tracking-tight">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div
                key={group.category}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60"
              >
                <h3 className="text-sm font-semibold text-slate-700 font-poppins mb-4 tracking-wide">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-500 font-poppins font-light flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
