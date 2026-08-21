'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Candle({ position, color, scale }: any) {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.001;
    }
  });

  return (
    <Float speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref} position={position}>
        <Box args={[0.03, scale * 2, 0.03]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </Box>
        <Box args={[0.04, scale * 0.2, 0.04]} position={[0, scale + 0.05, 0]}>
          <meshStandardMaterial color="#F5A623" emissive="#F5A623" emissiveIntensity={0.3} />
        </Box>
      </group>
    </Float>
  );
}

function CandlesContent() {
  const groupRef = useRef<any>(null);

  const candles = useMemo(() => {
    const colors = ['#39FF88', '#F5A623', '#FF4D5F', '#39FF88', '#F5A623'];
    return Array.from({ length: 30 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: 0.15 + Math.random() * 0.2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF88" />
      {candles.map((candle, i) => (
        <Candle key={i} {...candle} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
    </group>
  );
}

export function FloatingCandles3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <CandlesContent />
      </Canvas>
    </div>
  );
}
