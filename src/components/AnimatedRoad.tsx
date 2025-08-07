'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { DrawSVGPlugin } from '@/lib/gsap/DrawSVGPlugin.js';
import { MotionPathPlugin } from '@/lib/gsap/MotionPathPlugin.min.js';
import { ScrollTrigger } from '@/lib/gsap/ScrollTrigger.min.js';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

export default function AnimatedRoad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !carRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const car = carRef.current;

    // Use a timeline to sync animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // Animate the path drawing
    tl.fromTo(
      path,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 1, ease: 'none' },
      0
    );

    // Animate the car along the path
    tl.to(
      car,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration: 1,
        ease: 'none',
      },
      0
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
      <svg
        ref={svgRef}
        id="linesvg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -77.327 1509.71 6300"
        preserveAspectRatio="xMidYMax meet"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
        style={{ width: '100%', maxWidth: '1509.71px' }}
      >
        <style type="text/css">{`
            .st0{fill:none;stroke:#4a7ec2;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        `}</style>
        <path
          id="motionPath"
          ref={pathRef}
          className="st0"
          d="M 249.052 140.282 C 244.58 163.258 141.638 974.649 410.733 1231.39 C 757.328 1562.06 1408.95 1194.48 1403.32 1857.45 C 1399.36 2324.44 18.761 2227.88 22.583 2752.4 C 25.887 3205.66 1408.09 3114.83 1403.22 3512.01 C 1394.53 4222.6 81.675 4076.55 80.718 4512.32 C 79.013 5285.71 1411.56 5070.93 1411.64 5443.08 C 1411.77 6055.59 219.258 6075.13 219.258 6075.13"
        />
        <g id="motionSVG" ref={carRef}>
          <g id="svg171" transform="matrix(0.209605, 0, 0, 0.180553, 155.278305, 14.817842)">
            <path
              id="path184"
              fill="#4a7ec2"
              d="M 430.86 551.081 C 309.548 553.615 290.956 531.854 273.028 528.27 C 255.105 486.667 251.702 135.881 262.454 107.202 C 270.493 42.249 257.158 31.494 253.133 -46.79 C 245.473 -138.21 263.664 -87.377 248.371 -180.34 C 271.608 -277.14 227.841 -279.11 429.174 -288.31 C 613.936 -285.73 587.919 -277.13 611.147 -180.34 C 595.853 -87.375 614.045 -138.21 606.384 -46.789 C 602.36 31.49 589.025 42.245 597.063 107.203 C 607.816 135.878 604.414 486.663 586.49 528.271 C 558.43 544.528 484.072 551.082 430.846 551.082 L 430.86 551.081 L 430.86 551.081 Z"
              style={{ strokeWidth: '1.006' }}
            />
            <path
              id="path230"
              fill="#333333"
              d="M 279.012 -241.21 C 266.495 -221.18 267.407 -30.683 287.435 -15.663 C 306.779 -31.596 418.843 -46.397 440.151 -45.022 C 461.917 -46.622 547.111 -36.379 573.286 -20.67 C 580.343 -18.384 594.451 -241.2 574.423 -256.22 C 511.828 -273.76 304.041 -273.76 279.012 -241.21 L 279.012 -241.21 Z"
              style={{ strokeWidth: '1.006' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
