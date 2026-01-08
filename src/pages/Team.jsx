import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function TypingText({ text, speed = 80 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{display}</span>;
}

const members = [
  {
    name: "Tegar Mukti Hartanto",
    nim: "25552011291",
    role: "Project Manager",
    desc: "Mengatur alur kerja, timeline, dan koordinasi tim.",
    img: "/Team/anggota1.jpeg",
  },
  {
    name: "Muhammad Fauzan Firmansyah",
    nim: "25552011312",
    role: "Hardware Engineer",
    desc: "Merancang dan merakit komponen smart lamp as brand Lampunyalse.",
    img: "/Team/anggota2.jpeg",
  },
  {
    name: "Andika Ramadhan Iskandar",
    nim: "25552012283",
    role: "Software Engineer",
    desc: "Mengembangkan sistem dan integrasi Google Assistant.",
    img: "/Team/anggota3.JPG",
  },
  {
    name: "Radhi Nur Rubiansyah",
    nim: "25552011306",
    role: "Front-end Engineer",
    desc: "Merancang tampilan antarmuka dan pengalaman pengguna Web Lampunyalse.",
    img: "/Team/anggota4.jpeg",
  },
  {
    name: "Hani Handayani",
    nim: "25552011312",
    role: "Documentation",
    desc: "Menyusun laporan dan dokumentasi proyek.",
    img: "/Team/anggota5.jpeg",
  },
  {
    name: "Muhammad Abdiel Hafiz Riziq",
    nim: "25552011315",
    role: "Testing & QA",
    desc: "Melakukan pengujian dan evaluasi sistem.",
    img: "/Team/anggota6.jpeg",
  },
];

export default function Team() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#050b14] to-[#020409]"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 60px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-cyan-400 mb-4"
            >
              Smart Lamp Team
            </motion.h2>

            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 mt-4 text-sm"
            >
              Loading {progress}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-black via-[#050b14] to-[#020409]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 1920,
                y: Math.random() * 1080,
              }}
              animate={{
                y: Math.random() * 1080,
                x: Math.random() * 1920,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            />
          ))}
        </div>

        <div className="pt-32 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-cyan-400 tracking-widest mb-4"
          >
            <TypingText text="Hello 👋 Ini Tim Kami" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent"
          >
            Lampunyalse
            <img
              src="/2.png"
              alt="SmartLamp Logo"
              className="inline-block ml-1 w-14 h-14 align-middle"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="text-gray-400 max-w-xl mx-auto mt-4"
          >
            Tim pengembang sistem Smart Lamp berbasis IoT & Google Assistant
          </motion.p>
        </div>

        <div className="relative z-10 grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-24 px-6 pb-32">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center hover:border-cyan-400 transition-all group"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 -z-10 rounded-2xl blur-xl bg-gradient-to-r from-cyan-400/30 to-indigo-500/30"
              />

              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute inset-0 -z-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 blur-2xl"
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-2 border-cyan-400 shadow-lg shadow-cyan-400/50"
                />
              </motion.div>

              <h3 className="text-cyan-400 font-semibold text-lg mb-2">
                {m.name}
              </h3>

              <motion.p
                animate={{
                  textShadow: [
                    "0 0 10px rgba(34, 211, 238, 0.5)",
                    "0 0 20px rgba(34, 211, 238, 0.8)",
                    "0 0 10px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-300 text-sm mb-2"
              >
                {m.nim}
              </motion.p>

              <p className="text-indigo-400 text-sm mb-2 font-medium">
                {m.role}
              </p>
              <p className="text-gray-400 text-sm">{m.desc}</p>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-50"
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-48"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fire" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            <motion.path
              fill="url(#fire)"
              initial={{
                d: "M0,320L60,280C120,240,240,160,360,160C480,160,600,240,720,260C840,280,960,240,1080,220C1200,200,1320,200,1380,200L1440,200L1440,320L0,320Z",
              }}
              animate={{
                d: [
                  "M0,320L60,280C120,240,240,160,360,160C480,160,600,240,720,260C840,280,960,240,1080,220C1200,200,1320,200,1380,200L1440,200L1440,320L0,320Z",
                  "M0,320L60,300C120,280,240,200,360,190C480,180,600,230,720,250C840,270,960,250,1080,230C1200,210,1320,210,1380,210L1440,210L1440,320L0,320Z",
                  "M0,320L60,290C120,260,240,180,360,170C480,160,600,220,720,245C840,270,960,260,1080,240C1200,220,1320,220,1380,220L1440,220L1440,320L0,320Z",
                  "M0,320L60,280C120,240,240,160,360,160C480,160,600,240,720,260C840,280,960,240,1080,220C1200,200,1320,200,1380,200L1440,200L1440,320L0,320Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1],
              }}
            />
          </svg>
        </div>

        <div className="relative z-10 text-center pb-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-10 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-cyan-400 hover:text-black transition-all font-medium"
          >
            ← Back to Home
          </motion.button>
        </div>
      </section>
    </>
  );
}
