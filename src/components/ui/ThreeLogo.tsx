import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= 0.01;
      ringRef.current.rotation.y -= 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} scale={0.7}>
          <MeshDistortMaterial
            color="#3b82f6" // primary-500
            emissive="#1e3a8a"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        <Torus ref={ringRef} args={[1.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#93c5fd" />
    </group>
  );
}

export function ThreeLogo({ className }: { className?: string }) {
  return (
    <div className={`w-16 h-16 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
