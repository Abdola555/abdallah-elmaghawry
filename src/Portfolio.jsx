import { motion } from "framer-motion";
import {
  Briefcase,
  Cpu,
  Layers,
  Wrench,
  Code,
  Terminal,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  CheckCircle,
  Zap,
  BatteryCharging,
  GraduationCap,
  Award,
  MapPin,
  Phone,
  Languages,
} from "lucide-react";
// Personal photo — drop a file at src/assets/abdallah.png
// (transparent background recommended; see DEPLOY.md for a free 30-second tool)
import abdallahPhoto from "./assets/abdallah.png";

function Portfolio() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Real projects from Abdallah's CV
  const projects = [
    {
      id: 1,
      title: "Battery Management System (BMS) — In Progress",
      company: "Pylon",
      description:
        "Architecting a full BMS solution for LFP battery packs using Texas Instruments AFE and fuel-gauge ICs. Cell monitoring, OV/UV/OC protection, balancing, and SOC/SOH estimation integrated with system-level control and validation workflows.",
      image:
        "https://placehold.co/800x600/2563eb/ffffff?text=BMS+%E2%80%94+LFP+Battery+Pack",
      tags: ["LFP", "TI AFE", "Fuel Gauge IC", "SOC/SOH", "Balancing", "Protection"],
    },
    {
      id: 2,
      title: "Three-Phase Smart Meter SMPS",
      company: "Pylon",
      description:
        "Led the design of a cost-optimized three-phase SMPS for smart electric meters with robust protection against grid transients. Reduced BOM cost by ~40% vs. previous generation and designed EMI filter architectures meeting CISPR/IEC compliance.",
      image:
        "https://placehold.co/800x600/1e40af/ffffff?text=Three-Phase+SMPS",
      tags: ["Three-Phase SMPS", "EMI/EMC", "CISPR/IEC", "Cost Optimization", "Smart Meter"],
    },
    {
      id: 3,
      title: "150W Dual-Flyback TV Power Supply",
      company: "El-Araby Group",
      description:
        "Co-designed a 150W TV power supply using two parallel flyback converters powering the LED backlight and main board independently, with an input PFC boost stage to meet efficiency standards. Owned the full development cycle from concept to validation.",
      image:
        "https://placehold.co/800x600/3b82f6/ffffff?text=150W+Dual+Flyback",
      tags: ["Flyback", "PFC", "TV PSU", "Validation", "Mass Production"],
    },
    {
      id: 4,
      title: "75W Quasi-Resonant Flyback Converter",
      company: "El-Araby Group",
      description:
        "Spearheaded development of the company's first in-house SMPS — a 75W quasi-resonant flyback. Owned the full magnetic design (core selection, gapping, winding structure) for the custom transformer, establishing a new internal capability.",
      image:
        "https://placehold.co/800x600/2563eb/ffffff?text=75W+QR+Flyback",
      tags: ["Quasi-Resonant Flyback", "Magnetics", "Transformer Design", "In-House SMPS"],
    },
    {
      id: 5,
      title: "ZettBrett EVB — In Progress",
      company: "Phil's Lab Course Graduation Project",
      description:
        "10-layer impedance-controlled, double-sided assembly with 400+ parts (down to 0201 passives). Built around an AMD/Xilinx Zynq SoC with 1GB DDR3, 4GB eMMC, Gigabit Ethernet, USB HS OTG, on-board USB-to-JTAG, and Embedded-Linux capability.",
      image:
        "https://placehold.co/800x600/1e40af/ffffff?text=Zynq+SoC+EVB",
      tags: ["Zynq SoC", "10-Layer PCB", "DDR3", "eMMC", "Gigabit Ethernet", "Embedded Linux"],
    },
    {
      id: 6,
      title: "AI-Based Battery SOH Estimation (M.Sc. Research)",
      company: "Cairo University",
      description:
        "Master's research focused on State-of-Health estimation for EV battery packs using AI techniques — bridging power electronics, data-driven modeling, and intelligent control for next-generation electric mobility.",
      image:
        "https://placehold.co/800x600/3b82f6/ffffff?text=AI+SOH+Estimation",
      tags: ["EV Batteries", "SOH", "AI/ML", "Adaptive Control", "Research"],
    },
  ];

  // Skills aligned with the CV
  const skills = [
    {
      id: 1,
      name: "Power Electronics",
      icon: Zap,
      level: 95,
      items: ["Flyback (QR, Dual)", "LLC Resonant", "PFC Boost", "Three-Phase SMPS"],
    },
    {
      id: 2,
      name: "Magnetics Design",
      icon: Layers,
      level: 90,
      items: ["Core Selection", "Gapping", "Winding Optimization"],
    },
    {
      id: 3,
      name: "PCB Design",
      icon: Cpu,
      level: 92,
      items: ["High-Speed", "Impedance Control", "EMI/EMC", "Thermal Management"],
    },
    {
      id: 4,
      name: "Simulation",
      icon: Terminal,
      level: 88,
      items: ["LTspice", "SIMPLIS", "MATLAB / Simulink"],
    },
    {
      id: 5,
      name: "Programming & Automation",
      icon: Code,
      level: 80,
      items: ["Python (test automation, data analysis)", "C (embedded fundamentals)", "PyVISA / SCPI"],
    },
    {
      id: 6,
      name: "Battery Systems",
      icon: BatteryCharging,
      level: 85,
      items: ["LFP Battery Packs", "TI AFE & Fuel Gauge ICs", "SOC / SOH Estimation", "OV/UV/OC Protection"],
    },
  ];

  // Real experience timeline from the CV
  const experience = [
    {
      role: "Sr. R&D HW Electronics Engineer",
      company: "Pylon",
      period: "Oct 2025 – Present",
      bullets: [
        "Developing a Battery Management System (BMS) for LFP battery packs using TI AFE and fuel-gauge ICs.",
        "Implementing cell monitoring, OV/UV/OC protection, and SOC/SOH estimation.",
        "Leading the design of SMPS for three-phase Smart Electric Meters.",
        "Reduced BOM cost by ~40% vs. the previous generation design.",
        "Designed EMI filter architectures meeting CISPR/IEC compliance for three-phase smart-meter SMPS.",
        "Designed automated production test jigs that cut validation time and improved factory throughput.",
      ],
    },
    {
      role: "Sr. R&D HW Electronics Engineer",
      company: "El-Araby Group TV",
      period: "Jan 2024 – Oct 2025",
      bullets: [
        "Executed on-site validation testing and vendor technical audits during two business residencies in China.",
        "Directed hardware development from schematic capture and component selection through to final assembly.",
        "Owned PCB validation and qualification for mass production.",
      ],
    },
    {
      role: "R&D HW Electronics Engineer",
      company: "El-Araby Group TV",
      period: "June 2022 – Jan 2024",
      bullets: [
        "Designed a 75W quasi-resonant flyback converter (first in-house SMPS).",
        "Co-designed a 150W dual-flyback TV power supply with parallel converters.",
        "Performed analytical design calculations for LLC resonant converters.",
        "Ensured compliance with IPC PCB standards and IEC regulatory requirements.",
      ],
    },
    {
      role: "Early Training Experience",
      company: "Alex. Petroleum Maintenance · Abu Qir Fertilizers · Alex. Electricity Distribution",
      period: "Aug 2018 – Aug 2019",
      bullets: [
        "Shadowed field technicians on preventive and corrective maintenance.",
        "Exposure to industrial operations across petroleum, chemical, and electrical-distribution sectors.",
      ],
    },
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Abdallah Elmaghawry
            </motion.a>
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-blue-600"
              onClick={() => alert("Mobile menu would open here")}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 font-semibold tracking-wide mb-3">
                Senior Hardware Engineer · Power Electronics
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Abdallah{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                  Elmaghawry
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Power electronics specialist (SMPS, LLC, Flyback) leading designs from concept to mass production
                in consumer and industrial products. Proven track record in cost optimization, EMI compliance, and
                international vendor validation. M.Sc. researcher in AI-based battery SOH estimation for EV applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => scrollToSection("projects")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center">
                {/* Fixed-size square wrapper keeps the portrait perfectly centered
                    inside the hero column, regardless of the badge offset. */}
                <div className="relative w-56 h-56 md:w-72 md:h-72">
                  {/* Soft outer glow — slightly larger than the disc */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-700 blur-2xl opacity-40"></div>
                  </div>
                  {/* Solid colored disc behind the portrait */}
                  <div className="absolute inset-2 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 opacity-90 shadow-2xl"></div>
                  </div>
                  {/* The portrait itself — same size as wrapper, centered content */}
                  <img
                    src={abdallahPhoto}
                    alt="Abdallah Elmaghawry"
                    className="relative w-full h-full object-contain object-center drop-shadow-2xl"
                  />
                  {/* Tools badge — anchored to the wrapper, no longer pushes layout */}
                  <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-xl shadow-xl border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-gray-700">
                      Altium · LTspice · MATLAB
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-800 mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 blur-3xl opacity-70"></div>
                </div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-2 shadow-2xl">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden">
                    <img
                      src={abdallahPhoto}
                      alt="Abdallah Elmaghawry"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Power Electronics, From Schematic to Mass Production
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I'm a Senior Hardware Engineer based in Alexandria, Egypt, focused on the design of switched-mode
                power supplies and battery systems. My experience spans consumer TV power supplies at El-Araby
                Group, three-phase smart-meter SMPS and LFP battery management at Pylon, and international vendor
                validation residencies in China.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Alongside industry work, I'm pursuing an M.Sc. at Cairo University researching AI-based State-of-Health
                estimation for EV batteries — combining power electronics, magnetics, and intelligent control to
                build the next generation of electrified products.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years in HW R&D", value: "3+" },
                  { label: "BOM Cost Reduction", value: "~40%" },
                  { label: "China Residencies", value: "2" },
                  { label: "Languages Spoken", value: "4" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading hardware R&D from concept and schematic capture all the way to mass-production sign-off.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-800 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            {experience.map((job, index) => (
              <motion.div
                key={index}
                className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`absolute left-2 md:left-1/2 top-2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white`}
                ></div>
                <div className={`${index % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <p className="text-sm font-semibold text-blue-600">{job.period}</p>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{job.role}</h3>
                    <p className="text-gray-700 font-medium mb-4">{job.company}</p>
                    <ul className="space-y-2 text-left">
                      {job.bullets.map((b, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Projects
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selected hardware projects across power electronics, embedded systems, and battery management.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-800 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-70 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{project.company}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Technical Expertise
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Core competencies across power electronics, magnetics, PCB design, and battery systems.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-800 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <skill.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-50">
                        Proficiency
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-indigo-600"
                    ></motion.div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Tools & Instruments */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Engineering Process</h3>
                <p className="text-gray-600 mb-6">
                  My design methodology takes a product from requirements to production-ready hardware:
                </p>
                <ol className="space-y-4">
                  {[
                    "Requirements & topology selection",
                    "Analytical design (magnetics, loss budget, control)",
                    "Schematic capture & component selection",
                    "Multilayer PCB layout (impedance, EMI, thermal)",
                    "Prototyping, bring-up & lab characterization",
                    "EMC / safety compliance (CISPR, IEC, IPC)",
                    "Vendor validation & mass-production handoff",
                  ].map((step, i) => (
                    <li key={i} className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                      Tools & Instruments
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Layers, label: "Altium" },
                        { icon: Cpu, label: "AutoCAD" },
                        { icon: Wrench, label: "LTspice" },
                        { icon: Terminal, label: "SIMPLIS" },
                        { icon: Code, label: "MATLAB" },
                        { icon: Briefcase, label: "PyVISA / SCPI" },
                      ].map((tool, i) => (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                          whileHover={{ y: -5 }}
                        >
                          <tool.icon className="h-6 w-6 text-blue-600 mb-2" />
                          <span className="text-sm font-medium text-gray-700">{tool.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education & Development
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-sm font-semibold text-blue-600 uppercase">In Progress</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">M.Sc. in Power Electronics</h3>
              <p className="text-gray-700 font-medium mb-3">Cairo University — Egypt</p>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Research:</span> AI-based SOH Estimation in Electric Vehicles.
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Coursework:</span> Advanced Power Electronics, Magnetics Design,
                Adaptive Control, Intelligent Control.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-sm font-semibold text-blue-600 uppercase">2020 · Honors</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">B.Sc. in Electrical Engineering</h3>
              <p className="text-gray-700 font-medium mb-3">Alexandria University — Power Department</p>
              <p className="text-gray-600">
                Graduated with <span className="font-semibold">Distinction with Honor</span> (ranked 5th in class).
              </p>
            </motion.div>
          </div>

          {/* Certifications + Languages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Development</h3>
              <ul className="space-y-2">
                {[
                  "Advanced Hardware Design — Phil's Lab",
                  "PCB Materials and Stack-Up — FEDEVEL",
                  "PCB Thermal Management — Udemy",
                  "PCB Design & Manufacturing — Udemy",
                  "PLC Level 1 — EGYCET",
                  "Project Management — McKinsey, Pluralsight, Coursera (Google PM in progress)",
                  "Entrepreneurship Program — GYP",
                ].map((c, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Languages className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Languages</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { lang: "Arabic", level: "Native" },
                  { lang: "English", level: "Fluent" },
                  { lang: "Chinese", level: "HSK1 — Basic" },
                  { lang: "Japanese", level: "JLPT N5 — Basic" },
                ].map((l, i) => (
                  <li key={i} className="flex justify-between items-center bg-white px-4 py-2 rounded-lg border border-gray-100">
                    <span className="font-medium text-gray-800">{l.lang}</span>
                    <span className="text-sm text-blue-600 font-semibold">{l.level}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-md font-bold text-gray-900 mt-6 mb-2">Extracurricular</h4>
              <p className="text-gray-600 text-sm">
                Robotics competitions: Line Maze Robot (LMR), Minesweeper Robot, and Robocon — embedded control,
                sensor integration, real-time decision algorithms, and rapid prototyping.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's Build Something Great
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Open to power-electronics, BMS, and embedded-hardware opportunities — full-time or consulting.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <Mail className="h-5 w-5 text-blue-400 mr-3" />
                      Email
                    </h3>
                    <a
                      href="mailto:abdalah.maghawry@gmail.com"
                      className="text-gray-300 hover:text-blue-300 break-all"
                    >
                      abdalah.maghawry@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <Phone className="h-5 w-5 text-blue-400 mr-3" />
                      Phone
                    </h3>
                    <a href="tel:+201062806009" className="text-gray-300 hover:text-blue-300">
                      +20 106 280 6009
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <Linkedin className="h-5 w-5 text-blue-400 mr-3" />
                      LinkedIn
                    </h3>
                    <a
                      href="https://www.linkedin.com/in/abdallah-elmaghawry/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-300 break-all"
                    >
                      linkedin.com/in/abdallah-elmaghawry
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <Github className="h-5 w-5 text-blue-400 mr-3" />
                      GitHub
                    </h3>
                    <p className="text-gray-300">Add your GitHub URL here</p>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                      Location
                    </h3>
                    <p className="text-gray-300">Alexandria, Egypt</p>
                    <p className="text-gray-400 text-sm mt-1">Open to relocation and remote collaboration.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = form.elements.namedItem("name").value;
                  const email = form.elements.namedItem("email").value;
                  const message = form.elements.namedItem("message").value;
                  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
                  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
                  window.location.href = `mailto:abdalah.maghawry@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a
                href="#"
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
              >
                Abdallah Elmaghawry
              </a>
              <p className="mt-2">Power Electronics · Battery Systems · Embedded Hardware</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/abdallah-elmaghawry/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:abdalah.maghawry@gmail.com"
                className="hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Abdallah Elmaghawry. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        whileHover={{ y: -3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
}

export default Portfolio;
