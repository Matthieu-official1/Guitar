import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TuningDialProps {
  cents: number;
  note: string;
  frequency: number;
}

const TuningDial: React.FC<TuningDialProps> = ({ cents, note, frequency }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 200;
    const margin = 20;
    
    const scale = d3.scaleLinear()
      .domain([-50, 50])
      .range([0, width - 2 * margin]);

    // Create gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "dial-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ef4444");
    gradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#22c55e");
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ef4444");

    // Draw the main dial
    const g = svg.append("g")
      .attr("transform", `translate(${margin},${height/2})`);

    // Background bar
    g.append("rect")
      .attr("x", 0)
      .attr("y", -10)
      .attr("width", width - 2 * margin)
      .attr("height", 20)
      .attr("rx", 10)
      .attr("fill", "url(#dial-gradient)");

    // Center marker
    g.append("rect")
      .attr("x", (width - 2 * margin) / 2 - 2)
      .attr("y", -30)
      .attr("width", 4)
      .attr("height", 60)
      .attr("fill", "#1a1a1a");

    // Needle
    const needleX = scale(Math.max(-50, Math.min(50, cents)));
    g.append("path")
      .attr("d", `M${needleX},0 L${needleX-10},-40 L${needleX+10},-40 Z`)
      .attr("fill", Math.abs(cents) < 5 ? "#22c55e" : "#ef4444");

    // Tick marks
    [-40, -30, -20, -10, 0, 10, 20, 30, 40].forEach(tick => {
      g.append("line")
        .attr("x1", scale(tick))
        .attr("x2", scale(tick))
        .attr("y1", -15)
        .attr("y2", 15)
        .attr("stroke", "#1a1a1a")
        .attr("stroke-width", tick === 0 ? 2 : 1);
    });

  }, [cents]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width="300" height="200" className="mb-4"></svg>
      <div className="text-4xl font-bold mb-2">{note}</div>
      <div className="text-xl text-gray-600">{frequency.toFixed(1)} Hz</div>
      <div className="text-lg text-gray-500">{cents.toFixed(1)} cents</div>
    </div>
  );
};

export default TuningDial;