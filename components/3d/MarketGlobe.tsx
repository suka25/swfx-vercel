'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface MarketCenter {
  name: string;
  position: [number, number, number];
  session: 'ACTIVE' | 'CLOSED' | 'UPCOMING';
  color: string;
}

const marketCenters: MarketCenter[] = [
  { name: 'SYDNEY', position: [2.5, 0.5, -2], session: 'ACTIVE', color: '#39FF88' },
  { name: 'TOKYO', position: [1.5, 1.2, -1.5], session: 'ACTIVE', color: '#39FF88' },
  { name: 'LONDON', position: [-1.5, 1.5, 0.5], session: 'UPCOMING', color: '#F5A623' },
  { name: 'NEW YORK', position: [-2.5, 0.8, 2], session: 'CLOSED', color: '#FF4D5F' },
];

function MarketDot({ position, session, name }: any) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#39FF88';
      case 'CLOSED': return '#FF4D5F';
      default: return '#F5A623';
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={getStatusColor(session)}
          emissive={getStatusColor(session)}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
        {hovered && (
          <Html center>
            <div className="bg-[#0D1117]/90 backdrop-blur-lg border border-[#39FF88]/30 rounded-xl px-4 py-2 text-center min-w-[120px]">
              <p className="text-xs font-bold text-[#F5F7FA]">{name}</p>
              <p className={`text-[10px] font-medium ${
                session === 'ACTIVE' ? 'text-[#39FF88]' :
                session === 'CLOSED' ? 'text-[#FF4D5F]' :
                'text-[#F5A623]'
              }`}>
                {session}
              </p>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

function ArcLine({ from, to }: any) {
  const points = [
    new THREE.Vector3(from[0], from[1], from[2]),
    new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.8, (from[2] + to[2]) / 2),
    new THREE.Vector3(to[0], to[1], to[2]),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#39FF88" transparent opacity={0.3} />
    </line>
  );
}

function GlobeContent() {
  const globeRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF88" />

      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0D1117"
          emissive="#39FF88"
          emissiveIntensity={0.05}
          wireframe
          transparent
          opacity={0.8}
        />
      </Sphere>

      {marketCenters.map((center) => (
        <MarketDot
          key={center.name}
          position={center.position}
          session={center.session}
          name={center.name}
        />
      ))}

      {marketCenters.map((from, i) =>
        marketCenters.slice(i + 1).map((to) => (
          <ArcLine
            key={`${from.name}-${to.name}`}
            from={from.position}
            to={to.position}
          />
        ))
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export function MarketGlobe() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <GlobeContent />
      </Canvas>
    </div>
  );
}
