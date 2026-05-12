'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Float, Text, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- مكون الجسيمات الاستخباراتية (Global Signal Particles) ---
function IntelligenceParticles({ count = 800 }) {
    const points = useRef();
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = Math.random() * 100 + 10;
            const speed = Math.random() * 0.01 + 0.01;
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            const z = Math.random() * 200 - 100;
            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            const { time, factor, speed, x, y, z } = particle;
            const t = (particle.time += speed);
            dummy.position.set(
                x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.updateMatrix();
            points.current.setMatrixAt(i, dummy.matrix);
        });
        points.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={points} args={[null, null, count]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#00f2ff" transparent opacity={0.6} />
        </instancedMesh>
    );
}

// --- مكون كوكب الأرض السينمائي ---
function CinematicEarth() {
    const earthRef = useRef();
    const atmosphereRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (earthRef.current) earthRef.current.rotation.y = elapsedTime * 0.05;
        if (atmosphereRef.current) atmosphereRef.current.rotation.y = elapsedTime * 0.07;
    });

    return (
        <group>
            {/* النواة المضيئة */}
            <Sphere ref={earthRef} args={[2.5, 64, 64]}>
                <meshPhongMaterial
                    color="#050a10"
                    emissive="#001a2c"
                    specular="#00f2ff"
                    shininess={100}
                    wireframe={true}
                />
            </Sphere>

            {/* الغلاف الجوي الهولوغرافي */}
            <Sphere ref={atmosphereRef} args={[2.8, 64, 64]}>
                <MeshDistortMaterial
                    color="#00f2ff"
                    speed={2}
                    distort={0.3}
                    radius={1}
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* نقاط البيانات الساخنة */}
            {[...Array(15)].map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={[
                        Math.sin(i) * 3,
                        Math.cos(i) * 2,
                        Math.sin(i * 2) * 3
                    ]}>
                        <sphereGeometry args={[0.04, 16, 16]} />
                        <meshBasicMaterial color="#ff2d55" />
                        <pointLight distance={1} intensity={2} color="#ff2d55" />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

// --- واجهة التشغيل (AI Boot UI) ---
const BootSequence = ({ onComplete }) => {
    const [status, setStatus] = useState("INITIALIZING SYSTEM...");
    const [progress, setStatusProgress] = useState(0);

    useEffect(() => {
        const steps = [
            "ESTABLISHING SECURE LINK...",
            "LOADING NEURAL NETWORKS...",
            "SYNCING GLOBAL INTELLIGENCE...",
            "ACCESS GRANTED."
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setStatus(steps[currentStep]);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 1000);
            }
        }, 1200);

        const progInterval = setInterval(() => {
            setStatusProgress(p => (p < 100 ? p + 1 : 100));
        }, 40);

        return () => {
            clearInterval(interval);
            clearInterval(progInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono p-10"
        >
            <div className="w-full max-w-md border border-cyan-900/30 p-8 bg-[#02050a] relative overflow-hidden">
                {/* تأثير المسح الضوئي */}
                <motion.div
                    animate={{ y: [0, 300, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-cyan-500/20 shadow-[0_0_15px_cyan]"
                />

                <div className="flex justify-between mb-2 text-xs text-cyan-500/60">
                    <span>SYSTEM_BOOT_REV_4.0</span>
                    <span>{progress}%</span>
                </div>

                <div className="h-1 w-full bg-cyan-950 mb-6">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    />
                </div>

                <motion.div
                    key={status}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-cyan-400 text-sm tracking-[0.2em] mb-4"
                >
                    {status}
                </motion.div>

                <div className="grid grid-cols-4 gap-2 opacity-20">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-1 bg-cyan-500" />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- الواجهة الرئيسية (The Portal) ---
export default function WorldLensExperience() {
    const [isBooted, setIsBooted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // تتبع حركة الماوس لإضافة تأثير العمق (Parallax)
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="h-screen w-full bg-[#02050a] text-white overflow-hidden selection:bg-cyan-500/30">
            <AnimatePresence>
                {!isBooted && (
                    <BootSequence onComplete={() => setIsBooted(true)} />
                )}
            </AnimatePresence>

            {/* خلفية الـ 3D المستمرة */}
            <div className="fixed inset-0 z-0">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                    <color attach="background" args={['#02050a']} />
                    <fog attach="fog" args={['#02050a', 5, 20]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff2d55" />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <group scale={isBooted ? 1 : 0.8}>
                        <CinematicEarth />
                        <IntelligenceParticles count={800} />
                    </group>
                </Canvas>
            </div>

            {/* طبقة واجهة المستخدم السينمائية */}
            {isBooted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="relative z-10 h-full pointer-events-none"
                >
                    {/* تراكبات هولوغرافية (HUD) */}
                    <motion.div
                        style={{ x: mousePos.x, y: mousePos.y }}
                        className="absolute top-10 left-10 p-6 border-l-2 border-cyan-500/50 bg-gradient-to-r from-cyan-950/20 to-transparent"
                    >
                        <h1 className="text-4xl font-black tracking-tighter text-cyan-400 mb-2">WORLDLENS <span className="text-white opacity-40">AI</span></h1>
                        <p className="text-xs font-mono text-cyan-500/60 uppercase tracking-[0.3em]">Geopolitical Intelligence OS v1.0.4</p>
                    </motion.div>

                    <motion.div
                        style={{ x: -mousePos.x, y: -mousePos.y }}
                        className="absolute bottom-10 right-10 text-right"
                    >
                        <div className="inline-block p-4 border-r-2 border-red-500/50 bg-gradient-to-l from-red-950/20 to-transparent">
                            <div className="flex items-center justify-end gap-2 text-red-500 mb-1">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-xs font-mono tracking-widest uppercase">Live Conflict Stream</span>
                            </div>
                            <p className="text-sm font-mono text-white/80">SECTOR 7-G: ANALYZING KINETIC ACTIVITY</p>
                        </div>
                    </motion.div>

                    {/* أزرار مغناطيسية وتفاعل */}
                    <div className="absolute bottom-10 left-10 pointer-events-auto">
                        <button className="group relative px-8 py-3 overflow-hidden bg-transparent border border-cyan-500/30 transition-all hover:border-cyan-400">
                            <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative font-mono text-xs tracking-[0.5em] text-cyan-400 group-hover:text-white transition-colors">INITIATE DEEP SCAN</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}