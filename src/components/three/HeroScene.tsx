import { useEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Laptop, Phone } from './Devices';
import { CodeParticles } from './CodeParticles';

export interface HeroSceneProps {
  tier: 'full' | 'lite';
  /** Pause rendering when the hero is off-screen. */
  active: boolean;
  isDark: boolean;
}

const damp = THREE.MathUtils.damp;

/** Normalised (-1..1) window pointer — works even though the canvas sits behind the hero text. */
function useWindowPointer() {
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return p;
}

const scrollProgress = () => Math.min(window.scrollY / window.innerHeight, 1.5);

/** Main device group: follows the mouse and lifts/turns as the page scrolls. */
function DeviceRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer();
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.1;

  const baseX = wide ? Math.min(viewport.width * 0.19, 2.4) : 0.2;
  const baseY = wide ? -0.35 : -2.3;
  const scale = wide ? 1 : 0.55;

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const s = scrollProgress();
    g.rotation.y = damp(g.rotation.y, -0.45 + pointer.current.x * 0.35 + s * 0.8, 4, dt);
    g.rotation.x = damp(g.rotation.x, 0.18 - pointer.current.y * 0.12 + s * 0.3, 4, dt);
    g.position.x = damp(g.position.x, baseX, 4, dt);
    g.position.y = damp(g.position.y, baseY + s * 1.6, 4, dt);
  });

  return (
    <group ref={group} scale={scale} position={[baseX, baseY, 0]}>
      {children}
    </group>
  );
}

/** Background layer with gentle parallax (moves less than the devices → depth). */
function ParallaxLayer({ children, factor }: { children: ReactNode; factor: number }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    g.position.x = damp(g.position.x, pointer.current.x * factor, 2, dt);
    g.position.y = damp(g.position.y, pointer.current.y * factor * 0.6 + scrollProgress() * factor * 4, 2, dt);
    g.rotation.y += dt * 0.01;
  });

  return <group ref={group}>{children}</group>;
}

function WireShape({
  geometry,
  position,
  color,
  speed,
}: {
  geometry: 'ico' | 'octa' | 'torus';
  position: THREE.Vector3Tuple;
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh position={position}>
        {geometry === 'ico' && <icosahedronGeometry args={[0.6, 0]} />}
        {geometry === 'octa' && <octahedronGeometry args={[0.45, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[0.4, 0.12, 8, 18]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

function Scene({ tier, isDark }: Omit<HeroSceneProps, 'active'>) {
  const full = tier === 'full';
  const accent = isDark ? '#2dd4bf' : '#0d9488';
  const accent2 = isDark ? '#22d3ee' : '#0891b2';

  return (
    <>
      <ambientLight intensity={isDark ? 0.55 : 0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <pointLight position={[0, 1.2, 2.2]} color={accent} intensity={4} distance={7} />

      <ParallaxLayer factor={0.25}>
        {isDark && <Stars radius={60} depth={40} count={full ? 2500 : 800} factor={3} fade speed={0.6} />}
        <CodeParticles total={full ? 200 : 64} color={accent} />
        <WireShape geometry="ico" position={[-4.6, 1.8, -2]} color={accent} speed={1.4} />
        <WireShape geometry="octa" position={[4.8, 2.4, -3]} color={accent2} speed={1.8} />
        {full && <WireShape geometry="torus" position={[-3.4, -2.2, -1]} color={accent2} speed={1.2} />}
        {full && <WireShape geometry="octa" position={[1.2, 3.1, -4]} color={accent} speed={1.6} />}
      </ParallaxLayer>

      <DeviceRig>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
          <Laptop animated={full} />
        </Float>
        <group position={[1.7, 0.5, 0.95]} rotation={[0, -0.45, 0.04]}>
          <Phone accent={accent} floating={full} />
        </group>
      </DeviceRig>
    </>
  );
}

export default function HeroScene({ tier, active, isDark }: HeroSceneProps) {
  const full = tier === 'full';

  return (
    <Canvas
      aria-hidden
      dpr={full ? [1, 1.75] : [1, 1.25]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.6, 7.2], fov: 40 }}
      gl={{ antialias: full, alpha: true, powerPreference: full ? 'high-performance' : 'low-power' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene tier={tier} isDark={isDark} />
    </Canvas>
  );
}
