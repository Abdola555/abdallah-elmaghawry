// Portfolio data — canonical content source for Abdallah El-Maghawry

export const profile = {
  name: "Abdallah El-Maghawry",
  title: "Senior R&D Hardware Electronics Engineer",
  headline: "Power Electronics · BMS · SMPS · PCB Design",
  location: "Alexandria, Egypt",
  email: "abdalah.maghawry@gmail.com",
  phone: "+20 106 280 6009",
  linkedin: "https://www.linkedin.com/in/abdallah-elmaghawry/",
  github: "https://github.com/Abdola555",
  portfolio: "https://abdola555.github.io/abdallah-elmaghawry/",
  avatarUrl: "https://avatars.githubusercontent.com/Abdola555",
  summary:
    "Power electronics specialist with 4+ years of professional R&D — designing and validating SMPS, flyback converters, and battery management systems from concept to mass production. Currently at Pylon (YC S21), leading BMS for LFP packs and three-phase smart-meter SMPS. M.Sc. researcher in AI-based battery SOH estimation for EV applications.",
};

export const contactChannels = [
  { label: "Email", href: "mailto:abdalah.maghawry@gmail.com", value: "abdalah.maghawry@gmail.com", icon: "mail" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdallah-elmaghawry/", value: "abdallah-elmaghawry", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/Abdola555", value: "Abdola555", icon: "github" },
  { label: "Phone", href: "tel:+201062806009", value: "+20 106 280 6009", icon: "phone" },
];

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/insights", label: "Insights" },
  { to: "/journey", label: "Journey" },
  { to: "/contact", label: "Contact" },
];

