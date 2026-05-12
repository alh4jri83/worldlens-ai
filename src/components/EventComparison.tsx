"use client";

import { motion } from "framer-motion";
import AIBiasRadar from "./AIBiasRadar";
import { ShieldAlert, TrendingUp, Cpu, Globe2, Activity } from "lucide-react";

const NARRATIVES = [
  {
    region: "USA MEDIA",
    headline: "Aggressive Expansion Threats Global Supply Chain Stability",
    summary: "Focuses on potential economic disruptions and aggressive maneuvers. High emphasis on national security and tech supremacy.",
    tone: "ALARMIST",
    bias: "Pro-Western / Free Market",
    color: "#ff2a5f", // Red
    radarData: [
      { subject: "Political Bias", A: 85, fullMark: 100 },
      { subject: "Emotional", A: 70, fullMark: 100 },
      { subject: "Fear Level", A: 90, fullMark: 100 },
      { subject: "Propaganda", A: 40, fullMark: 100 },
      { subject: "Economic Focus", A: 95, fullMark: 100 },
    ],
  },
  {
    region: "CHINESE MEDIA",
    headline: "Legitimate Defense of Technological Sovereignty",
    summary: "Frames actions as necessary defensive measures against foreign containment. Emphasizes self-reliance and domestic innovation.",
    tone: "DEFENSIVE",
    bias: "State-Aligned / Sovereignty",
    color: "#2563eb", // Blue
    radarData: [
      { subject: "Political Bias", A: 90, fullMark: 100 },
      { subject: "Emotional", A: 40, fullMark: 100 },
      { subject: "Fear Level", A: 30, fullMark: 100 },
      { subject: "Propaganda", A: 85, fullMark: 100 },
      { subject: "Economic Focus", A: 80, fullMark: 100 },
    ],
  },
  {
    region: "EUROPEAN MEDIA",
    headline: "Escalating Tensions Call for Diplomatic Intervention",
    summary: "Takes a measured approach, highlighting the need for immediate dialogue. Concerns about collateral damage to EU markets.",
    tone: "CAUTIOUS",
    bias: "Multilateral / Diplomatic",
    color: "#00f6ff", // Cyan
    radarData: [
      { subject: "Political Bias", A: 40, fullMark: 100 },
      { subject: "Emotional", A: 50, fullMark: 100 },
      { subject: "Fear Level", A: 65, fullMark: 100 },
      { subject: "Propaganda", A: 20, fullMark: 100 },
      { subject: "Economic Focus", A: 75, fullMark: 100 },
    ],
  }
];

export default function EventComparison() {
  return (
    <div className="w-full relative">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-world-neon-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {NARRATIVES.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.2, type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="glass-panel rounded-2xl p-8 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 border border-white/5 hover:border-white/20"
          >
            {/* Animated Gradient Border Top */}
            <div 
              className="absolute top-0 left-0 w-full h-1.5 opacity-80"
              style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
            />
            {/* Glow blob in corner */}
            <div 
              className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: item.color }}
            />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-world-muted" />
                <span className="text-xs font-bold tracking-[0.2em] text-world-muted uppercase">
                  {item.region}
                </span>
              </div>
              <div 
                className="px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg border"
                style={{ backgroundColor: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}
              >
                {item.tone}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-world-muted transition-all duration-300">
              "{item.headline}"
            </h3>
            
            <div className="mb-6 p-4 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu className="w-4 h-4 text-world-neon-cyan animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-world-neon-cyan">AI Synthesis</span>
              </div>
              <p className="text-sm text-world-muted/90 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-white/80 mb-6 bg-black/20 p-3 rounded border border-white/5">
              <ShieldAlert className="w-5 h-5" style={{ color: item.color }} />
              <div>
                <span className="block text-[10px] text-world-muted uppercase tracking-wider mb-0.5">Identified Bias</span>
                <span className="font-semibold">{item.bias}</span>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="relative h-56 -mx-4 group-hover:scale-105 transition-transform duration-700">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-world-surface)_100%)] z-10 pointer-events-none opacity-80" />
              <AIBiasRadar data={item.radarData} color={item.color} />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
               <button className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-world-neon-cyan transition-colors flex items-center space-x-2">
                 <Activity className="w-4 h-4" /> 
                 <span>Deploy Counter-Analysis</span>
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}