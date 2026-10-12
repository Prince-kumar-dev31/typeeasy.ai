import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { fingerColors } from '../data/keyMap';

// Low-poly procedural hand model
function ProceduralHand({ side, targetFinger, zonesEnabled, resetTrigger }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating / breathing idle animation
      const t = state.clock.getElapsedTime();
      const xOffset = side === 'left' ? -1.15 : 1.15;
      groupRef.current.position.y = Math.sin(t * 1.5 + (side === 'left' ? 0 : 1.2)) * 0.04;
      groupRef.current.rotation.z = (side === 'left' ? 0.08 : -0.08) + Math.sin(t * 1.2) * 0.02;
    }
  });

  const isLeft = side === 'left';
  const prefix = isLeft ? 'L' : 'R';

  // 5 fingers: Pinky, Ring, Middle, Index, Thumb
  const fingerDefs = [
    { name: `${prefix}-Pinky`, x: isLeft ? -0.52 : 0.52, y: 0.18, len: 0.55, rad: 0.09, zoneColor: fingerColors[`${prefix}-Pinky`] },
    { name: `${prefix}-Ring`, x: isLeft ? -0.26 : 0.26, y: 0.28, len: 0.70, rad: 0.10, zoneColor: fingerColors[`${prefix}-Ring`] },
    { name: `${prefix}-Middle`, x: isLeft ? 0.0 : 0.0, y: 0.32, len: 0.78, rad: 0.105, zoneColor: fingerColors[`${prefix}-Middle`] },
    { name: `${prefix}-Index`, x: isLeft ? 0.26 : -0.26, y: 0.26, len: 0.68, rad: 0.10, zoneColor: fingerColors[`${prefix}-Index`] },
    { name: 'Thumbs', x: isLeft ? 0.55 : -0.55, y: -0.05, len: 0.50, rad: 0.11, zoneColor: fingerColors['Thumbs'], rotZ: isLeft ? -0.45 : 0.45 }
  ];

  return (
    <group
      ref={groupRef}
      position={[isLeft ? -1.2 : 1.2, 0, 0]}
      rotation={[-0.15, 0, isLeft ? 0.08 : -0.08]}
    >
      {/* Palm mesh */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.25, 0.45, 0.45]} />
        <meshStandardMaterial color="#c28d72" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Wrist anchor */}
      <mesh position={[0, -0.5, 0.05]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.38, 0.35, 12]} />
        <meshStandardMaterial color="#b37c63" roughness={0.8} />
      </mesh>

      {/* Segmented fingers */}
      {fingerDefs.map((f) => {
        const isTarget = targetFinger === f.name || (targetFinger === 'Thumbs' && f.name === 'Thumbs');
        const defaultColor = zonesEnabled && f.zoneColor ? f.zoneColor : '#d7a087';

        return (
          <group
            key={f.name}
            position={[f.x, f.y, 0]}
            rotation={[0, 0, f.rotZ || 0]}
          >
            {/* Proximal knuckle */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[f.rad * 1.05, 10, 10]} />
              <meshStandardMaterial color="#c28d72" roughness={0.7} />
            </mesh>

            {/* Finger body */}
            <mesh position={[0, f.len / 2, 0]}>
              <capsuleGeometry args={[f.rad, f.len, 6, 12]} />
              <meshStandardMaterial
                color={isTarget ? '#d946ef' : defaultColor}
                emissive={isTarget ? '#a21caf' : zonesEnabled ? f.zoneColor : '#000000'}
                emissiveIntensity={isTarget ? 3.0 : zonesEnabled ? 0.35 : 0}
                roughness={0.5}
                metalness={isTarget ? 0.2 : 0.05}
              />
            </mesh>

            {/* Fingertip cap */}
            <mesh position={[0, f.len, 0]}>
              <sphereGeometry args={[f.rad * 0.95, 8, 8]} />
              <meshStandardMaterial
                color={isTarget ? '#f472b6' : defaultColor}
                emissive={isTarget ? '#d946ef' : '#000000'}
                emissiveIntensity={isTarget ? 3.5 : 0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function HandsScene({ finger, zones, resetCount }) {
  const controlsRef = useRef();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        className="hands-canvas"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 1.8, 4.4]} fov={45} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[0, 4, 3]} intensity={2.2} color="#ffffff" />
        <pointLight position={[0, 1.5, 2.5]} intensity={5.5} color="#818cf8" distance={10} />
        <pointLight position={[-2, 1, 1]} intensity={3.0} color="#c084fc" distance={8} />
        <pointLight position={[2, 1, 1]} intensity={3.0} color="#38bdf8" distance={8} />

        <ProceduralHand
          side="left"
          targetFinger={finger}
          zonesEnabled={zones}
          resetTrigger={resetCount}
        />
        <ProceduralHand
          side="right"
          targetFinger={finger}
          zonesEnabled={zones}
          resetTrigger={resetCount}
        />

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
