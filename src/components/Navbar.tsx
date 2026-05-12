"use client";

import { motion } from "framer-motion";
import { Globe, Menu, Search, Settings2 } from "lucide-react";
import { useState } from "react";

const languages = ["EN", "ZH", "RU", "AR", "FR", "ES"];

export default function Navbar() {
  const [langIdx, setLangIdx] = useState(0);

  const toggleLanguage = () => {
    setLangIdx((prev) => (prev + 1) % languages.length);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="text-world-neon-cyan h-6 w-6" />
            </motion.div>
            <span className="font-bold text-xl tracking-wider text-white text-glow">
              WORLDLENS<span className="text-world-neon-cyan text-sm font-normal ml-1">AI</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8 text-sm font-medium text-world-muted">
              <a href="#" className="hover:text-white transition-colors">LIVE MAP</a>
              <a href="#" className="hover:text-white transition-colors">NARRATIVES</a>
              <a href="#" className="hover:text-white transition-colors">BIAS RADAR</a>
              <a href="#" className="hover:text-white transition-colors">MARKETS</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-world-muted hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 text-xs font-mono border border-white/10 rounded hover:bg-white/5 hover:border-white/20 transition-all text-world-neon-cyan"
            >
              {languages[langIdx]}
            </button>
            <button className="p-2 text-world-muted hover:text-white transition-colors">
              <Settings2 className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-world-muted hover:text-white">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-world-neon-cyan/50 to-transparent opacity-50" />
    </nav>
  );
}