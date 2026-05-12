'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars, Float, MeshDistortMaterial, PerspectiveCamera, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- بيانات الدول (Intelligence Data) ---
const countriesData = [
    {
        name: "UNITED STATES",
        pos: [2.2, 1.2, 1.5],
        color: "#00f2ff",
        status: "NEURAL SYNC: STABLE",
        metrics: { mood: "ASSERTIVE", fear: "22%", pressure: "MODERATE", tension: "LOW", influence: "DOMINANT" },
        narrative: "Technological sovereignty through AI acceleration."
    },
    {
        name: "CHINA",
        pos: [-2.4, 0.8, -1.2],
        color: "#ff2d55",
        status: "TRADE SIGNAL BURST",
        metrics: { mood: "CALCULATED", fear: "15%", pressure: "HIGH", tension: "MODERATE", influence: "EXPANDING" },
        narrative: "Global infrastructure dominance via digital silk roads."
    },
    {
        name: "RUSSIA",
        pos: [-1.2, 2.2, -0.5],
        color: "#ff8800",
        status: "KINETIC TENSION HIGH",
        metrics: { mood: "DEFENSIVE", fear: "68%", pressure: "EXTREME", tension: "CRITICAL", influence: "REGIONAL" },
        narrative: "Sovereign resource protection and multi-polar alignment."
    },
    {
        name: "EUROPEAN UNION",
        pos: [0.5, 2.4, 0.8],
        color: "#0077ff",
        status: "POLITICAL FLUIDITY",
        metrics: { mood: "REFLECTIVE", fear: "41%", pressure: "STABLE", tension: "MODERATE", influence: "CULTURAL" },
        narrative: "Ethical regulation of the emerging digital consciousness."
    },
];

// --- مكون الجسيمات الاستخباراتية (Global Signal Particles) ---
function IntelligenceParticles({ count = 400 }) {
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
                z + (Math.sin(t * 3) * factor) / 20
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

// --- مكون عصبية الدولة (Country Intelligence Node) ---
function CountryNode({ position, name, status, color, onSelect, active }) {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const t = clock.getElapsedTime();
            meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
        }
    });

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => onSelect(name)}
                >
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshBasicMaterial color={color} />
                    <pointLight distance={2} intensity={5} color={color} />
                </mesh>

                <Html distanceFactor={10} position={[0, 0.4, 0]}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`pointer-events-none select-none font-mono transition-all duration-500 ${hovered || active ? 'scale-110' : 'scale-100 opacity-60'}`}
                    >
                        <div className="flex flex-col items-center">
                            <div className={`px-2 py-0.5 border text-[10px] tracking-[0.2em] mb-1 bg-black/80`} style={{ borderColor: color, color }}>
                                {name}
                            </div>
                            <AnimatePresence>
                                {(hovered || active) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1, transition: { ease: "circOut", duration: 0.4 } }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="w-32 p-2 bg-black/90 border-l border-white/20 backdrop-blur-md overflow-hidden"
                                    >
                                        <div className="text-[7px] text-white/40 mb-1 uppercase tracking-tighter">Activity Stream</div>
                                        <div className="space-y-1">
                                            <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                                                <motion.div
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="h-full w-1/2"
                                                    style={{ backgroundColor: color }}
                                                />
                                            </div>
                                            <div className="text-[8px] text-white/80">{status}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </Html>
            </Float>
        </group>
    );
}

