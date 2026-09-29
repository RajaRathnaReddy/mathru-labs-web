'use client';

import { useState, useEffect } from 'react';

interface DeviceCapability {
  /** GPU tier: 0 = no WebGL, 1 = low, 2 = mid, 3 = high */
  gpuTier: number;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Network connection speed class */
  connectionSpeed: 'slow' | 'medium' | 'fast';
  /** Whether the device can handle 3D */
  canHandle3D: boolean;
  /** Whether device can handle animations */
  canHandleAnimations: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    gpuTier: 2,
    prefersReducedMotion: false,
    connectionSpeed: 'fast',
    canHandle3D: true,
    canHandleAnimations: true,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check connection speed
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast';
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    if (nav.connection) {
      const effectiveType = nav.connection.effectiveType;
      if (
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        nav.connection.saveData
      ) {
        connectionSpeed = 'slow';
      } else if (effectiveType === '3g') {
        connectionSpeed = 'medium';
      }
    }

    // Simple GPU check via WebGL
    let gpuTier = 2;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        gpuTier = 0;
      } else {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Basic heuristic for GPU tier
          if (
            renderer.includes('mali-4') ||
            renderer.includes('adreno 3') ||
            renderer.includes('sgx') ||
            renderer.includes('swiftshader')
          ) {
            gpuTier = 1;
          } else if (
            renderer.includes('mali-g') ||
            renderer.includes('adreno 6') ||
            renderer.includes('apple') ||
            renderer.includes('nvidia') ||
            renderer.includes('radeon')
          ) {
            gpuTier = 3;
          }
        }
      }
    } catch {
      gpuTier = 1;
    }

    // Check device memory (if available)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    if (deviceMemory && deviceMemory < 4) {
      gpuTier = Math.min(gpuTier, 1);
    }

    const canHandle3D =
      !prefersReducedMotion && gpuTier >= 2 && connectionSpeed !== 'slow';
    const canHandleAnimations = !prefersReducedMotion;

    setCapability({
      gpuTier,
      prefersReducedMotion,
      connectionSpeed,
      canHandle3D,
      canHandleAnimations,
    });
  }, []);

  return capability;
}
