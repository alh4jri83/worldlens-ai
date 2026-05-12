"use client";

import { motion } from "framer-motion";
import GlobeMap from "./GlobeMap";
import { ArrowRight, Activity, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-[#010308]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-world-neon-blue/20 via-[#010308] to-[#010308]" />
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
      </div>
      
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 mix-blend-screen pointer-events-none scale-125 md:scale-150 transform-gpu mt-20">
        <GlobeMap />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center space-x-3 glass-panel-luxury px-6 py-2.5 rounded-full mb-10 border-world-neon-cyan/40 shadow-[0_0_40px_rgba(0,246,255,0.2)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-world-neon-cyan/10 animate-pulse" />
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-world-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-world-neon-cyan shadow-[0_0_10px_#00f6ff]"></span>
          </span>
          <span className="relative text-xs sm:text-sm font-mono text-white uppercase tracking-[0.3em] font-semibold">Quantum Engine Online</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1] drop-shadow-2xl relative"
        >
          Decode the <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-world-neon-blue to-world-neon-cyan animate-gradient-x px-2 pb-2">
            Global Matrix.
            <div className="absolute -inset-2 bg-world-neon-cyan/20 blur-3xl -z-10 rounded-full opacity-40 animate-pulse" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-3xl text-lg md:text-2xl lg:text-3xl text-world-muted/90 mb-12 font-light tracking-wide leading-relaxed"
        >
          Synthesizing millions of data points into a single, unified lens of reality. 
          <span className="text-world-neon-cyan font-medium drop-shadow-md"> The ultimate truth engine.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8"
        >
          <button className="group relative px-10 py-4 bg-white text-black hover:text-white transition-all duration-500 flex items-center justify-center font-bold text-lg overflow-hidden rounded shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,246,255,0.6)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-world-neon-blue to-world-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            <span className="relative z-10 flex items-center tracking-wider uppercase text-sm">
              <Sparkles className="w-5 h-5 mr-3" />
              Initialize Scan
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          
          <button className="px-10 py-4 glass-panel text-white hover:bg-white/5 hover:border-world-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,246,255,0.2)] transition-all duration-500 flex items-center justify-center font-bold text-sm tracking-widest uppercase rounded">
            <Activity className="w-5 h-5 mr-3 text-world-neon-cyan" />
            Live Network
          </button>
        </motion.div>
      </div>

      {/* Floating UI Elements for high-tech feel */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-1/3 glass-panel-luxury p-4 rounded border-l-4 border-l-world-neon-cyan hidden xl:block shadow-2xl"
      >
        <div className="text-[10px] text-world-muted mb-1 font-mono tracking-widest">NEURAL THREADS</div>
        <div className="text-2xl text-white font-bold tracking-wider text-glow font-mono">84.2T OP/s</div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-10 bottom-1/3 glass-panel-luxury p-4 rounded border-r-4 border-r-world-accent-red hidden xl:block shadow-2xl"
      >
        <div className="text-[10px] text-world-muted mb-1 font-mono tracking-widest text-right">ANOMALY DETECTED</div>
        <div className="text-2xl text-world-accent-red font-bold tracking-wider text-glow-red font-mono text-right">CRITICAL (3)</div>
      </motion.div>

      {/* Laser lines */}
      <div className="absolute left-0 top-[20%] w-full h-[1px] bg-gradient-to-r from-transparent via-world-neon-cyan/20 to-transparent z-0 pointer-events-none" />
      <div className="absolute left-0 bottom-[20%] w-full h-[1px] bg-gradient-to-r from-transparent via-world-neon-blue/20 to-transparent z-0 pointer-events-none" />
      
      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010308_100%)] pointer-events-none z-0" />
    </div>
  );
}