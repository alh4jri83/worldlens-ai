import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line, Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const HOTSPOTS = [
  { label: "PACIFIC COMMAND", lat: 15, lng: 135, type: "CRITICAL", desc: "NAVAL FLEET MOVEMENT" },
  { label: "EUROPEAN SECTOR", lat: 50, lng: 10, type: "WARN", desc: "GRID DESYNC" },
  { label: "MIDDLE EAST", lat: 25, lng: 45, type: "CRITICAL", desc: "OIL TERMINAL BREACH" },
  { label: "NORTH AMERICA", lat: 40, lng: -100, type: "INFO", desc: "AI COMPUTE SPIKE" }
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
}

function MassiveParticles({ count = 30000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.0 + Math.random() * 0.8; // Deep cloud of particles
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function GlobalNetwork() {
  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < 80; i++) {
      const p1 = new THREE.Vector3().randomDirection().multiplyScalar(2.01);
      const p2 = new THREE.Vector3().randomDirection().multiplyScalar(2.01);
      
      const distance = p1.distanceTo(p2);
      const curve = new THREE.QuadraticBezierCurve3(
        p1,
        p1.clone().add(p2).normalize().multiplyScalar(2.0 + distance * 0.3),
        p2
      );
      l.push({ points: curve.getPoints(50), color: Math.random() > 0.8 ? "#ff003c" : "#00f0ff" });
    }
    return l;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
     if (groupRef.current) {
         // Subtle pulsing of the network
         groupRef.current.children.forEach((child, i) => {
             const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
             mat.opacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.2;
         });
     }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line 
          key={i} 
          points={line.points} 
          color={line.color} 
          lineWidth={1.5} 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
        />
      ))}
    </group>
  );
}

function LiveSignals() {
  return (
    <group>
      {HOTSPOTS.map((spot, i) => {
        const pos = latLngToVector3(spot.lat, spot.lng, 2.02);
        return (
          <group key={i} position={pos}>
            <Sphere args={[0.03, 16, 16]}>
              <meshBasicMaterial 
                color={spot.type === "CRITICAL" ? "#ff003c" : "#00f0ff"} 
                transparent 
                opacity={0.8}
              />
            </Sphere>
            {/* Spatial UI Attached to Earth */}
            <Html position={[0, 0, 0]} center zIndexRange={[100, 0]} distanceFactor={15}>
              <div className={`p-2 backdrop-blur-md border-l-2 ${spot.type === "CRITICAL" ? "border-[#ff003c] bg-[#ff003c]/10" : "border-[#00f0ff] bg-[#00f0ff]/10"} w-48 font-mono`}>
                <div className="text-[8px] uppercase tracking-widest text-white/70 mb-1">{spot.label}</div>
                <div className={`text-xs font-bold ${spot.type === "CRITICAL" ? "text-[#ff003c]" : "text-[#00f0ff]"}`}>{spot.desc}</div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// Atmospheric fog layer
function Atmosphere() {
  return (
    <Sphere args={[2.08, 64, 64]}>
      <meshPhysicalMaterial 
        color="#001133" 
        transparent 
        opacity={0.15} 
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Sphere>
  );
}

function SolidEarth() {
  return (
    <Sphere args={[1.98, 64, 64]}>
      <meshStandardMaterial 
        color="#000205"
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

function WireframeEarth() {
  return (
    <Sphere args={[2.0, 64, 64]}>
      <meshBasicMaterial 
        color="#002244" 
        wireframe={true} 
        transparent 
        opacity={0.2} 
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

function CinematicCamera() {
  const { camera } = useThree();
  const [targetZ] = useState(6);

  useFrame((state) => {
    // Cinematic slow drift
    const t = state.clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.05) * 2;
    camera.position.y = Math.cos(t * 0.05) * 1.5;
    
    // Smooth initial zoom
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    camera.lookAt(0, 0, 0);
  });

  // Start extremely far away
  useEffect(() => {
    camera.position.set(0, 0, 30);
  }, [camera]);

  return null;
}

export function Earth() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 4, 15]} />
      <CinematicCamera />
      
      <group ref={groupRef}>
        <SolidEarth />
        <WireframeEarth />
        <Atmosphere />
        <MassiveParticles />
        <GlobalNetwork />
        <LiveSignals />
      </group>

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.15} 
          luminanceSmoothing={0.9} 
          height={300} 
          opacity={3}
          intensity={3.0}
        />
        <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL} 
          offset={new THREE.Vector2(0.003, 0.003)} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
}
