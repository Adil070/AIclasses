"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

/** Default placeholder shown while a heavy section's code loads. */
export function SectionPlaceholder({ minHeight = 320 }: { minHeight?: number }) {
  return (
    <div
      className="section-y"
      aria-hidden="true"
      style={{ minHeight }}
    >
      <div className="section">
        <div className="animate-pulse rounded-3xl bg-ink/[0.04]" style={{ height: minHeight - 80 }} />
      </div>
    </div>
  );
}

/**
 * Loads a component that depends on a Heavy_Library only once the wrapper
 * scrolls near the viewport, keeping the heavy code out of the initial bundle.
 * The `load` function should be a dynamic `import()` returning the component as
 * its default export. A placeholder renders until the module resolves; if the
 * import fails the placeholder stays in place rather than crashing the page.
 *
 * @example
 * <LazySection
 *   load={() => import("@/components/interactive/HeavyThreeScene")}
 *   placeholder={<SectionPlaceholder />}
 * />
 */
export function LazySection<P extends object>({
  load,
  componentProps,
  placeholder = <SectionPlaceholder />,
  rootMargin = "200px",
}: {
  load: () => Promise<{ default: ComponentType<P> }>;
  componentProps?: P;
  placeholder?: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!visible || Component) return;
    let cancelled = false;
    load()
      .then((mod) => {
        if (!cancelled) setComponent(() => mod.default);
      })
      .catch(() => {
        // Leave the placeholder in place on failure.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div ref={ref}>
      {Component ? <Component {...(componentProps as P)} /> : placeholder}
    </div>
  );
}
