import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Environment } from '@react-three/drei';

const AnimatedShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color="#8b5cf6" 
          wireframe
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      <mesh scale={1.2}>
         <sphereGeometry args={[1, 64, 64]} />
         <MeshDistortMaterial 
            color="#a78bfa"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.6}
         />
      </mesh>
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-[-1]" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#8b5cf6" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
        
        <AnimatedShape />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
