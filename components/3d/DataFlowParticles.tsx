'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DataFlowContent() {
  const pointsRef = useRef<any>(null);

  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 2;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      col[i * 3] = 0.2 + t * 0.8; // R
      col[i * 3 + 1] = 0.8 + (1 - t) * 0.2; // G
      col[i * 3 + 2] = 0.2 + (1 - t) * 0.8; // B
    }
    return col;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        const theta = Math.atan2(pos[i + 1], pos[i]);
        const phi = Math.acos(pos[i + 2] / Math.sqrt(pos[i] * pos[i] + pos[i + 1] * pos[i + 1] + pos[i + 2] * pos[i + 2]));
        const radius = Math.sqrt(pos[i] * pos[i] + pos[i + 1] * pos[i + 1] + pos[i + 2] * pos[i + 2]);
        const newTheta = theta + 0.005;
        pos[i] = radius * Math.sin(phi) * Math.cos(newTheta);
        pos[i + 1] = radius * Math.sin(phi) * Math.sin(newTheta);
        pos[i + 2] = radius * Math.cos(phi);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            itemSize={3}
            array={colors}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.03}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </Points>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </>
  );
}

export function DataFlowParticles() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <DataFlowContent />
      </Canvas>
    </div>
  );
}
