'use client';

import { useMemo } from 'react';

// ── SVG Fallback for low-end devices ──
// Animated constellation of dots and lines — pure CSS animation, no JS overhead

interface NodeDef {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

interface EdgeDef {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

interface PulseDef {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  duration: number;
}

export function LivingWorkflowFallback() {
  const { nodes, edges, pulses } = useMemo(() => {
    // Outer perimeter positions leaving center 100% open for text clarity
    const nodePositions: [number, number][] = [
      [100, 110], // Left Top
      [90, 490],  // Left Bottom
      [240, 70],  // Top Left
      [700, 110], // Right Top
      [690, 490], // Right Bottom
      [60, 300],  // Far Left Mid
      [560, 70],  // Top Right
      [740, 300], // Far Right Mid
      [220, 530], // Bottom Left
      [600, 530], // Bottom Right
      [170, 70],  // Top Far Left
      [400, 540], // Bottom Center
    ];

    const BRAND_COLORS = [
      '#0066FF', '#00D26A', '#38BDF8', '#FF6600',
      '#FB923C', '#0066FF', '#00D26A', '#FF6600',
      '#00D26A', '#38BDF8', '#0066FF', '#FF6600',
    ];

    const edgePairs: [number, number][] = [
      [0, 5], [5, 1], [1, 8], [8, 11], [11, 9], [9, 4],
      [4, 7], [7, 3], [3, 6], [6, 2], [2, 10], [10, 0],
      [0, 2], [3, 6], [1, 8], [4, 9], [5, 10], [7, 6],
    ];

    const nodes = nodePositions.map(([cx, cy], i) => ({
      cx,
      cy,
      r: 4.5,
      color: BRAND_COLORS[i % BRAND_COLORS.length],
      delay: i * 0.15,
    }));

    const edges: EdgeDef[] = edgePairs.map(([from, to], i) => ({
      x1: nodePositions[from][0],
      y1: nodePositions[from][1],
      x2: nodePositions[to][0],
      y2: nodePositions[to][1],
      delay: i * 0.08,
    }));

    // Create animated pulses along some edges
    const pulseEdges = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const pulses: PulseDef[] = pulseEdges.map((edgeIdx, i) => {
      const [from, to] = edgePairs[edgeIdx];
      return {
        x1: nodePositions[from][0],
        y1: nodePositions[from][1],
        x2: nodePositions[to][0],
        y2: nodePositions[to][1],
        delay: i * 0.4,
        duration: 2 + Math.random(),
      };
    });

    return { nodes, edges, pulses };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 600"
        className="h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse glow */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for background */}
          <radialGradient id="bgGlow" cx="50%" cy="45%" r="40%">
            <stop offset="0%" stopColor="#F5A524" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#070A12" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle background glow */}
        <rect width="800" height="600" fill="url(#bgGlow)" />

        {/* Connection lines */}
        <g className="svg-edges">
          {edges.map((edge, i) => (
            <line
              key={`edge-${i}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="#1E2538"
              strokeWidth="1"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0;0.6"
                dur="0.8s"
                begin={`${edge.delay}s`}
                fill="freeze"
              />
            </line>
          ))}
        </g>

        {/* Flowing data pulses */}
        <g className="svg-pulses">
          {pulses.map((pulse, i) => (
            <circle
              key={`pulse-${i}`}
              cx={pulse.x1}
              cy={pulse.y1}
              r="3"
              fill="#2DD4BF"
              filter="url(#pulseGlow)"
              opacity="0"
            >
              <animateMotion
                dur={`${pulse.duration}s`}
                begin={`${pulse.delay}s`}
                repeatCount="indefinite"
                path={`M${pulse.x1},${pulse.y1} L${pulse.x2},${pulse.y2}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0.8;0"
                keyTimes="0;0.1;0.9;1"
                dur={`${pulse.duration}s`}
                begin={`${pulse.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="2;4;2"
                dur={`${pulse.duration}s`}
                begin={`${pulse.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Nodes */}
        <g className="svg-nodes" filter="url(#glow)">
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {/* Outer glow ring */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.2}
                fill="none"
                stroke={node.color}
                strokeWidth="0.5"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.2;0.1;0.2"
                  dur="4s"
                  begin={`${node.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values={`${node.r * 1.8};${node.r * 2.5};${node.r * 1.8}`}
                  dur="4s"
                  begin={`${node.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Core node */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={node.color}
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.8"
                  dur="0.6s"
                  begin={`${node.delay}s`}
                  fill="freeze"
                />
                <animate
                  attributeName="r"
                  values={`${node.r * 0.9};${node.r * 1.1};${node.r * 0.9}`}
                  dur="3s"
                  begin={`${node.delay + 0.6}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
