import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeGlyphTexture } from './textures';

const GLYPHS = ['{', '}', '<', '/>', ';', '()', '=>', '[]'];

interface GlyphFieldProps {
  glyph: string;
  count: number;
  color: string;
  spread: THREE.Vector3Tuple;
}

function GlyphField({ glyph, count, color, spread }: GlyphFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const texture = useMemo(() => makeGlyphTexture(glyph), [glyph]);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    return { positions, speeds };
  }, [count, spread]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_, dt) => {
    const points = ref.current;
    if (!points) return;
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const half = spread[1] / 2;
    const step = Math.min(dt, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * step;
      if (arr[i * 3 + 1] > half) arr[i * 3 + 1] = -half;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={0.32}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        alphaTest={0.01}
      />
    </points>
  );
}

/** Code-symbol particles drifting upward through the scene. */
export function CodeParticles({ total, color }: { total: number; color: string }) {
  const perGlyph = Math.max(4, Math.round(total / GLYPHS.length));
  const spread = useMemo<THREE.Vector3Tuple>(() => [16, 10, 8], []);

  return (
    <group>
      {GLYPHS.map((g) => (
        <GlyphField key={g} glyph={g} count={perGlyph} color={color} spread={spread} />
      ))}
    </group>
  );
}
