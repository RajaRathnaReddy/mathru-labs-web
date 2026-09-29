'use client';

import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Node positions representing business tools ──
// Placed on outer perimeter to leave the central headline area 100% clear and legible
const NODE_POSITIONS: [number, number, number][] = [
  [-4.2, 1.8, 0],     // Node 0: Left Top
  [-3.8, -1.8, 0.4],  // Node 1: Left Bottom
  [-2.0, 3.2, -0.4],  // Node 2: Top Left
  [4.0, 1.8, 0.3],    // Node 3: Right Top
  [3.8, -1.8, -0.3],  // Node 4: Right Bottom
  [-4.6, 0.0, 0.6],   // Node 5: Far Left Mid
  [2.0, 3.2, -0.4],   // Node 6: Top Right
  [4.6, 0.0, 0.4],    // Node 7: Far Right Mid
  [-2.2, -3.0, 0.2],  // Node 8: Bottom Left
  [3.2, 2.8, -0.4],   // Node 9: Top Far Right
  [-3.2, 2.8, 0.2],   // Node 10: Top Far Left
  [2.2, -3.0, 0.3],   // Node 11: Bottom Right
];

// ── Edges (connections between nodes strictly on perimeter) ──
const EDGES: [number, number][] = [
  [0, 5], [5, 1], [1, 8], [8, 11], [11, 4], [4, 7],
  [7, 3], [3, 9], [9, 6], [6, 2], [2, 10], [10, 0],
  [10, 2], [6, 9], [7, 4], [8, 11], [5, 0], [1, 5],
];

// ── Flowing data pulse along an edge ──
interface PulseData {
  edgeIndex: number;
  progress: number;
  speed: number;
  delay: number;
  active: boolean;
}

// ── Mouse tracking ──
function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return mouse;
}

// ── Brand Palette Colors for 3D Nodes ──
const NODE_BRAND_COLORS: [number, number, number][] = [
  [0.0, 0.44, 1.0],   // Node 0: Electric Blue
  [0.0, 0.82, 0.42],  // Node 1: Neon Emerald
  [0.22, 0.74, 0.97], // Node 2: Cyan
  [1.0, 0.4, 0.0],    // Node 3: Sunset Orange
  [1.0, 0.55, 0.1],   // Node 4: Warm Amber
  [0.0, 0.44, 1.0],   // Node 5: Electric Blue
  [0.0, 0.82, 0.42],  // Node 6: Neon Emerald
  [1.0, 0.4, 0.0],    // Node 7: Sunset Orange
  [0.0, 0.82, 0.42],  // Node 8: Neon Emerald
  [0.22, 0.74, 0.97], // Node 9: Cyan
  [0.0, 0.44, 1.0],   // Node 10: Electric Blue
  [1.0, 0.4, 0.0],    // Node 11: Sunset Orange
];

// ── Glowing Nodes ──
function Nodes({ mouseRef }: { mouseRef: React.RefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const basePositions = useMemo(() => NODE_POSITIONS.map(p => new THREE.Vector3(...p)), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  // Create geometry with per-instance color attribute
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(1, 1);
    const colors = new Float32Array(NODE_POSITIONS.length * 3);
    NODE_BRAND_COLORS.forEach((c, i) => {
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    });
    geom.setAttribute('aNodeColor', new THREE.InstancedBufferAttribute(colors, 3));
    return geom;
  }, []);

  // Node material with multi-color glow (Subtle, NO harsh white glare)
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aNodeColor;
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vUv = uv;
          vColor = aNodeColor;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float core = smoothstep(0.6, 0.0, dist);
          float glow = smoothstep(1.0, 0.2, dist) * 0.35;
          float pulse = 0.85 + 0.15 * sin(uTime * 1.6);
          // Pure brand color - soft and non-intrusive
          vec3 finalColor = vColor * (0.85 + 0.15 * core);
          float alpha = (core * 0.45 + glow * 0.25) * pulse;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !mouseRef.current) return;
    const time = state.clock.elapsedTime;
    material.uniforms.uTime.value = time;

    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    basePositions.forEach((base, i) => {
      // Gentle breathing motion
      const breathX = Math.sin(time * 0.3 + i * 0.7) * 0.06;
      const breathY = Math.cos(time * 0.4 + i * 0.5) * 0.06;

      // Mouse reactivity — nodes subtly drift toward cursor
      const dx = mouseX - base.x;
      const dy = mouseY - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 5) * 0.12;

      dummy.position.set(
        base.x + breathX + dx * influence,
        base.y + breathY + dy * influence,
        base.z
      );

      // Delicate micro-node scale (0.16) — subtle ambient points that never overwhelm text
      const scale = 0.16 + Math.sin(time * 1.2 + i) * 0.02;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, NODE_POSITIONS.length]}
    />
  );
}

