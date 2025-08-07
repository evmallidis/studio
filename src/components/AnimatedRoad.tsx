'use client';

import { useEffect, useRef } from 'react';
import { gsap, DrawSVGPlugin, MotionPathPlugin, ScrollTrigger } from '@/lib/gsap';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

export default function AnimatedRoad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const parkingLinesRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !carRef.current || !pathRef.current || !parkingLinesRef.current) return;

    const path = pathRef.current;
    const car = carRef.current;
    const parkingLines = parkingLinesRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    tl.fromTo(
      path,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 1, ease: 'none' },
      0
    ).fromTo(
      parkingLines,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 1, ease: 'none' },
      0
    );

    tl.to(
      car,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
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
        <defs>
              <radialGradient id="path184_1_" cx="669.6125" cy="537.1904" r="548.8004"
                              gradientTransform="matrix(0.705974, 0, 0, -1.204119, -39.78417, 758.64595)"
                              gradientUnits="userSpaceOnUse">
                  <stop offset="0" style={{stopColor:"#1F1F1F"}}/>
                  <stop offset="1" style={{stopColor:"#000000"}}/>
              </radialGradient>
              <radialGradient id="path272_1_" cx="917.0979" cy="694.1172" r="15.8491"
                              gradientTransform="matrix(0.419379, 0, 0, -3.898246, -137.227134, 2841.518634)"
                              gradientUnits="userSpaceOnUse">
                  <stop offset="0" style={{stopColor:"#FFFFFF"}}/>
                  <stop offset="1" style={{stopColor:"#696969"}}/>
              </radialGradient>
              <radialGradient id="path274_1_" cx="877.6614" cy="694.1172" r="15.8491"
                              gradientTransform="matrix(-0.419379, 0, 0, -3.898246, 985.541809, 2836.154893)"
                              gradientUnits="userSpaceOnUse">
                  <stop offset="0" style={{stopColor:"#FFFFFF"}}/>
                  <stop offset="1" style={{stopColor:"#696969"}}/>
              </radialGradient>
              <radialGradient id="path275_1_" cx="299.6829" cy="273.77" r="91.231"
                              gradientTransform="matrix(1.61374, 0, 0, -0.796106, -52.678698, 248.122632)"
                              gradientUnits="userSpaceOnUse">
                  <stop offset="0" style={{stopColor:"#FFFFFF"}}/>
                  <stop offset="1" style={{stopColor:"#696969"}}/>
              </radialGradient>
              <radialGradient id="path270_1_" cx="396.345" cy="32.5439" r="128.2708"
                              gradientTransform="matrix(1.254516, 0, 0, -0.828397, -62.349365, 418.176363)"
                              gradientUnits="userSpaceOnUse">
                  <stop offset="0" style={{stopColor:"#FFFFFF"}}/>
                  <stop offset="0.2095" style={{stopColor:"#DADADA"}}/>
                  <stop offset="0.5821" style={{stopColor:"#9D9D9D"}}/>
                  <stop offset="0.8562" style={{stopColor:"#777777"}}/>
                  <stop offset="1" style={{stopColor:"#696969"}}/>
              </radialGradient>
        </defs>
        <style type="text/css">{`
            .st0{fill:none;stroke:#4a7ec2;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            .st1{fill:none;stroke:hsl(var(--border));stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:15,45;}
        `}</style>
        <path
          id="parkingLines"
          ref={parkingLinesRef}
          className="st1"
          d="M 289.052 140.282 C 284.58 163.258 181.638 974.649 450.733 1231.39 C 797.328 1562.06 1448.95 1194.48 1443.32 1857.45 C 1439.36 2324.44 58.761 2227.88 62.583 2752.4 C 65.887 3205.66 1448.09 3114.83 1443.22 3512.01 C 1434.53 4222.6 121.675 4076.55 120.718 4512.32 C 119.013 5285.71 1451.56 5070.93 1451.64 5443.08 C 1451.77 6055.59 259.258 6075.13 259.258 6075.13"
        />
        <path
          id="motionPath"
          ref={pathRef}
          className="st0"
          d="M 249.052 140.282 C 244.58 163.258 141.638 974.649 410.733 1231.39 C 757.328 1562.06 1408.95 1194.48 1403.32 1857.45 C 1399.36 2324.44 18.761 2227.88 22.583 2752.4 C 25.887 3205.66 1408.09 3114.83 1403.22 3512.01 C 1394.53 4222.6 81.675 4076.55 80.718 4512.32 C 79.013 5285.71 1411.56 5070.93 1411.64 5443.08 C 1411.77 6055.59 219.258 6075.13 219.258 6075.13"
        />
        <g id="motionSVG" ref={carRef}>
          <g transform="matrix(0.209605, 0, 0, 0.180553, 155.278305, 14.817842)">
            <path fill="#60585A" d="M 265.787 379.482 L 277.165 379.482 C 282.252 379.482 286.376 383.606 286.376 388.693 L 286.376 454.703 C 286.376 459.791 282.251 463.913 277.165 463.913 L 265.787 463.913 C 260.7 463.913 256.576 459.79 256.576 454.703 L 256.576 388.693 C 256.576 383.606 260.7 379.482 265.787 379.482 Z" strokeWidth="1.006"></path>
            <path fill="#60585A" d="M 582.293 368.753 L 593.671 368.753 C 598.758 368.753 602.882 372.877 602.882 377.963 L 602.882 443.974 C 602.882 449.061 598.757 453.185 593.671 453.185 L 582.293 453.185 C 577.205 453.185 573.083 449.06 573.083 443.974 L 573.083 377.963 C 573.083 372.877 577.205 368.753 582.293 368.753 Z" strokeWidth="1.006"></path>
            <path fill="url(#path184_1_)" stroke="#000000" d="M 430.86 551.081 C 309.548 553.615 290.956 531.854 273.028 528.27 C 255.105 486.667 251.702 135.881 262.454 107.202 C 270.493 42.249 257.158 31.494 253.133 -46.79 C 245.473 -138.21 263.664 -87.377 248.371 -180.34 C 271.608 -277.14 227.841 -279.11 429.174 -288.31 C 613.936 -285.73 587.919 -277.13 611.147 -180.34 C 595.853 -87.375 614.045 -138.21 606.384 -46.789 C 602.36 31.49 589.025 42.245 597.063 107.203 C 607.816 135.878 604.414 486.663 586.49 528.271 C 558.43 544.528 484.072 551.082 430.846 551.082 L 430.86 551.081 L 430.86 551.081 Z" strokeWidth="1.006"></path>
            <path fill="url(#path272_1_)" d="M 283.667 13.455 L 306.77 101.906 C 306.77 101.906 306.77 267.754 303.471 270.511 C 300.169 273.274 273.766 320.263 273.766 320.263 C 273.766 320.263 280.367 18.985 283.669 13.449 L 283.667 13.455 Z" strokeWidth="1.006"></path>
            <path fill="url(#path274_1_)" d="M 581.181 8.09 L 558.078 96.541 C 558.078 96.541 558.078 262.39 561.377 265.146 C 564.679 267.91 591.081 314.898 591.081 314.898 C 591.081 314.898 584.481 13.62 581.179 8.084 L 581.181 8.09 Z" strokeWidth="1.006"></path>
            <path fill="#333333" stroke="#000000" strokeOpacity="0.4591" d="M 279.012 -241.21 C 266.495 -221.18 267.407 -30.683 287.435 -15.663 C 306.779 -31.596 418.843 -46.397 440.151 -45.022 C 461.917 -46.622 547.111 -36.379 573.286 -20.67 C 580.343 -18.384 594.451 -241.2 574.423 -256.22 C 511.828 -273.76 304.041 -273.76 279.012 -241.21 L 279.012 -241.21 Z" strokeWidth="1.006"></path>
            <path fill="url(#path275_1_)" d="M 283.91 -12.82 C 283.91 -12.82 354.218 -41.678 432.655 -42.415 C 503.287 -43.103 535.187 -32.091 578.151 -15.572 C 572.943 36.737 567.735 86.291 554.715 102.81 C 434.938 72.523 427.128 72.523 307.351 102.81 C 304.743 86.299 281.308 -10.068 283.912 -12.815 L 283.91 -12.82 Z" strokeWidth="1.006"></path>
            <path opacity="0.62" fillOpacity="0.7044" stroke="#000000" d="M 287.93 -9.805 C 287.93 -9.805 356.361 -36.372 432.717 -37.051 C 501.465 -37.684 532.513 -27.546 574.337 -12.339 C 569.269 35.817 564.2 81.437 551.526 96.645 C 434.936 68.765 427.34 68.766 310.749 96.646 C 308.214 81.439 285.404 -7.269 287.937 -9.804 L 287.93 -9.805 Z" strokeWidth="1.006"></path>
            <path fill="url(#path270_1_)" d="M 320.316 281.195 C 307.046 344.89 296.431 466.976 296.431 466.976 C 317.663 485.555 426.476 493.517 429.137 493.517 C 437.099 493.517 545.91 485.555 564.493 459.015 C 564.493 443.091 553.876 328.97 543.26 278.544 C 450.371 291.813 325.636 286.506 320.325 281.198 L 320.316 281.195 Z" strokeWidth="1.006"></path>
            <path opacity="0.62" fillOpacity="0.7862" stroke="#000000" d="M 325.948 286.731 C 313.274 347.558 303.137 464.144 303.137 464.144 C 323.413 481.885 427.323 489.488 429.866 489.488 C 437.47 489.488 541.381 481.884 559.127 456.54 C 559.127 441.333 548.988 332.352 538.851 284.191 C 450.143 296.863 331.022 291.795 325.947 286.726 L 325.947 286.731 L 325.948 286.731 Z" strokeWidth="1.006"></path>
            <path fill="#333333" stroke="#000000" strokeOpacity="0.4591" d="M 584.465 10.461 L 614.879 12.996 C 614.879 12.996 630.087 28.203 619.949 35.807 C 609.81 43.411 584.465 33.273 584.465 33.273 L 584.465 10.461 Z" strokeWidth="1.006"></path>
            <path fill="#333333" stroke="#000000" strokeOpacity="0.4591" d="M 278.742 15.536 L 248.327 18.07 C 248.327 18.07 233.12 33.278 243.258 40.881 C 253.397 48.485 278.742 38.346 278.742 38.346 L 278.742 15.536 Z" strokeWidth="1.006"></path>
            <path fill="#F7FFD7" stroke="#000000" strokeWidth="1.082" strokeOpacity="0.2516" d="M 295.517 -270.71 C 285.836 -269.02 274.789 -250.32 279.869 -247.21 C 291.973 -253.31 315.626 -261.7 338.862 -264.04 C 343.46 -266.5 349.739 -274.07 349.975 -275.76 C 334.004 -276.67 306.077 -272.78 295.517 -270.71 Z" style={{strokeWidth:"1.088"}}></path>
            <path fill="#F7FFD7" stroke="#000000" strokeWidth="1.082" strokeOpacity="0.2516" d="M 559.575 -275.97 C 569.255 -274.29 580.302 -260.27 575.221 -257.16 C 563.12 -263.26 539.466 -265.21 516.229 -267.55 C 511.632 -270.02 505.356 -279.34 505.114 -281.03 C 521.087 -281.94 549.014 -278.05 559.575 -275.97 Z" style={{strokeWidth:"1.088"}}></path>
            <path fill="none" stroke="#000000" strokeOpacity="0.3711" d="M 359.576 -277.83 C 399.378 -284.86 466.69 -284.27 495.372 -280.76" style={{strokeWidth:"1.006"}}></path>
            <path fill="none" stroke="#000000" strokeOpacity="0.3711" d="M 359.576 -274.91 C 399.378 -281.93 466.69 -281.35 495.372 -277.84" style={{strokeWidth:"1.006"}}></path>
            <path fill="none" stroke="#000000" strokeOpacity="0.3711" d="M 359.576 -271.4 C 399.378 -278.42 466.69 -277.84 495.372 -274.32" style={{strokeWidth:"1.006"}}></path>
            <path fill="none" stroke="#000000" strokeOpacity="0.3711" d="M 359.576 -267.3 C 399.378 -273.74 464.933 -272.57 493.033 -270.81" style={{strokeWidth:"1.006"}}></path>
            <path opacity="0.62" fillOpacity="0.6855" stroke="#000000" d="M 285.395 28.207 L 303.137 109.312 C 303.137 109.312 303.137 261.383 300.602 263.916 C 298.066 266.45 277.791 309.537 277.791 309.537 C 277.791 309.537 282.859 33.278 285.395 28.203 L 285.395 28.207 Z" strokeWidth="1.006"></path>
            <path fill="none" stroke="#000000" d="M 278.102 44.193 C 275.599 71.731 262.018 519.966 283.108 519.848 C 358.055 548.245 520.881 545.15 581.929 512.337 C 600.737 512.261 589.438 64.212 586.935 36.683" strokeWidth="1.006"></path>
            <path opacity="0.62" fillOpacity="0.7484" stroke="#000000" d="M 579.401 23.143 L 561.66 104.248 C 561.66 104.248 561.66 256.319 564.194 258.852 C 566.73 261.386 587.005 304.473 587.005 304.473 C 587.005 304.473 581.937 28.214 579.401 23.139 L 579.401 23.143 L 579.401 23.143 Z" strokeWidth="1.006"></path>
          </g>
        </g>
      </svg>
    </div>
  );
}
