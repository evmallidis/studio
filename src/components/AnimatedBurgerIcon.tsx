
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from "gsap";

export default function AnimatedBurgerIcon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const topBarRef = useRef<SVGPathElement>(null);
  const middleBarRef = useRef<SVGPathElement>(null);
  const bottomBarRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (topBarRef.current && middleBarRef.current && bottomBarRef.current) {
      console.log("dfwdfwef")
      gsap.set([topBarRef.current, middleBarRef.current, bottomBarRef.current], {
        transformOrigin: '50% 50%',
      });
      
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      tl.to(topBarRef.current, { 
          y: -1.5,
          duration: 1.5, 
          ease: 'sine.inOut' 
        }, 0)
        .to(bottomBarRef.current, { 
          y: 1.5,
          duration: 1.5,
          ease: 'sine.inOut'
        }, 0);
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <path
        ref={topBarRef}
        d="M5 6H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={middleBarRef}
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={bottomBarRef}
        d="M5 18H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
