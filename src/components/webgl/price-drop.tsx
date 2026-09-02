"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Motor Zone's signature piece: the drop.
 *
 * They are the only dealership in this series who names a price, and the only
 * one who publishes a discount with the old figure still visible: SEAT Leon,
 * 1,600,000 struck through, 1,500,000 beside it. So the hero is that number,
 * and it physically falls.
 *
 * Each digit is an independent piece of type standing on a floor. Digits that
 * differ between the two figures are cut loose and dropped — they fall under
 * gravity, bounce once with real restitution, swap glyph at the moment of
 * impact, and settle showing the new value. Digits that are the same in both
 * never move, which is what makes the change legible rather than decorative.
 *
 * Each digit owns its own physics in refs. Holding the state in a shared
 * memoised array and mutating it from the frame loop is exactly what the
 * React Compiler rules forbid.
 *
 * Type is drei's SDF `Text` with a font served from this site rather than a
 * CDN, so nothing is fetched from a third party at runtime.
 */

const GRAVITY = -26;
const RESTITUTION = 0.32;
const START_HEIGHT = 2.6;

function Digit({
  ch,
  next,
  changes,
  x,
  color,
  accent,
  trigger,
}: {
  ch: string;
  next: string;
  changes: boolean;
  x: number;
  color: string;
  accent: string;
  trigger: number;
}) {
  const group = useRef<THREE.Group>(null!);
  const oldGlyph = useRef<THREE.Object3D>(null!);
  const newGlyph = useRef<THREE.Object3D>(null!);
  const y = useRef(changes ? START_HEIGHT : 0);
  const v = useRef(0);
  const landed = useRef(!changes);
  const armedFor = useRef(trigger);

  // Both glyphs are mounted and the frame loop toggles which is visible, so
  // the swap needs no state and therefore no setState inside an effect.
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    // Re-arm when the trigger changes, without an effect.
    if (changes && armedFor.current !== trigger) {
      armedFor.current = trigger;
      y.current = START_HEIGHT;
      v.current = 0;
      landed.current = false;
    }

    if (changes && !landed.current) {
      const dt = Math.min(delta, 0.032);
      v.current += GRAVITY * dt;
      y.current += v.current * dt;

      if (y.current <= 0) {
        y.current = 0;
        if (Math.abs(v.current) > 0.9) {
          v.current = -v.current * RESTITUTION;
        } else {
          v.current = 0;
          landed.current = true;
        }
      }
      g.position.y = y.current;
    }

    // The new figure arrives with the landing, not in mid-air.
    const showNew = changes ? y.current <= 0.001 : false;
    if (oldGlyph.current) oldGlyph.current.visible = !showNew;
    if (newGlyph.current) newGlyph.current.visible = showNew;
  });

  return (
    <group ref={group} position={[x, changes ? START_HEIGHT : 0, 0]}>
      <Text
        ref={oldGlyph}
        font="/fonts/archivo-bold.ttf"
        fontSize={1}
        anchorX="center"
        anchorY="bottom"
        color={changes ? accent : color}
      >
        {ch}
      </Text>
      {changes && (
        <Text
          ref={newGlyph}
          font="/fonts/archivo-bold.ttf"
          fontSize={1}
          anchorX="center"
          anchorY="bottom"
          color={accent}
          visible={false}
        >
          {next}
        </Text>
      )}
    </group>
  );
}

function Scene({
  from,
  to,
  color,
  accent,
  trigger,
}: {
  from: string;
  to: string;
  color: string;
  accent: string;
  trigger: number;
}) {
  // Both figures are the same length here (1,600,000 → 1,500,000), which is
  // what lets the change be read digit by digit.
  const digits = useMemo(
    () =>
      from.split("").map((ch, i) => {
        const next = to[i] ?? ch;
        return { ch, next, changes: ch !== next };
      }),
    [from, to],
  );

  const advance = 0.62;
  const width = (digits.length - 1) * advance;

  return (
    <>
      {digits.map((d, i) => (
        <Digit
          key={i}
          ch={d.ch}
          next={d.next}
          changes={d.changes}
          x={i * advance - width / 2}
          color={color}
          accent={accent}
          trigger={trigger}
        />
      ))}
      {/* The line the digits land on. */}
      <mesh position={[0, -0.03, -0.2]}>
        <planeGeometry args={[width + 1.6, 0.03]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
    </>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function PriceDrop({
  from,
  to,
  alt,
  className,
  color = "#f4f2ef",
  accent = "#ff3d44",
}: {
  from: string;
  to: string;
  alt: string;
  className?: string;
  color?: string;
  accent?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Without WebGL, or under reduced motion, the two figures are simply set as
  // type — which is exactly how they publish them.
  if (lost || reduced || supported !== true) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <span className="latin tnum text-[clamp(1.1rem,3vw,1.8rem)] text-chalk-2 line-through">
          {from}
        </span>
        <span className="latin tnum font-display text-[clamp(2rem,7vw,4.5rem)] font-bold text-offer">
          {to}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTrigger((t) => t + 1)}
      className={className}
      aria-label={alt}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0.75, 5.4], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, camera }) => {
          bind(gl.domElement);
          camera.lookAt(0, 0.5, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene from={from} to={to} color={color} accent={accent} trigger={trigger} />
        </Suspense>
      </Canvas>
    </button>
  );
}
