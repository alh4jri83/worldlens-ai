"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function GlobeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.1], // Deep dark blue
      markerColor: [0.1, 0.8, 1], // Cyan markers
      glowColor: [0.05, 0.15, 0.3],
      markers: [
        // longitude, latitude, size
        { location: [37.7595, -122.4367], size: 0.03 }, // SF
        { location: [40.7128, -74.0060], size: 0.05 }, // NY
        { location: [51.5074, -0.1278], size: 0.04 }, // London
        { location: [39.9042, 116.4074], size: 0.08 }, // Beijing
        { location: [55.7558, 37.6173], size: 0.06 }, // Moscow
        { location: [25.2048, 55.2708], size: 0.04 }, // Dubai
      ],
      // @ts-expect-error - onRender is missing from cobe types but required for functionality
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-[800px] h-[800px] flex items-center justify-center opacity-80 mix-blend-screen pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{ width: 800, height: 800, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}