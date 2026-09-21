"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Floating 3D shapes for the hero background, ported from the iOS reference.
 * Renders only when the `.dark` class is active on <html>, pauses when the
 * hero scrolls out of view or the tab is hidden, and respects reduced motion.
 */
export default function HeroShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run in dark mode; the light theme keeps its clean look.
    if (!document.documentElement.classList.contains("dark")) return;

    const host = canvas.parentElement as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      canvas.style.display = "none";
      return;
    }
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const setSize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8899ff, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 6, 5);
    scene.add(key);
    const warm = new THREE.PointLight(0xff9ad5, 0.8, 40);
    warm.position.set(-6, -2, 4);
    scene.add(warm);
    const cool = new THREE.PointLight(0x6ea8ff, 0.8, 40);
    cool.position.set(6, 3, -2);
    scene.add(cool);

    const palette = [
      0x0a84ff, 0x5e5ce6, 0xbf5af2, 0xff375f, 0xff9f0a, 0x30d158, 0x5ac8fa, 0x64d2ff,
    ];
    const geo = (k: number): THREE.BufferGeometry => {
      if (k === 0) return new THREE.IcosahedronGeometry(1, 0);
      if (k === 1) return new THREE.SphereGeometry(1, 40, 40);
      if (k === 2) return new THREE.TorusGeometry(0.75, 0.3, 24, 60);
      if (k === 3) return new THREE.OctahedronGeometry(1, 0);
      if (k === 4) return new THREE.DodecahedronGeometry(1, 0);
      return new THREE.TorusKnotGeometry(0.6, 0.22, 90, 16);
    };

    const group = new THREE.Group();
    scene.add(group);

    interface MotionData {
      sp: number;
      ph: number;
      rx: number;
      ry: number;
      by: number;
    }
    const items: THREE.Mesh[] = [];
    const N = 9;
    for (let i = 0; i < N; i++) {
      const g = geo(i % 6);
      const m = new THREE.MeshPhysicalMaterial({
        color: palette[i % palette.length],
        metalness: 0.15,
        roughness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        reflectivity: 0.6,
      });
      const mesh = new THREE.Mesh(g, m);
      const s = 0.5 + Math.random() * 0.7;
      mesh.scale.setScalar(s);
      mesh.position.set(
        (Math.random() * 2 - 1) * 4.6,
        (Math.random() * 2 - 1) * 3.2,
        (Math.random() * 2 - 1) * 2.2 - 0.5
      );
      mesh.userData = {
        sp: 0.15 + Math.random() * 0.4,
        ph: Math.random() * 6.28,
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.012,
        by: mesh.position.y,
      } satisfies MotionData;
      group.add(mesh);
      items.push(mesh);
    }

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    let running = true;
    let req = 0;

    const frame = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      group.rotation.y = pointer.x * 0.5;
      group.rotation.x = pointer.y * 0.35;
      items.forEach((m) => {
        const d = m.userData as MotionData;
        m.rotation.x += d.rx;
        m.rotation.y += d.ry;
        m.position.y = d.by + Math.sin(t * d.sp + d.ph) * 0.28;
      });
      renderer.render(scene, camera);
      req = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!running) {
        running = true;
        frame();
      }
    };
    const stop = () => {
      running = false;
      if (req) cancelAnimationFrame(req);
    };

    if (reduce) {
      running = false;
      renderer.render(scene, camera);
    } else {
      frame();
    }

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);
    const onVis = () => {
      if (document.hidden) stop();
      else if (!reduce) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (reduce) return;
          if (en.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.02 }
    );
    io.observe(host);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      items.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-0 hidden dark:block pointer-events-none"
    />
  );
}
