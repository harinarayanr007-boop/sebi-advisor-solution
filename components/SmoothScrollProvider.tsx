"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ensure documentElement has lenis classes immediately
    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Initialize Lenis Smooth Scroll with luxury inertial physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Global smooth anchor navigation across all SEBI advisor and platform pages
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const currentPath = window.location.pathname;
      const isSamePageHash =
        href.startsWith("#") ||
        (href.startsWith("/#") && currentPath === "/") ||
        (currentPath !== "/" && href.startsWith(currentPath + "#"));

      if (isSamePageHash) {
        const hash = href.includes("#") ? "#" + href.split("#")[1] : null;
        if (hash && hash.length > 1) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            e.preventDefault();
            e.stopPropagation();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -85,
              duration: 1.2,
            });
            if (window.history.pushState) {
              window.history.pushState(null, "", hash);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      if (typeof window !== "undefined" && (window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
