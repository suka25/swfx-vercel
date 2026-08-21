'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars, Glow, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

function FloatingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#39FF88"
          emissive="#39FF88"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          opacity={0.6}
          transparent
        />
      </Sphere>
    </Float>
  );
}

function FloatingSpheres() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[0.8, 32, 32]} position={[-3, 1, -2]}>
          <MeshDistortMaterial
            color="#FF4D5F"
            emissive="#FF4D5F"
            emissiveIntensity={0.2}
            distort={0.3}
            speed={1.2}
            roughness={0.3}
            metalness={0.7}
            opacity={0.4}
            transparent
          />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Sphere args={[0.6, 32, 32]} position={[3.5, -0.5, -1]}>
          <MeshDistortMaterial
            color="#F5A623"
            emissive="#F5A623"
            emissiveIntensity={0.2}
            distort={0.4}
            speed={1.8}
            roughness={0.2}
            metalness={0.6}
            opacity={0.4}
            transparent
          />
        </Sphere>
      </Float>
    </>
  );
}

function Particles() {
  return (
    <Stars
      radius={10}
      depth={10}
      count={300}
      factor={2}
      saturation={0}
      fade
      speed={0.5}
    />
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#080A0D']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF88" />
          
          <Particles />
          <FloatingSphere />
          <FloatingSpheres />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.3}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
