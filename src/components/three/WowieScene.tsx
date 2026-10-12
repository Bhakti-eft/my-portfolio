import { useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Wowie — the IoT smart dustbin, built entirely from primitives.
 * It patrols left/right on spinning wheels, "pings" with its ultrasonic sensors,
 * opens its gesture-controlled lid, and shows a live fill-level gauge.
 */

interface WowieSceneProps {
  active: boolean;
  isDark: boolean;
}

const BIN = '#4b5d78';
const TRIM = '#1e293b';

function Wheel({ position }: { position: THREE.Vector3Tuple }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    // Distance travelled / wheel radius, so the wheels roll rather than slide.
    if (ref.current) ref.current.rotation.y = (Math.sin(clock.elapsedTime * 0.6) * 0.6) / 0.2;
  });
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.2, 0.2, 0.12, 7]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

function Wowie({ accent }: { accent: string }) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const ping = useRef<THREE.Mesh>(null);
  const led = useRef<THREE.MeshBasicMaterial>(null);
  const fill = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Patrol back and forth, turning slightly in the direction of travel.
    if (root.current) {
      root.current.position.x = Math.sin(t * 0.6) * 0.6;
      root.current.rotation.y = Math.cos(t * 0.6) * 0.25;
    }

    // Lid opens for ~1.5 s every 5 s, as if a hand gesture was detected.
    if (lid.current) {
      const phase = t % 5;
      const open = phase > 3 && phase < 4.5 ? Math.sin(((phase - 3) / 1.5) * Math.PI) : 0;
      lid.current.rotation.x = -open * 1.1;
    }

    // Ultrasonic ping: an expanding, fading ring.
    if (ping.current) {
      const p = (t * 0.8) % 1;
      ping.current.scale.setScalar(0.2 + p * 2.2);
      (ping.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.5;
    }

    if (led.current) led.current.opacity = Math.sin(t * 4) > 0 ? 1 : 0.25;

    // Fill level slowly rises and empties.
    if (fill.current) {
      const level = 0.25 + ((Math.sin(t * 0.3) + 1) / 2) * 0.65;
      fill.current.scale.y = level;
      fill.current.position.y = -0.55 + level * 0.55;
    }
  });

  return (
    <group ref={root}>
      {/* Body (slightly tapered) */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.72, 0.62, 1.5, 28, 1, true]} />
        <meshStandardMaterial color={BIN} metalness={0.4} roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.02, 28]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      {/* Accent band */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.705, 0.7, 0.08, 28]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>

      {/* Lid hinged at the back */}
      <group position={[0, 1.6, -0.72]}>
        <group ref={lid}>
          <mesh position={[0, 0.04, 0.72]}>
            <cylinderGeometry args={[0.76, 0.76, 0.08, 28]} />
            <meshStandardMaterial color={TRIM} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* IR gesture sensor on the lid */}
          <mesh position={[0, 0.1, 1.15]}>
            <boxGeometry args={[0.22, 0.05, 0.12]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
        </group>
      </group>

      {/* Ultrasonic sensor "eyes" */}
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 18]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
      <mesh ref={ping} position={[0, 0.95, 0.8]}>
        <torusGeometry args={[0.35, 0.012, 6, 40]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} />
      </mesh>

      {/* ESP32 board + status LED */}
      <mesh position={[0.5, 0.55, 0.42]} rotation={[0, 0.7, 0]}>
        <boxGeometry args={[0.28, 0.4, 0.03]} />
        <meshStandardMaterial color="#0f3d3a" />
      </mesh>
      <mesh position={[0.52, 0.7, 0.45]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial ref={led} color={accent} transparent />
      </mesh>

      {/* Fill-level gauge (visible through a window on the side) */}
      <group position={[-0.62, 0.9, 0.25]} rotation={[0, -1.2, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 1.15, 0.03]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh ref={fill} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.1, 1.1, 0.02]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>

      {/* Wheels */}
      <Wheel position={[-0.5, 0.2, 0.35]} />
      <Wheel position={[0.5, 0.2, 0.35]} />
      <Wheel position={[-0.5, 0.2, -0.35]} />
      <Wheel position={[0.5, 0.2, -0.35]} />
    </group>
  );
}

/** Frames the bin: camera aimed at its centre, pulled back on narrow panels so it always fits. */
function CameraRig() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const narrow = size.width / size.height < 1;
    camera.position.set(2.4, 2.3, narrow ? 7.2 : 5.8);
    camera.lookAt(0, 0.75, 0);
  }, [camera, size.width, size.height]);
  return null;
}

export default function WowieScene({ active, isDark }: WowieSceneProps) {
  const accent = isDark ? '#2dd4bf' : '#0d9488';

  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [2.4, 2.3, 5.8], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraRig />
      <ambientLight intensity={isDark ? 0.6 : 1} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <pointLight position={[-2, 2, 2]} color={accent} intensity={3} distance={6} />

      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        polar={[-0.1, 0.25]}
        azimuth={[-0.8, 0.8]}
      >
        <group position={[0, -0.2, 0]}>
          <Wowie accent={accent} />
          {/* Floor + soft shadow disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[2.2, 48]} />
            <meshBasicMaterial color={accent} transparent opacity={0.06} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <ringGeometry args={[1.9, 1.93, 64]} />
            <meshBasicMaterial color={accent} transparent opacity={0.3} />
          </mesh>
        </group>
      </PresentationControls>
    </Canvas>
  );
}
