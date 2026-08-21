'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, OrbitControls, Stars, Box } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<any>(null);
  const count = 500;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  useFrame(() => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i++) {
        pos[i] += (Math.random() - 0.5) * 0.002;
        if (Math.abs(pos[i]) > 7.5) {
          pos[i] = (Math.random() - 0.5) * 15;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial color="#39FF88" size={0.04} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function FloatingCubes() {
  const groupRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.03;
    }
  });

  const count = isMobile ? 15 : 30;
  const spread = isMobile ? 4 : 7;

  const cubes = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * 3 + 0.5,
      (Math.random() - 0.5) * spread
    ],
    scale: 0.1 + Math.random() * (isMobile ? 0.15 : 0.25),
    color: ['#39FF88', '#F5A623', '#FF4D5F', '#4A90D9'][Math.floor(Math.random() * 4)],
    speed: 0.3 + Math.random() * 0.5,
  }));

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.2} floatIntensity={0.3}>
          <Box args={[1, 1, 1]} scale={cube.scale} position={cube.position}>
            <meshStandardMaterial 
              color={cube.color} 
              emissive={cube.color} 
              emissiveIntensity={0.15} 
              transparent 
              opacity={0.3} 
              wireframe 
              roughness={0.3}
              metalness={0.7}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

function CoreSphere() {
  const meshRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = clock.elapsedTime * 0.07;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.8, 48, 48]}>
        <meshStandardMaterial
          color="#0D1117"
          emissive="#39FF88"
          emissiveIntensity={0.05}
          wireframe
          transparent
          opacity={0.3}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export function UltimateHero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, isMobile ? 5 : 7], fov: 45 }}
        dpr={isMobile ? [0.5, 1] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#39FF88" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4A90D9" />
        <pointLight position={[0, -10, 0]} intensity={0.5} color="#F5A623" />
        
        <Particles />
        <CoreSphere />
        <FloatingCubes />
        <Stars 
          radius={isMobile ? 10 : 20} 
          depth={isMobile ? 5 : 10} 
          count={isMobile ? 150 : 400} 
          factor={2} 
          saturation={0} 
          fade 
          speed={0.3} 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={isMobile ? 0.3 : 0.15}
          enableDamping={false}
        />
      </Canvas>
    </div>
  );
}
