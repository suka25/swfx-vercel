'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Float } from '@react-three/drei';

interface FloatingCandlesProps {
  count?: number;
  spread?: number;
}

export function FloatingCandles({ count = 10, spread = 4 }: FloatingCandlesProps) {
  const groupRef = useRef<any>(null);

  const candles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      rotation: Math.random() * Math.PI * 2,
      color: ['#39FF88', '#F5A623', '#FF4D5F', '#39FF88'][Math.floor(Math.random() * 4)],
    }));
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {candles.map((candle, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.5}>
          <group position={candle.position} rotation={[0, candle.rotation, 0]}>
            <Box args={[0.02, candle.scale * 2, 0.02]}>
              <meshStandardMaterial color={candle.color} emissive={candle.color} emissiveIntensity={0.3} />
            </Box>
            <Box args={[0.03, candle.scale * 0.2, 0.03]} position={[0, candle.scale + 0.05, 0]}>
              <meshStandardMaterial color="#F5A623" emissive="#F5A623" emissiveIntensity={0.5} />
            </Box>
          </group>
        </Float>
      ))}
    </group>
  );
}
