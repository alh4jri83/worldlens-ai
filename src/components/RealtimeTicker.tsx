"use client";

export default function RealtimeTicker() {
  const newsItems = [
    "ASIAN MARKETS OPEN MIXED AMIDST TECH SECTOR VOLATILITY",
    "AI REGULATION SUMMIT CONCLUDES IN GENEVA WITH NEW DRAFT PROPOSALS",
    "GLOBAL SUPPLY CHAIN DISRUPTIONS CONTINUE DUE TO REGIONAL TENSIONS",
    "EUROPEAN CENTRAL BANK SIGNALS POTENTIAL INTEREST RATE ADJUSTMENTS",
    "BREAKTHROUGH IN QUANTUM COMPUTING ANNOUNCED BY RESEARCH CONSORTIUM",
    "NEW TRADE AGREEMENT SIGNED BETWEEN MAJOR SOUTH AMERICAN ECONOMIES",
    "SPACE EXPLORATION AGENCY CONFIRMS SUCCESSFUL SATELLITE DEPLOYMENT",
    "ENERGY SECTOR SEES SHIFT AS RENEWABLE INVESTMENTS HIT RECORD HIGH",
  ];

  return (
    <div className="fixed bottom-0 w-full z-40 bg-black/80 border-t border-white/10 backdrop-blur-sm overflow-hidden h-10 flex items-center">
      <div className="flex whitespace-nowrap animate-[ticker_40s_linear_infinite]">
        {/* Render the list twice to create a seamless loop */}
        {[...newsItems, ...newsItems].map((item, index) => (
          <div key={index} className="flex items-center text-xs font-mono text-world-muted/80 mx-4">
            <span className="text-world-accent-red mr-2">▲</span>
            {item}
            <span className="ml-8 text-world-neon-cyan/50">//</span>
          </div>
        ))}
      </div>
    </div>
  );
}