export const featuredProjects = [
  {
    slug: "bms-pylon",
    name: "Battery Management System (BMS)",
    org: "Pylon",
    status: "In Progress",
    year: "2025–Present",
    recruiterView: "Architecting a full BMS platform for LFP battery packs with production-oriented protection and monitoring.",
    impact: "Core strategic product work in EV-adjacent battery systems",
    deepDive: [
      "TI AFE + fuel-gauge IC integration for cell-level monitoring",
      "OV/UV/OC protection and balancing strategy",
      "SOC/SOH estimation workflows tied to validation loops",
    ],
    pcb: { col: 0, row: 0 },
    connections: ["smps-3phase"],
    stack: ["TI BQ76952 AFE", "Fuel-gauge IC", "STM32", "Altium Designer", "LTspice", "Python/PyVISA"],
    topology: {
      nodes: [
        { id: "cells", label: "LFP Cells", x: 10, y: 30, kind: "port" },
        { id: "afe", label: "TI AFE", x: 30, y: 30, kind: "ic" },
        { id: "fuelgauge", label: "Fuel Gauge", x: 50, y: 15, kind: "ic" },
        { id: "mcu", label: "MCU", x: 50, y: 45, kind: "ic" },
        { id: "mosfets", label: "MOSFETs", x: 70, y: 30, kind: "passive" },
        { id: "load", label: "Load", x: 90, y: 30, kind: "port" },
      ],
      edges: [
        { from: "cells", to: "afe", signal: "power" },
        { from: "afe", to: "fuelgauge", signal: "data" },
        { from: "afe", to: "mcu", signal: "data" },
        { from: "mcu", to: "mosfets", signal: "data" },
        { from: "mosfets", to: "load", signal: "power" },
      ],
    },
    lessons: [
      {
        heading: "Why TI AFE over discrete sensing",
        body: "Discrete voltage dividers and op-amp chains hit noise floors you can't calibrate away at cell-level resolution. The TI BQ76952 gives 1 mV cell voltage resolution and integrated OV/UV comparators in hardware — no software debounce needed for safety-critical trips.",
      },
      {
        heading: "SOC estimation: the filter matters more than the model",
        body: "Initial attempts with a pure Coulomb counter drifted >15% after a few cycles due to parasitic loads. Adding an extended Kalman filter anchored to OCV lookups brought steady-state error under 3%. The lesson: no matter how accurate your chemistry model is, measurement quality and filter tuning determine real-world performance.",
      },
      {
        heading: "Production test jig design saved weeks",
        body: "Designing the automated test jig before first prototype meant every board shipped from the factory was validated against full charge/discharge profiles, not spot checks. DFT thinking applied to the entire validation flow, not just the circuit.",
      },
    ],
    gallery: [],
    nextSteps: [
      "SOC field calibration across temperature",
      "Balancing algorithm tuning for production tolerance spread",
      "UART-based diagnostics interface for factory use",
    ],
  },
  {
    slug: "smps-3phase",
    name: "Three-Phase Smart Meter SMPS",
    org: "Pylon",
    status: "Shipped",
    year: "2025",
    recruiterView: "Led design of a robust and cost-optimized SMPS for smart electric meters in noisy grid environments.",
    impact: "~40% BOM reduction versus previous generation",
    deepDive: [
      "Protection-focused architecture for grid transients",
      "EMI filter design aligned with CISPR/IEC expectations",
      "Cross-functional vendor discussions for topology/component decisions",
    ],
    pcb: { col: 1, row: 0 },
    connections: ["bms-pylon", "tv-psu-150w"],
    stack: ["Altium Designer", "LTspice", "SIMPLIS", "CISPR 32 / IEC 61000", "Spectrum Analyzer"],
    topology: {
      nodes: [
        { id: "grid", label: "3-Phase Grid", x: 5, y: 30, kind: "port" },
        { id: "emi", label: "EMI Filter", x: 22, y: 30, kind: "passive" },
        { id: "rect", label: "Rectifier", x: 40, y: 30, kind: "passive" },
        { id: "smps", label: "SMPS Core", x: 60, y: 30, kind: "ic" },
        { id: "iso", label: "Isolation", x: 75, y: 30, kind: "passive" },
        { id: "out", label: "DC Output", x: 90, y: 30, kind: "port" },
      ],
      edges: [
        { from: "grid", to: "emi", signal: "power" },
        { from: "emi", to: "rect", signal: "power" },
        { from: "rect", to: "smps", signal: "power" },
        { from: "smps", to: "iso", signal: "power" },
        { from: "iso", to: "out", signal: "power" },
      ],
    },
    lessons: [
      {
        heading: "EMI filter placement is topology, not afterthought",
        body: "The first revision failed CISPR Class B at 150 kHz by 6 dB. Root cause was a common-mode choke placed after the rectifier, where differential-mode noise had already coupled onto the neutral line. Moving it to the AC input side and adding a Y-cap to chassis fixed it without any BOM cost increase.",
      },
      {
        heading: "Vendor negotiation is a design constraint",
        body: "Hitting the 40% BOM reduction target required designing around available vendor inventory, not the other way around. Several topology decisions were driven by what components a Tier-1 supplier could commit to at volume — this is real engineering, not just circuit design.",
      },
    ],
    gallery: [],
    nextSteps: [],
  },
  {
    slug: "tv-psu-150w",
    name: "150W Dual-Flyback TV Power Supply",
    org: "ELARABY Group",
    status: "Shipped",
    year: "2023",
    recruiterView: "Co-designed a 150W TV PSU with power-domain separation and efficiency-focused front-end.",
    impact: "Production-ready power architecture in consumer electronics",
    deepDive: [
      "Dual parallel flyback architecture for separate rails",
      "Input PFC boost stage integration",
      "Owned concept-to-validation lifecycle contribution",
    ],
    pcb: { col: 2, row: 0 },
    connections: ["smps-3phase", "flyback-75w"],
    stack: ["Altium Designer", "LTspice", "Oscilloscope", "Electronic Load", "IPC-2221"],
    topology: null,
    lessons: null,
    gallery: [],
    nextSteps: [],
  },
  {
    slug: "flyback-75w",
    name: "75W Quasi-Resonant Flyback Converter",
    org: "ELARABY Group",
    status: "Shipped",
    year: "2022",
    recruiterView: "Spearheaded the first in-house SMPS converter program and built internal design capability.",
    impact: "Established new in-house SMPS capability",
    deepDive: [
      "End-to-end custom magnetics design (core/gap/winding)",
      "Quasi-resonant topology tuning and validation",
      "Design codified for internal reuse",
    ],
    pcb: { col: 3, row: 0 },
    connections: ["tv-psu-150w"],
    stack: ["Altium Designer", "LTspice", "SIMPLIS", "MATLAB/Simulink"],
    topology: null,
    lessons: null,
    gallery: [],
    nextSteps: [],
  },
  {
    slug: "zynq-evb",
    name: "ZettBrett EVB",
    org: "Phil's Lab",
    status: "In Progress",
    year: "2024–Present",
    recruiterView: "Designing a dense, impedance-controlled embedded board around AMD/Xilinx Zynq SoC.",
    impact: "Demonstrates high-complexity PCB and embedded-system readiness",
    deepDive: [
      "10-layer, 400+ components, 0201-capable assembly",
      "DDR3/eMMC/GigE/USB HS OTG + USB-to-JTAG",
      "Embedded Linux-capable hardware architecture",
    ],
    pcb: { col: 0, row: 1 },
    connections: ["bms-pylon"],
    stack: ["Altium Designer", "AMD/Xilinx Zynq SoC", "DDR3", "Gigabit Ethernet", "USB HS OTG"],
    topology: null,
    lessons: null,
    gallery: [],
    nextSteps: ["DDR3 bring-up and memory test", "Embedded Linux boot", "USB HS OTG validation"],
  },
];

