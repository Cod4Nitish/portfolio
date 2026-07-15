import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Small floating sphere ── */
function FloatOrb({ position, color, size = 0.5, speed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.45}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Torus ring ── */
function FloatRing({ position, color, rx = 0, size = 1.2 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.35 + rx;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[size, 0.03, 12, 80]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

/* ── Dot particles ── */
function Dots({ count = 90 }) {
  const pts = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (pts.current) pts.current.rotation.y = s.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7c5cff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const Hero3D = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
    aria-hidden="true"
  >
    <Canvas
      camera={{ position: [0, 0, 8], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.2]}          /* cap DPR for performance on mobile */
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]}  intensity={1.8} color="#7c5cff" />
      <pointLight position={[-5, -3, 3]} intensity={1.2} color="#00e5ff" />

      {/* Star background */}
      <Stars radius={70} depth={35} count={600} factor={2.5} fade speed={0.5} />

      {/* Dot cloud */}
      <Dots />

      {/* Orbs — placed away from the center (where content is) */}
      <FloatOrb position={[-5.5, 2, -2]}   color="#7c5cff" size={0.75} speed={0.6} />
      <FloatOrb position={[5.5, -1.5, -2]} color="#00e5ff" size={0.55} speed={1.0} />
      <FloatOrb position={[1.5, 3.5, -5]}  color="#a855f7" size={0.4}  speed={0.8} />

      {/* Rings */}
      <FloatRing position={[-4, -2, -3]} color="#7c5cff" rx={1.0} size={1.3} />
      <FloatRing position={[4.5, 2, -4]}  color="#00e5ff" rx={0.4} size={1.0} />
    </Canvas>
  </div>
);

export default Hero3D;
