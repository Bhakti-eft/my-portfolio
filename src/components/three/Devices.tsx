import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { CODE_LENGTH, drawCode, makePhoneTexture } from './textures';

const BODY = '#1e293b';
const BODY_DARK = '#0f172a';

/** Laptop screen texture that types out code in a loop. */
function useCodeTexture(animated: boolean) {
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 480;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { canvas, texture };
  }, []);

  const state = useRef({ chars: animated ? 0 : CODE_LENGTH, last: 0 });

  useEffect(() => {
    drawCode(canvas, state.current.chars, true);
    texture.needsUpdate = true;
    return () => texture.dispose();
  }, [canvas, texture]);

  useFrame(({ clock }) => {
    if (!animated) return;
    const t = clock.elapsedTime;
    // ~16 redraws/sec keeps the typing smooth without hammering texture uploads.
    if (t - state.current.last < 0.06) return;
    state.current.last = t;
    state.current.chars += 2;
    if (state.current.chars > CODE_LENGTH + 80) state.current.chars = 0;
    drawCode(canvas, state.current.chars, Math.floor(t * 2) % 2 === 0);
    texture.needsUpdate = true;
  });

  return texture;
}

export function Laptop({ animated }: { animated: boolean }) {
  const screen = useCodeTexture(animated);

  return (
    <group>
      {/* Base */}
      <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={2}>
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* Keyboard deck & trackpad */}
      <mesh position={[0, 0.065, -0.25]}>
        <boxGeometry args={[2.8, 0.01, 1.1]} />
        <meshStandardMaterial color={BODY_DARK} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.065, 0.65]}>
        <boxGeometry args={[0.95, 0.01, 0.55]} />
        <meshStandardMaterial color="#26344d" roughness={0.5} />
      </mesh>

      {/* Lid, hinged at the back edge */}
      <group position={[0, 0.06, -1.02]} rotation={[-0.26, 0, 0]}>
        <RoundedBox args={[3.2, 2.05, 0.08]} radius={0.05} smoothness={2} position={[0, 1.02, 0]}>
          <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 1.02, 0.045]}>
          <planeGeometry args={[3.0, 1.87]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function Phone({ accent, floating }: { accent: string; floating: boolean }) {
  const texture = useMemo(() => makePhoneTexture(accent), [accent]);
  useEffect(() => () => texture.dispose(), [texture]);

  const body = (
    <group>
      <RoundedBox args={[0.95, 1.9, 0.1]} radius={0.09} smoothness={3}>
        <meshStandardMaterial color={BODY_DARK} metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.84, 1.76]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );

  return floating ? (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      {body}
    </Float>
  ) : (
    body
  );
}