export const workExperience = [
  {
    period: "Nov 2025 – Present",
    role: "Senior R&D Hardware Electronics Engineer",
    company: "Pylon (YC S21)",
    location: "Alexandria, Egypt · Hybrid",
    type: "Full-time",
    bullets: [
      "Developing BMS for LFP packs using TI AFE and fuel-gauge ICs",
      "Implementing OV/UV/OC protection with SOC/SOH estimation workflows",
      "Leading three-phase smart meter SMPS development",
      "~40% BOM reduction vs. previous generation",
      "Designed automated production test jigs to improve factory throughput",
    ],
  },
  {
    period: "Jan 2024 – Nov 2025",
    role: "Senior Hardware Engineer",
    company: "ELARABY Group",
    location: "Egypt · Hybrid",
    type: "Full-time",
    bullets: [
      "Executed on-site validation testing and vendor technical audits in China (two residencies)",
      "Directed hardware development from schematic through final assembly",
      "Led PCB validation and qualification for mass production",
    ],
  },
  {
    period: "May 2022 – Jan 2024",
    role: "R&D Hardware Electronics Engineer",
    company: "ELARABY Group",
    location: "Egypt",
    type: "Full-time",
    bullets: [
      "Designed 75W quasi-resonant flyback converter — first in-house SMPS",
      "Co-designed 150W dual-flyback TV PSU with PFC front-end",
      "Performed LLC design calculations and compliance-focused checks",
    ],
  },
];

export const freelanceExperience = [
  {
    period: "Dec 2020 – Oct 2021",
    role: "Data Analyst",
    company: "PeoplePerHour",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Data cleaning and preprocessing using Python (pandas)",
      "Real-world data problems across multiple client engagements",
      "Built skills in data analysis while transitioning into hardware R&D",
    ],
  },
];

export const industrialTraining = [
  {
    period: "Aug 2018 – Sep 2018",
    role: "Industrial Trainee",
    company: "ABU QIR Fertilizers and Chemicals Industries",
    location: "Egypt",
    bullets: [
      "Generating electricity from synchronous generators and controlling them",
      "Practical exposure to industrial-scale electrical systems",
    ],
  },
  {
    period: "Aug 2019",
    role: "Industrial Trainee",
    company: "Alexandria Petroleum Maintenance Co.",
    location: "Alexandria, Egypt",
    bullets: [
      "Shadowed field technicians on preventive and corrective maintenance",
      "Exposure to petroleum sector electrical and instrumentation systems",
    ],
  },
  {
    period: "Aug 2019",
    role: "Industrial Trainee",
    company: "Alexandria Electricity Distribution Company",
    location: "Alexandria, Egypt",
    bullets: [
      "Observed distribution network operations and control systems",
      "Exposure to medium-voltage switchgear and protection relays",
    ],
  },
];

