"use client";

import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface AIBiasRadarProps {
  data: {
    subject: string;
    A: number;
    fullMark: number;
  }[];
  color: string;
}

export default function AIBiasRadar({ data, color }: AIBiasRadarProps) {
  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "rgba(156, 163, 175, 0.8)", fontSize: 10 }} 
          />
          <Radar
            name="Bias"
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}