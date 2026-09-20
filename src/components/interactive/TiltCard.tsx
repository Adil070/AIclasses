"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { computeTilt } from "@/lib/interactive/tilt";

/**
 * Wraps content in a card that tilts in 3D toward the pointer/touch position.
 * Rotation is clamped to `maxDeg` and reset on leave. Disabled (no rotation)
 * when reduced motion is preferred.
 */
export function TiltCard({
  children,
  className,
  maxDeg = 8,
}: {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  function handleMove(clientX: number, clientY: number) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Normalize pointer position to [-1, 1] relative to card center.
    const offsetX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const offsetY = ((clientY - rect.top) / rect.height) * 2 - 1;
    setTilt(computeTilt(offsetX, offsetY, maxDeg));
  }

  function reset() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <div
      ref={ref}
      onPointerMove={(e) => handleMove(e.clientX, e.clientY)}
      onPointerLeave={reset}
      className={className}
      style={{
        transform: prefersReduced
          ? undefined
          : `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 150ms ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
