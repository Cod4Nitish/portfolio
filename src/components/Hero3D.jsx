import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating orb ───────────────────────────────────────────── */
function GlowOrb({ position, color, speed = 1, distort = 0.4 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </Sphere>
    </Float>
  );
}

/* ── Spinning ring ──────────────────────────────────────────── */
function SpinRing({ position, color, rx = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4 + rx;
      ref.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Torus ref={ref} args={[1.5, 0.04, 16, 100]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.6} />
      </Torus>
    </Float>
  );
}

/* ── Particle field ─────────────────────────────────────────── */
function Particles({ count = 120 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#7c5cff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Main exported canvas ───────────────────────────────────── */
const Hero3D = () => (
  <div
    style={{
      position: 'absolute', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}
    aria-hidden="true"
  >
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 6, 6]} intensity={2} color="#7c5cff" />
      <pointLight position={[-6, -4, 4]} intensity={1.5} color="#00e5ff" />

      <Stars radius={80} depth={40} count={800} factor={3} fade speed={0.6} />
      <Particles />

      {/* Large back orb — left */}
      <GlowOrb position={[-5.5, 1.5, -3]} color="#7c5cff" speed={0.7} distort={0.5} />
      {/* Medium orb — right */}
      <GlowOrb position={[5, -1.5, -2]} color="#00e5ff" speed={1.2} distort={0.3} />
      {/* Small accent orb */}
      <GlowOrb position={[2, 3, -4]} color="#a855f7" speed={0.9} distort={0.6} />

      {/* Spinning rings */}
      <SpinRing position={[-4, -2, -3]} color="#7c5cff" rx={1.2} />
      <SpinRing position={[4.5, 2.5, -4]} color="#00e5ff" rx={0.5} />
    </Canvas>
  </div>
);

export default Hero3D;
