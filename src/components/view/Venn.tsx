"use client";

import * as React from "react";
import { VennEntry, VennSegment, VennState } from "../../types";
import { darken } from "color2k";
const COLORS = ["#228B22", "#87CEEB", "#FFD700", "#8B4513", "#FF6B6B", "#708090"];

export interface VennProps {
  state: VennState;
}

export function Venn({ state }: VennProps) {
  const [dim, setDim] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect();
      let dim = Math.min(rect.width, rect.height);
      setDim(dim);
    }
  }, []);

  const segments = React.useMemo(() => {
    if (dim === 0) return null;
    return createSegments(state.entries, dim);
  }, [dim, state]);

  return (
    <div className="venn-container" ref={ref}>
      {dim > 0 && (
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
          <text id="svg-diagram-title" x="50%" y="44" fontSize="32" fontWeight="bold" fill="#000" textAnchor="middle">
            {state.title}
          </text>
          <g id="segments-group">
            {segments.map((segment, n) => (
              <ellipse
                key={`segment-shape-${n}`}
                cx={segment.cx}
                cy={segment.cy}
                rx={segment.rx}
                ry={segment.ry}
                transform={segment.transform}
                fill={segment.fillColor}
                fillOpacity=".6"
                stroke={segment.strokeColor}
                strokeWidth="2"
              ></ellipse>
            ))}
          </g>

          <g id="segment-labels-group">
            <text id="intersection-label" x="50%" y="50%" fontSize="24" fontWeight="bold" textAnchor="middle">
              {state.conclusion}
            </text>

            {segments.map((segment, n) => (
              <text
                key={`segment-text-${n}`}
                x={segment.textX}
                y={segment.textY}
                transform={segment.transform}
                fontSize="20"
                textAnchor="middle"
              >
                {segment.title}
              </text>
            ))}
            <g></g>
          </g>
        </svg>
      )}
    </div>
  );
}

// Code by: Taras Novak
// Taken from:  https://observablehq.com/@randomfractals/venn-diagram-generator

function createSegments(entries: VennEntry[], width: number, radius: number = 100) {
  // loop through diagram segments and create svg view segments for display
  let segments: VennSegment[] = [];

  for (let i = 0; i < entries.length; i++) {
    // create new segment segment
    const segment = {
      title: entries[i].title,
      strokeColor: darken(COLORS[i], 0.1),
      fillColor: COLORS[i],
      cx: 0,
      cy: 0,
      textX: 0,
      textY: 0,
      rx: 0,
      ry: 0,
      rotateAngle: 0,
      transform: ""
    };
    segments.push(segment);

    // calculate segment element placement angle
    // note: for semi-circle use (i/diagram.segments.length)
    const angle = (i / (entries.length / 2)) * Math.PI - Math.PI / 2; // start at 90

    // calculate x and y position of the segment element
    segment.cx = radius * Math.cos(angle) + width / 2;
    segment.cy = radius * Math.sin(angle) + width / 2;

    // calculate segment text label position offset
    segment.textX = (radius + 70) * Math.cos(angle) + width / 2;
    segment.textY = (radius + 70) * Math.sin(angle) + width / 2;

    // adjust segment radius for diagram intersection overlap
    segment.rx = radius + 40;
    segment.ry = radius + 40;
    segment.rotateAngle = 0;

    segment.transform = "rotate(" + segment.rotateAngle + " " + segment.cx + " " + segment.cy + ")";
  }

  return segments;
}
