import { useState, useEffect, useMemo } from "react";
import "virtual:windi.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: 14 + i * 2,
        left: `${i * 9 + 5}%`,
        delay: i * 1.2,
        duration: 10 + i,
      })),
    []
  );

  const sparkles = [
    { left: "10%", top: "20%" },
    { left: "85%", top: "15%" },
    { left: "70%", top: "60%" },
    { left: "20%", top: "75%" },
    { left: "50%", top: "40%" },
    { left: "90%", top: "80%" },
  ];

  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showWaModal, setShowWaModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [introStep, setIntroStep] = useState(0);
  useEffect(() => {
    if (!showVideoModal) return;

    setIntroStep(0);
    setLoadingProgress(0);
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIntroStep(1);
          setTimeout(() => setIntroStep(2), 600);
          setTimeout(() => setIntroStep(3), 3000);

          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(loadingInterval);
  }, [showVideoModal]);

  const phrases = [
    "Smart Lighting System",
    "Voice Control Ready",
    "Energy Efficient",
    "IoT Connected",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentPhrase = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  const products = [
    {
      title: "Expansion ESP8266",
      desc: "Wi-Fi microcontroller module that acts as the brain of the smart lamp.",
      img: "/esp8266.png",
      badge: "Core",
    },
    {
      title: "Relay Dual Output 2",
      desc: "Dual-channel relay module that safely switches high-voltage devices.",
      img: "/relay.png",
      badge: "Control",
    },
    {
      title: "Jumper Female to Female",
      desc: "Used to connect different electronic components without soldering.",
      img: "/jumper.png",
      badge: "Connect",
    },
    {
      title: "ABC Battery 9V",
      desc: "Provides stable power supply ensuring all modules operate properly.",
      img: "/baterai.png",
      badge: "Power",
    },
    {
      title: "Lamp and Fitting",
      desc: "Main output device controlled by relay and Google Assistant.",
      img: "/lamp.png",
      badge: "Output",
    },
  ];

  const stats = [
    { value: 40, label: "Energy Saved", suffix: "%" },
    { value: 1000, label: "Active Users", suffix: "+" },
    { value: 99, label: "Uptime", suffix: "%" },
    { value: 24, label: "Support", suffix: "/ 7" },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            stats.forEach((stat, index) => {
              let start = 0;
              const end = stat.value;
              const duration = 2000;
              const increment = end / (duration / 16);

              const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = end;
                    return newCounters;
                  });
                  clearInterval(timer);
                } else {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.floor(start);
                    return newCounters;
                  });
                }
              }, 16);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById("stats-section");
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, [statsAnimated, stats]);

  const testimonials = [
    {
      name: "Marjuk juki",
      role: "Calon Kaang",
      text: "Ini adalah project iot yang keren, berfungsi semestinya!",
      rating: 5,
    },
    {
      name: "Tegar",
      role: "IoT Engineering",
      text: "Sangat Impressive, lampu ini sangat canggih!",
      rating: 5,
    },
    {
      name: "Radhi, S.Kom, M.Eng",
      role: "ML Engineering",
      text: "Energy savings are real! My electricity bill dropped by 35%.",
      rating: 5,
    },
    {
      name: "Mas mas Ojan",
      role: "Real Human Adaptive",
      text: "Keren bisa hurung, jadi nyalsee",
      rating: 4,
    },
    {
      name: "Andika",
      role: "Scopus Maker",
      text: "Mantap, dengan barang seadanya, lampu ini masih nyala 👍👍",
      rating: 5,
    },
    {
      name: "Abdiel",
      role: "Vape Cloud Engineering💨",
      text: "Menyala kaya masa depan aku!",
      rating: 5,
    },
  ];

  return (
    <div
      style={{ fontFamily: "Orbitron, sans-serif" }}
      className={`relative min-h-screen overflow-x-hidden transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {darkMode ? (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ backgroundColor: "#111827" }}
            />

            {[...Array(40)].map((_, i) => {
              const colors = [
                "#06b6d4",
                "#ec4899",
                "#a855f7",
                "#22c55e",
                "#3b82f6",
                "#eab308",
              ];
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 6 + 2 + "px",
                    height: Math.random() * 6 + 2 + "px",
                    backgroundColor: color,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: "blur(1px)",
                    opacity: 0.6,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </>
        ) : (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, #dbeafe 0%, #fae8ff 50%, #fce7f3 100%)",
                  "linear-gradient(135deg, #fae8ff 0%, #fce7f3 50%, #dbeafe 100%)",
                  "linear-gradient(135deg, #fce7f3 0%, #dbeafe 50%, #fae8ff 100%)",
                  "linear-gradient(135deg, #dbeafe 0%, #fae8ff 50%, #fce7f3 100%)",
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {[...Array(30)].map((_, i) => {
              const colors = ["#06b6d4", "#ec4899", "#a855f7", "#3b82f6"];
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 4 + 2 + "px",
                    height: Math.random() * 4 + 2 + "px",
                    backgroundColor: colors[i % colors.length],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: "blur(2px)",
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={`w-full backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-500 ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-purple-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-extrabold tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            <span
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-green-400 to-blue-500"
                  : "from-blue-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent`}
            >
              Lampu
            </span>
            <span className={darkMode ? "text-white" : "text-gray-900"}>
              nyalse
            </span>
          </motion.h1>

          <ul
            className={`hidden md:flex space-x-8 font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {["Home", "Features", "Catalog", "Testimonials", "Contact"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`transition-colors duration-300 relative group ${
                      darkMode ? "hover:text-cyan-400" : "hover:text-purple-600"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        darkMode ? "bg-cyan-400" : "bg-purple-600"
                      }`}
                    />
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all ${
                darkMode
                  ? "border-gray-600 hover:border-cyan-400 bg-gray-800"
                  : "border-purple-300 hover:border-purple-500 bg-purple-50"
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <span
                className={`text-xl ${
                  darkMode ? "text-cyan-400" : "text-yellow-500"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </span>
            </motion.button>

            <button
              className={`md:hidden transition ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`md:hidden border-t ${
              darkMode
                ? "bg-gray-900/95 border-gray-700"
                : "bg-white/95 border-purple-200"
            }`}
          >
            <ul
              className={`flex flex-col items-center space-y-4 py-6 font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {["Home", "Features", "Catalog", "Testimonials", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </nav>

      <section
        id="home"
        className="relative flex flex-col justify-center items-center text-center py-40 px-6 overflow-hidden"
      >
        {["💡", "⚡", "📡", "📱", "⭐"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-20"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {icon}
          </motion.div>
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-0.5 ${
              darkMode
                ? "bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                : "bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            }`}
            style={{
              width: "200px",
              top: `${30 + i * 15}%`,
              left: "-200px",
            }}
            animate={{
              x: ["0vw", "120vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <motion.h1
            className={`text-5xl md:text-6xl font-extrabold mb-4 ${
              darkMode
                ? "bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            } bg-clip-text text-transparent`}
            animate={{
              filter: darkMode
                ? [
                    "drop-shadow(0 0 20px rgba(13, 212, 6, 0.5))",
                    "drop-shadow(0 0 30px rgba(233, 236, 72, 0.5))",
                    "drop-shadow(0 0 20px rgba(212, 212, 6, 0.5))",
                  ]
                : [
                    "drop-shadow(0 0 10px rgba(59,130,246,0.3))",
                    "drop-shadow(0 0 20px rgba(147,51,234,0.3))",
                    "drop-shadow(0 0 10px rgba(59,130,246,0.3))",
                  ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            SmartLamp
            <img
              src="/2.png"
              alt="SmartLamp Logo"
              className={`inline-block ml-2 w-24 h-24 align-middle ${
                darkMode ? "drop-shadow-[0_0_12px_#fbd94e]" : ""
              }`}
            />
          </motion.h1>

          <div className="h-20 flex items-center justify-center mb-6">
            <h2
              className={`text-2xl md:text-3xl font-bold ${
                darkMode
                  ? "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`inline-block w-0.5 h-8 ml-1 ${
                  darkMode ? "bg-cyan-400" : "bg-purple-600"
                }`}
              />
            </h2>
          </div>

          <p
            className={`text-lg md:text-xl max-w-2xl mb-10 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The next-gen IoT lighting system that adapts to your world —
            intelligent, aesthetic, and energy-efficient.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/team">
              <button
                whileHover={{ scale: 1.05 }}
                whileT6p={{ scale: 0.95 }}
                className="px-6 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
              >
                Lampunyalse
                <span className="ml-1 text-white">🛌</span>
              </button>
            </Link>
            <motion.a
              href="/SMART-LAMP.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border-2 border-cyan-400 text-cyan-400 font-semibold px-10 py-4 rounded-full hover:bg-cyan-400/10 transition"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className={`w-6 h-6 ${
              darkMode ? "text-cyan-400" : "text-purple-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section
        id="stats-section"
        className="relative py-20 px-6 overflow-hidden"
      >
        {sparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: s.left,
              top: s.top,
              background:
                "radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0) 70%)",
              filter: "blur(0.5px)",
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating glow particles - alternative style */}
        {sparkles.slice(0, 3).map((s, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute"
            style={{
              left: s.left,
              top: s.top,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i * 1,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400/20 blur-sm" />
          </motion.div>
        ))}

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center backdrop-blur-md rounded-2xl p-6 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-purple-200"
              }`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold mb-2 ${
                  darkMode
                    ? "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                } bg-clip-text text-transparent`}
              >
                {counters[i]}
                {stat.suffix}
              </div>
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold mb-12 ${
            darkMode
              ? "bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          } bg-clip-text text-transparent`}
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Control",
              desc: "Manage brightness, color, and schedule via mobile app.",
              icon: "💡",
            },
            {
              title: "Energy Efficient",
              desc: "Save up to 40% power with adaptive AI-based control.",
              icon: "⚡",
            },
            {
              title: "Voice Assistant",
              desc: "Supports Alexa, Google Assistant, and Apple HomeKit.",
              icon: "🎤",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className={`backdrop-blur-md rounded-2xl p-8 border ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:border-cyan-500"
                  : "bg-white/60 border-purple-200 hover:border-purple-400"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                {f.icon}
              </motion.div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? "text-cyan-400" : "text-purple-600"
                }`}
              >
                {f.title}
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section
        className={`py-20 px-6 ${darkMode ? "bg-white/5" : "bg-purple-50/50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold text-center mb-12 ${
              darkMode
                ? "bg-gradient-to-r from-cyan-400 to-indigo-500"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Why Choose SmartLamp?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Easy Setup",
                desc: "Get started in minutes with our simple installation guide",
              },
              {
                icon: "🛡️",
                title: "Secure & Safe",
                desc: "Bank-level encryption protects your smart home data",
              },
              {
                icon: "☁️",
                title: "Cloud Sync",
                desc: "Access your settings from anywhere, anytime",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="catalog"
        className={`relative py-28 px-6 text-center transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-black/40 via-black/20 to-black/30"
            : "bg-gradient-to-b from-cyan-50 via-white to-purple-50"
        }`}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[2px] w-72 ${
                darkMode
                  ? "bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                  : "bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
              }`}
              style={{
                top: `${30 + i * 20}%`,
                left: "-300px",
              }}
              animate={{
                x: ["0vw", "120vw"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <h2
            className={`text-4xl font-bold mb-6 transition-colors duration-500 ${
              darkMode
                ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                : "text-purple-700"
            }`}
          >
            Smart Lamp Components
          </h2>

          <p
            className={`mb-14 max-w-2xl mx-auto transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            All the essential components used to build the Smart Lamp with
            Google Assistant integration.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-md
              transition-all duration-500 shadow-lg group
              ${
                darkMode
                  ? "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400 hover:shadow-cyan-500/20"
                  : "bg-white border-cyan-200 text-gray-700 hover:border-purple-400 hover:shadow-purple-300/40"
              }`}
              >
                <div
                  className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold
                ${
                  darkMode
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}
                >
                  {item.badge}
                </div>

                {/* gambar */}
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-40 h-40 object-contain mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Judul */}
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors duration-500 ${
                    darkMode ? "text-cyan-400" : "text-purple-600"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Deskripsi */}
                <p
                  className={`text-sm transition-colors duration-500 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-12 mt-28 px-6">
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.img
                key={darkMode ? "dark-logo" : "light-logo"}
                src={darkMode ? "/5.png" : "/3.png"}
                alt="SL logo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: darkMode
                    ? "drop-shadow(0 0 20px #fbd94eff)"
                    : "drop-shadow(0 0 0px transparent)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-48 sm:w-60 md:w-72 lg:w-80 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  filter: darkMode ? "drop-shadow(0 0 30px #fbd94eff)" : "none",
                }}
              />

              <motion.button
                onClick={() => setShowVideoModal(true)}
                whileHover={{
                  scale: 1.04,
                  boxShadow: darkMode
                    ? "0 0 18px rgba(253,224,71,0.35)"
                    : "0 0 16px rgba(59,130,246,0.25)",
                }}
                whileTap={{ scale: 0.96 }}
                className={`px-7 py-3 rounded-xl font-medium
                flex items-center gap-2 transition-all
                backdrop-blur-md border
                ${
                  darkMode
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-black/5 text-gray-800 border-black/10"
                }`}
              >
                <span className="text-base opacity-80">▶</span>
                <span className="tracking-wide text-sm">Watch</span>
              </motion.button>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
              <motion.img
                src="/arduino-logo.png"
                alt="Arduino"
                className={`w-40 sm:w-52 md:w-64 lg:w-72 transition-all duration-300 ${
                  darkMode ? "" : "opacity-80 hover:opacity-100"
                }`}
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(0 0 15px #00e0ff)",
                }}
              />
              <motion.img
                src="/google-logo2.png"
                alt="Google Assistant"
                className={`w-40 sm:w-52 md:w-64 lg:w-72 transition-all duration-300 ${
                  darkMode ? "" : "opacity-80 hover:opacity-100"
                }`}
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(0 0 15px #4285F4)",
                }}
              />
            </div>
          </div>

          {showVideoModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center
    bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setShowVideoModal(false);
                setIntroStep(0);
              }}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl h-[480px]
                rounded-3xl overflow-hidden bg-black shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {/* Button Tutup */}
                <button
                  onClick={() => {
                    setShowVideoModal(false);
                    setIntroStep(0);
                  }}
                  className="absolute top-4 right-4 z-30 text-white/70 hover:text-white"
                >
                  ✕
                </button>

                {/* LOADING BAR */}
                {introStep === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
                    <div className="w-2/3 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          darkMode
                            ? "bg-gradient-to-r from-yellow-400 to-red-500"
                            : "bg-gradient-to-r from-blue-500 to-purple-600"
                        }`}
                        animate={{ width: `${loadingProgress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                    <p className="text-xs tracking-widest text-gray-400">
                      LOADING {loadingProgress}%
                    </p>
                  </div>
                )}

                {/* Logo LN*/}
                {introStep >= 1 && introStep < 3 && (
                  <motion.img
                    src={darkMode ? "/5.png" : "/5.png"}
                    className="absolute inset-0 m-auto w-52 z-40"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      filter: darkMode
                        ? "drop-shadow(0 0 35px gold)"
                        : "drop-shadow(0 0 25px rgba(59,130,246,0.6))",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* tulisan */}
                {introStep === 2 && (
                  <motion.p
                    className="absolute bottom-24 w-full text-center z-20
                    text-xl tracking-widest text-gray-300"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Lampunyalse Introduction
                  </motion.p>
                )}

                {/* video logo LN */}
                {introStep === 3 && (
                  <motion.video
                    src="/upscaled-video (1).mp4"
                    autoPlay
                    controls
                    preload="none"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* testimoni */}
      <section
        id="testimonials"
        className={`relative py-28 px-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-black/30 via-black/20 to-black/40"
            : "bg-gradient-to-b from-purple-50 via-white to-cyan-50"
        }`}
      >
        {/* animasi baclgroun */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[2px] w-72 ${
                darkMode
                  ? "bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
                  : "bg-gradient-to-r from-transparent via-purple-400/25 to-transparent"
              }`}
              style={{
                top: `${35 + i * 20}%`,
                left: "-300px",
              }}
              animate={{
                x: ["0vw", "120vw"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-500 ${
                darkMode
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent"
                  : "text-purple-700"
              }`}
            >
              What Users Say
            </h2>
            <p
              className={`text-lg transition-colors duration-500 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Join thousands of satisfied customers worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`rounded-2xl p-8 border backdrop-blur-md shadow-lg
              transition-all duration-500
              ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:border-cyan-400 text-gray-300"
                  : "bg-white border-purple-200 hover:border-purple-400 text-gray-700"
              }`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-xl ${
                        darkMode ? "text-yellow-400" : "text-yellow-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p
                  className={`mb-6 leading-relaxed italic transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  “{testimonial.text}”
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode
                        ? "bg-gradient-to-br from-cyan-400 to-indigo-500"
                        : "bg-gradient-to-br from-purple-500 to-pink-500"
                    }`}
                  />
                  <div>
                    <div
                      className={`font-semibold transition-colors duration-500 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 backdrop-blur-md rounded-3xl p-12 border border-cyan-400/30"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Transform your home with intelligent lighting. Join thousands of
            users experiencing the future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#home">
              <button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg"
              >
                Get Started Now
              </button>
            </a>
            <motion.button
              onClick={() => setShowWaModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-cyan-400 text-cyan-400 font-semibold px-10 py-4 rounded-full hover:bg-cyan-400/10 transition"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className={`relative overflow-hidden text-center py-10 backdrop-blur-md border-t transition-all duration-500 ${
          darkMode
            ? "bg-black/75 text-gray-400 border-gray-800"
            : "bg-white/80 text-gray-700 border-purple-200"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              className={`absolute rounded-full blur-md ${
                darkMode ? "bg-cyan-400" : "bg-purple-300"
              }`}
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                bottom: -50,
              }}
              animate={{
                y: [-50, -320],
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.1],
              }}
              transition={{
                duration: b.duration,
                repeat: Infinity,
                delay: b.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className={`mb-4 font-semibold text-lg ${
              darkMode ? "text-cyan-300" : "text-purple-600"
            }`}
          >
            Connect with Us
          </p>

          <div className="flex justify-center gap-8 mb-6 text-3xl">
            {[
              {
                type: "modal",
                icon: faWhatsapp,
                color: "text-green-400",
                action: () => setShowWaModal(true),
              },
              {
                type: "link",
                icon: faInstagram,
                color: "text-pink-500",
                href: "https://www.instagram.com/radinr20_/#",
              },
              {
                type: "link",
                icon: faTwitter,
                color: "text-blue-500",
                href: "https://x.com/tf141yotsucodm/",
              },
              {
                type: "link",
                icon: faYoutube,
                color: "text-red-500",
                href: "https://youtube.com/@radhinr2019?si=cBkl3L7X7IRb3qbX",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  filter: "drop-shadow(0 0 20px currentColor)",
                }}
                className={`${item.color} cursor-pointer`}
                onClick={item.type === "modal" ? item.action : undefined}
              >
                {item.type === "link" ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                ) : (
                  <FontAwesomeIcon icon={item.icon} />
                )}
              </motion.div>
            ))}
          </div>
          {showWaModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4"
              onClick={() => setShowWaModal(false)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.3,
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-400/20 rounded-2xl p-8 max-w-sm w-full shadow-2xl"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-full blur-xl" />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full flex items-center justify-center"
                >
                  <span className="text-3xl">ℹ️</span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl font-semibold text-white mb-3 text-center"
                >
                  Informasi
                </motion.h3>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 text-sm leading-relaxed mb-6 text-center"
                >
                  Maaf, saat ini kami belum menyediakan kontak WhatsApp untuk
                  produk ini. Silakan hubungi kami melalui media sosial lainnya.
                </motion.p>

                {/* Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => setShowWaModal(false)}
                  className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95"
                >
                  Mengerti
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          <p>
            © 2025{" "}
            <span className="text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]">
              SmartLamp
            </span>{" "}
            — Crafted by Lampunyalse 🛌
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