// ── Connection Lines ──
function ConnectionLines({ mouseRef }: { mouseRef: React.RefObject<THREE.Vector2> }) {
  const linesRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const lineData = useMemo(() => {
    return EDGES.map(([from, to]) => ({
      from: new THREE.Vector3(...NODE_POSITIONS[from]),
      to: new THREE.Vector3(...NODE_POSITIONS[to]),
    }));
  }, []);

  useFrame((state) => {
    if (!linesRef.current || !mouseRef.current) return;
    const time = state.clock.elapsedTime;
    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    linesRef.current.children.forEach((line, i) => {
      const { from, to } = lineData[i];

      // Apply same breathing + mouse offset as nodes
      const fromIdx = EDGES[i][0];
      const toIdx = EDGES[i][1];

      const getOffset = (base: THREE.Vector3, idx: number) => {
        const breathX = Math.sin(time * 0.3 + idx * 0.7) * 0.08;
        const breathY = Math.cos(time * 0.4 + idx * 0.5) * 0.08;
        const dx = mouseX - base.x;
        const dy = mouseY - base.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 5) * 0.15;
        return {
          x: base.x + breathX + dx * influence,
          y: base.y + breathY + dy * influence,
          z: base.z,
        };
      };

      const fPos = getOffset(from, fromIdx);
      const tPos = getOffset(to, toIdx);

      const geom = (line as THREE.Line).geometry as THREE.BufferGeometry;
      const positions = geom.attributes.position.array as Float32Array;
      positions[0] = fPos.x;
      positions[1] = fPos.y;
      positions[2] = fPos.z;
      positions[3] = tPos.x;
      positions[4] = tPos.y;
      positions[5] = tPos.z;
      geom.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={linesRef}>
      {lineData.map((edge, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                edge.from.x, edge.from.y, edge.from.z,
                edge.to.x, edge.to.y, edge.to.z,
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#1E2538"
            transparent
            opacity={0.6}
          />
        </line>
      ))}
    </group>
  );
}

// ── Flowing data pulses ──
function DataPulses({ mouseRef }: { mouseRef: React.RefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const PULSE_COUNT = 30;

  const pulses = useMemo<PulseData[]>(() => {
    return Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edgeIndex: i % EDGES.length,
      progress: Math.random(),
      speed: 0.15 + Math.random() * 0.25,
      delay: Math.random() * 3,
      active: true,
    }));
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#2DD4BF') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float alpha = smoothstep(1.0, 0.0, dist);
          gl_FragColor = vec4(uColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !mouseRef.current) return;
    const time = state.clock.elapsedTime;
    const dt = state.clock.getDelta();
    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    pulses.forEach((pulse, i) => {
      if (time < pulse.delay) {
        dummy.position.set(0, 0, -100);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
        return;
      }

      pulse.progress += dt * pulse.speed;
      if (pulse.progress > 1) {
        pulse.progress = 0;
        pulse.edgeIndex = Math.floor(Math.random() * EDGES.length);
        pulse.speed = 0.15 + Math.random() * 0.25;
      }

      const [fromIdx, toIdx] = EDGES[pulse.edgeIndex];
      const from = NODE_POSITIONS[fromIdx];
      const to = NODE_POSITIONS[toIdx];

      // Interpolate along edge with same offsets as nodes
      const getPos = (base: [number, number, number], idx: number) => {
        const breathX = Math.sin(time * 0.3 + idx * 0.7) * 0.08;
        const breathY = Math.cos(time * 0.4 + idx * 0.5) * 0.08;
        const dx = mouseX - base[0];
        const dy = mouseY - base[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 5) * 0.15;
        return [
          base[0] + breathX + dx * influence,
          base[1] + breathY + dy * influence,
          base[2],
        ];
      };

      const fPos = getPos(from, fromIdx);
      const tPos = getPos(to, toIdx);
      const t = pulse.progress;

      dummy.position.set(
        fPos[0] + (tPos[0] - fPos[0]) * t,
        fPos[1] + (tPos[1] - fPos[1]) * t,
        fPos[2] + (tPos[2] - fPos[2]) * t + 0.1
      );

      // Pulse scale — grows at middle, shrinks at ends
      const sizeFactor = Math.sin(t * Math.PI) * 0.12 + 0.04;
      dummy.scale.setScalar(sizeFactor);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PULSE_COUNT]} material={material}>
      <planeGeometry args={[1, 1]} />
    </instancedMesh>
  );
}

// ── Background subtle glow particles ──
function BackgroundParticles() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 2 - 1,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      size: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.phase) * 0.3,
        p.y + Math.cos(time * p.speed * 0.7 + p.phase) * 0.2,
        p.z
      );
      const s = p.size * (0.5 + 0.5 * Math.sin(time * 0.8 + p.phase));
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#8B93A7"
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

// ── Main Scene ──
function Scene() {
  const mouseRef = useMousePosition();

  return (
    <>
      <BackgroundParticles />
      <ConnectionLines mouseRef={mouseRef} />
      <Nodes mouseRef={mouseRef} />
      <DataPulses mouseRef={mouseRef} />
    </>
  );
}

// ── Exported Component ──
export function LivingWorkflow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