// --- مكون كوكب الأرض السينمائي ---
function CinematicEarth({ onSelectCountry, selectedCountry }) {
    const earthRef = useRef();
    const atmosphereRef = useRef();
    const { camera } = useThree();
    const targetCamPos = useRef(new THREE.Vector3(0, 2, 10));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useEffect(() => {
        if (selectedCountry) {
            const country = countriesData.find(c => c.name === selectedCountry);
            if (country) {
                const pos = new THREE.Vector3(...country.pos).normalize().multiplyScalar(5.5);
                targetCamPos.current.copy(pos);
                targetLookAt.current.set(...country.pos).multiplyScalar(0.5);
            }
        } else {
            targetCamPos.current.set(0, 2, 10);
            targetLookAt.current.set(0, 0, 0);
        }
    }, [selectedCountry]);

    useFrame(({ clock, mouse }) => {
        const elapsedTime = clock.getElapsedTime();
        // Slower, more majestic rotation
        if (earthRef.current) earthRef.current.rotation.y = elapsedTime * 0.02;
        if (atmosphereRef.current) atmosphereRef.current.rotation.y = elapsedTime * 0.03;

        // High-precision smooth damping
        camera.position.lerp(targetCamPos.current, 0.03);

        const currentLookAt = new THREE.Vector3();
        const lookAtTarget = new THREE.Vector3().lerpVectors(new THREE.Vector3(0, 0, 0), targetLookAt.current, 0.03);

        // Minimal parallax to maintain stability
        const pX = !selectedCountry ? mouse.x * 0.2 : 0;
        const pY = !selectedCountry ? mouse.y * 0.2 : 0;
        camera.lookAt(lookAtTarget.x + pX, lookAtTarget.y + pY, lookAtTarget.z);
    });

    return (
        <group>
            <Sphere ref={earthRef} args={[2.5, 64, 64]}>
                <meshPhongMaterial
                    color="#050a10"
                    emissive="#001a2c"
                    specular="#00f2ff"
                    shininess={100}
                    wireframe={true}
                />
            </Sphere>

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

            {/* عصبية الدول التفاعلية */}
            {countriesData.map((c, i) => (
                <CountryNode
                    key={i}
                    position={c.pos}
                    name={c.name}
                    status={c.status}
                    color={c.color}
                    onSelect={(name) => onSelectCountry(name)}
                    active={selectedCountry === c.name}
                />
            ))}
        </group>
    );
}

// --- عرض وعي الدولة (Country Consciousness View) ---
const ConsciousnessView = ({ country, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { type: "spring", damping: 25, stiffness: 100 } }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute inset-y-0 right-0 w-full max-w-xl bg-black/40 backdrop-blur-3xl border-l border-white/10 z-50 p-12 overflow-y-auto"
        >
            <button
                onClick={onClose}
                className="absolute top-10 right-10 text-cyan-400 font-mono text-xs tracking-widest hover:text-white transition-colors pointer-events-auto"
            >
                [ EXIT_CONSCIOUSNESS ]
            </button>

            <div className="mb-12">
                <h2 className="text-6xl font-black tracking-tighter text-white mb-2">{country}</h2>
                <div className="flex gap-4 font-mono text-[10px]">
                    <span className="text-cyan-400 animate-pulse">● LIVE_SIMULATION</span>
                    <span className="text-white/40">NEURAL_SENTIMENT: STABLE</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12 text-white">
                {[
                    { label: "FEAR INDEX", value: "34.2", color: "text-cyan-400" },
                    { label: "ECONOMIC PRESSURE", value: "HIGH", color: "text-red-400" },
                    { label: "GLOBAL ATTENTION", value: "98/100", color: "text-cyan-400" },
                    { label: "MEDIA BIAS", value: "POLARIZED", color: "text-orange-400" }
                ].map((stat, i) => (
                    <div key={i} className="border-b border-white/5 pb-4">
                        <div className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className={`text-2xl font-mono ${stat.color}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="font-mono text-[10px] text-cyan-500/60 tracking-[0.3em] uppercase">Narrative Streams</div>
                {["AI algorithm detecting shift in diplomatic rhetoric...", "Media sentiment analysis showing increased anxiety."].map((stream, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 border-l-2 border-cyan-500/30 text-xs font-mono leading-relaxed text-white/70"
                    >
                        {stream}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

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
            exit={{ opacity: 0, scale: 1.05 }}
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
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // تتبع حركة الماوس لإضافة تأثير العمق (Parallax)
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Heavily dampened for UI stability
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            setMousePos({ x, y });
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
                        <CinematicEarth
                            onSelectCountry={(name) => setSelectedCountry(name)}
                            selectedCountry={selectedCountry}
                        />
                        <AnimatePresence>
                            {!selectedCountry && <IntelligenceParticles count={400} />}
                        </AnimatePresence>
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

            {/* شاشة وعي الدولة المنسدلة */}
            <AnimatePresence>
                {isBooted && selectedCountry && (
                    <ConsciousnessView country={selectedCountry} onClose={() => setSelectedCountry(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}