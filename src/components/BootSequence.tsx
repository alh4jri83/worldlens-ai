"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = [
  "INITIALIZING NEURAL KERNEL v9.4.2 [CLASSIFIED]",
  "ESTABLISHING QUANTUM-LINK ENCRYPTION (AES-4096)...",
  "BYPASSING REGIONAL FIREWALLS: [SUCCESS]",
  "SYNCING SATELLITE TELEMETRY [NODE: ALPHA-9-OMEGA]...",
  "DECRYPTING MULTILINGUAL FEEDS IN REAL-TIME...",
  "CALIBRATING THREAT MATRIX & SENTIMENT ALGORITHMS...",
  "WORLDLENS AI ONLINE."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const showNextLine = (index: number) => {
      if (index < lines.length) {
        setVisibleLines(index + 1);
        timeout = setTimeout(() => showNextLine(index + 1), Math.random() * 200 + 100);
      } else {
        setTimeout(() => {
          setBooting(false);
          setTimeout(onComplete, 1200);
        }, 800);
      }
    };

    timeout = setTimeout(() => showNextLine(0), 500);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black p-10 font-mono text-xs md:text-sm text-[#00f0ff] pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: booting ? 1 : 0, scale: booting ? 1 : 1.5, filter: booting ? "blur(0px)" : "blur(20px)" }}
      transition={{ duration: 1.2, ease: "anticipate" }}
    >
      <div className="max-w-3xl w-full relative z-10">
        <motion.div 
          className="mb-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 border-t-2 border-l-2 border-[#00f0ff] rounded-full flex items-center justify-center mb-6 animate-[spin_3s_linear_infinite] relative">
            <div className="absolute inset-0 border-b-2 border-r-2 border-[#ff003c] rounded-full animate-[spin_2s_linear_infinite_reverse]" />
            <div className="w-10 h-10 bg-[#00f0ff] rounded-full blur-[8px] animate-pulse" />
          </div>
          <h1 className="text-5xl font-black tracking-[0.5em] text-white mix-blend-screen text-holo">
            WORLDLENS<span className="text-[#ff003c]">_AI</span>
          </h1>
          <p className="text-[#ff003c] mt-4 font-bold tracking-widest uppercase text-xs">
            WARNING: CLASSIFIED GEOPOLITICAL OPERATING SYSTEM
          </p>
          <p className="text-[#4a628a] mt-1 text-[10px] tracking-widest uppercase">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </motion.div>

        <div className="space-y-3 font-medium bg-black/50 p-6 border border-[#00f0ff]/20">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === lines.length - 1 ? "text-[#00f0ff] font-bold mt-6 text-lg" : "text-[#4a628a]"}
            >
              {`> ${line}`}
            </motion.div>
          ))}
          {visibleLines < lines.length && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-[#ff003c]"
            >
              {`> _`}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Glitch overlay & scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMjQwLDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-50" />
      <div className="scanline" />
    </motion.div>
  );
}