export const competitionsAndVolunteer = [
  {
    period: "Jun 2017 – Dec 2020",
    role: "Electrical Engineer",
    company: "M.I.A. Robotics",
    location: "Alexandria, Egypt",
    bullets: [
      "PCB design, system integration, and embedded control for competition robots",
      "1st place — 5th Annual 'Let's Make A Robot' Competition (Sep 2017)",
      "Participated in Minesweeper 2019 autonomous robot competition",
    ],
  },
];

export const experienceTimeline = [...workExperience];

export const insights = [
  {
    title: "Design for Testability (DFT) as a First-Class Constraint",
    date: "May 2026",
    tags: ["DFT", "Hardware", "PCB Design"],
    points: [
      "Push testing strategy into schematic phase, not post-layout",
      "Use test points, jumpers, and rail indicators intentionally",
      "Treat prototyping and production test as one continuous system",
    ],
    body: "Some concepts often overlooked in design include DFM (Design for Manufacturer), DFA (Design for Assembly), and DFT (Design for Testability). DFT emphasizes the importance of testing your board throughout the development process — both during prototyping (validate and tune parameters) and production (ensure final product operates effectively). Implementing DFT should begin early in the schematic design phase.",
  },
  {
    title: "System-Level Engineering Communication",
    date: "2025",
    tags: ["Communication", "Systems Thinking"],
    points: [
      "Translate circuit-level decisions into product-level outcomes",
      "Bridge engineering rigor with onboarding-friendly explanations",
      "Use standards and references (IPC, IEC, CISPR, Cadence docs) to align teams",
    ],
    body: "The most valuable hardware engineers are not just the ones who design the best circuits — they're the ones who can explain why a design decision matters in terms of product reliability, cost, and schedule. Speaking both 'circuit' and 'product' fluently is the skill that scales.",
  },
];

export const journeyHighlights = {
  education: [
    {
      degree: "M.Sc. in Power Electronics",
      institution: "Cairo University",
      period: "2023 – 2027 (In Progress)",
      detail: "Research: AI-based Battery State of Health (SOH) Estimation for EV Applications",
    },
    {
      degree: "B.Sc. Electrical and Electronics Engineering",
      institution: "Alexandria University",
      period: "2015 – 2020",
      detail: "Distinct with Honor — 5th in class (Top Graduate)",
    },
  ],
  certifications: [
    { title: "Transmission Lines", issuer: "The Engineering EEcosystem", date: "Jun 2025" },
    { title: "Data Cleaning and Preprocessing with pandas", issuer: "365 Data Science", date: "Apr 2023" },
  ],
  courses: [
    "Advanced Hardware Design — Phil's Lab",
    "PCB Materials and Stack-Up — FEDEVEL",
    "PCB Thermal Management — Udemy",
    "PCB Design & Manufacturing — Udemy",
    "PLC S7-1200 — EGYCET",
    "Project Management — McKinsey / Pluralsight / Coursera",
    "Entrepreneurship Program — GYP",
  ],
  languages: [
    { lang: "Arabic", level: "Native / Bilingual" },
    { lang: "English", level: "Fluent" },
    { lang: "Chinese", level: "HSK1 — Basic" },
    { lang: "Japanese", level: "JLPT N5 — Basic" },
  ],
  awards: [
    { title: "1st Place — 'Let's Make A Robot' Competition (5th Annual)", date: "Sep 2017" },
  ],
};

export const skills = {
  power: ["SMPS", "Flyback (QR, Dual)", "LLC Resonant", "PFC Boost", "Three-Phase Architectures", "Magnetics Design"],
  pcb: ["High-Speed Layout", "Impedance Control", "DFM / DFA / DFT", "EMI/EMC", "Thermal Management", "IPC Standards"],
  battery: ["BMS Architecture", "LFP Systems", "SOC/SOH Estimation", "OV/UV/OC Protection", "EV-Oriented Battery Modeling"],
  tools: ["Altium Designer", "LTspice", "SIMPLIS", "MATLAB/Simulink", "AutoCAD", "PyVISA/SCPI", "Python (pandas)"],
  instruments: ["Oscilloscope", "Function Generator", "Electronic Load", "Spectrum Analyzer", "Power Analyzer"],
};
