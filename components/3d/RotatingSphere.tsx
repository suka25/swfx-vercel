'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function SphereContent() {
  const meshRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF88" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.8, 48, 48]}>
          <meshStandardMaterial
            color="#0D1117"
            emissive="#39FF88"
            emissiveIntensity={0.05}
            wireframe
            transparent
            opacity={0.7}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Inner glow sphere */}
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#39FF88"
          emissive="#39FF88"
          emissiveIntensity={0.05}
          transparent
          opacity={0.1}
        />
      </Sphere>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export function RotatingSphere() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <SphereContent />
      </Canvas>
    </div>
  );
}
