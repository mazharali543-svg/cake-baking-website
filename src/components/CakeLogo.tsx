/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CakeLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export default function CakeLogo({ className = '', size = 40, showText = false }: CakeLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={showText ? undefined : size}
        viewBox={showText ? "0 0 120 125" : "0 0 120 100"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        <defs>
          {/* Gradients for premium, rich visuals */}
          <linearGradient id="cake-layer-bottom" x1="60" y1="62" x2="60" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFAE73" />
            <stop offset="100%" stopColor="#F57C43" />
          </linearGradient>
          <linearGradient id="cake-layer-middle" x1="60" y1="54" x2="60" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2D4" />
            <stop offset="100%" stopColor="#FCD59F" />
          </linearGradient>
          <linearGradient id="cake-layer-top" x1="60" y1="46" x2="60" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFA" />
            <stop offset="100%" stopColor="#FFF5E0" />
          </linearGradient>
          <linearGradient id="chocolate-drip-grad" x1="60" y1="42" x2="60" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5D4037" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
          <linearGradient id="cherry-grad-left" x1="41" y1="24" x2="52" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4F4F" />
            <stop offset="60%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#8A0F0F" />
          </linearGradient>
          <linearGradient id="cherry-grad-right" x1="55" y1="32" x2="63" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E53935" />
            <stop offset="60%" stopColor="#B71C1C" />
            <stop offset="100%" stopColor="#5F0909" />
          </linearGradient>
          <linearGradient id="leaf-grad" x1="52" y1="12" x2="68" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9CCC65" />
            <stop offset="100%" stopColor="#558B2F" />
          </linearGradient>

          {/* Cursive style SVG Font Fallback & Shadow */}
          <filter id="logo-text-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0.6" dy="0.8" stdDeviation="0.4" floodColor="#5D4037" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Plate Shadow */}
        <ellipse cx="60" cy="80" rx="46" ry="16" fill="#000" fillOpacity="0.06" />

        {/* 2. Plate (White with elegant brown stroke) */}
        {/* Outer Rim */}
        <ellipse cx="60" cy="78" rx="44" ry="15" fill="#FFFFFF" stroke="#5D4037" strokeWidth="1.8" />
        {/* Inner Plate Rim */}
        <ellipse cx="60" cy="76" rx="38" ry="12" fill="none" stroke="#5D4037" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
        {/* Plate Base/Depth */}
        <ellipse cx="60" cy="77" rx="36" ry="11" fill="#FFFDF8" />

        {/* 3. Cake Shadow on Plate */}
        <ellipse cx="60" cy="74" rx="31" ry="8" fill="#EADBC6" fillOpacity="0.5" />

        {/* 4. Cake Layers */}
        {/* Bottom Layer - Orange/Peach */}
        <path d="M 29 55 C 29 55, 29 74, 60 74 C 91 74, 91 55, 91 55 C 91 55, 91 55, 91 55" fill="url(#cake-layer-bottom)" />
        {/* Middle Layer - Creamy Yellow */}
        <path d="M 29 50 C 29 50, 29 65, 60 65 C 91 65, 91 50, 91 50 Z" fill="url(#cake-layer-middle)" />
        {/* Top Layer - Off-White Cream */}
        <path d="M 29 44 C 29 44, 29 55, 60 55 C 91 55, 91 44, 91 44 Z" fill="url(#cake-layer-top)" />

        {/* 5. Chocolate Drip */}
        {/* Base top chocolate ellipse */}
        <ellipse cx="60" cy="45" rx="31" ry="8" fill="url(#chocolate-drip-grad)" />
        {/* Drips hanging down the sides */}
        <path
          d="M 29 45 
             C 29 45, 29 54, 32 54 
             C 35 54, 36 46, 39 46 
             C 42 46, 43 66, 46 66 
             C 49 66, 51 47, 54 47 
             C 57 47, 59 62, 62 62 
             C 65 62, 68 47, 71 47 
             C 74 47, 76 66, 79 66 
             C 82 66, 84 48, 87 48 
             C 90 48, 91 54, 91 45 
             C 91 45, 91 45, 91 45"
          fill="url(#chocolate-drip-grad)"
          stroke="url(#chocolate-drip-grad)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Subtle chocolate highlight */}
        <path d="M 33 46 C 40 49, 50 49, 58 47" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />

        {/* 6. Whipped Cream Swirls on Top */}
        {/* Back Swirl */}
        <path d="M 45 42 C 43 38, 51 32, 55 35 C 59 32, 67 36, 65 42 C 60 45, 50 45, 45 42 Z" fill="#EAE2D5" />
        
        {/* Side Swirls */}
        <ellipse cx="40" cy="42" rx="7" ry="5" fill="#FFFDFC" stroke="#E3DAC9" strokeWidth="0.5" />
        <ellipse cx="40" cy="41" rx="4" ry="3" fill="#FFFFFF" />
        
        <ellipse cx="80" cy="42" rx="7" ry="5" fill="#FFFDFC" stroke="#E3DAC9" strokeWidth="0.5" />
        <ellipse cx="80" cy="41" rx="4" ry="3" fill="#FFFFFF" />

        {/* Center Main Swirl */}
        <path d="M 45 43 C 41 38, 51 30, 60 30 C 69 30, 79 38, 75 43 C 71 46, 49 46, 45 43 Z" fill="#FFFDFC" stroke="#E3DAC9" strokeWidth="0.6" />
        <path d="M 49 42 C 47 39, 52 34, 60 34 C 68 34, 73 39, 71 42 C 68 44, 52 44, 49 42 Z" fill="#FFFFFF" />
        <path d="M 53 41 C 52 39, 55 37, 60 37 C 65 37, 68 39, 67 41 C 65 42, 55 42, 53 41 Z" fill="#FFFFFF" opacity="0.8" />

        {/* 7. Mint Leaves */}
        {/* Left Mint Leaf */}
        <path d="M 60 35 C 56 25, 62 18, 68 18 C 68 18, 66 26, 60 35 Z" fill="url(#leaf-grad)" />
        <path d="M 60 35 Q 63 26, 68 18" stroke="#33691E" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
        {/* Small detail veins */}
        <path d="M 62 30 Q 65 28, 66 27" stroke="#33691E" strokeWidth="0.4" opacity="0.4" />
        <path d="M 59 27 Q 61 25, 63 24" stroke="#33691E" strokeWidth="0.4" opacity="0.4" />

        {/* Right Mint Leaf */}
        <path d="M 61 35 C 65 26, 73 22, 75 26 C 75 26, 70 31, 61 35 Z" fill="#9CCC65" />
        <path d="M 61 35 Q 68 29, 75 26" stroke="#33691E" strokeWidth="0.5" opacity="0.5" />

        {/* 8. Cherries */}
        {/* Left Main Cherry (Big with stem) */}
        <circle cx="48" cy="34" r="11" fill="url(#cherry-grad-left)" />
        {/* Stem */}
        <path d="M 45 32 C 40 23, 35 18, 30 18" fill="none" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
        {/* Leaf/Top Cap of Stem */}
        <circle cx="30" cy="18" r="1.2" fill="#5D4037" />
        <path d="M 44 31 C 45 31, 46 32, 45 33" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
        {/* Cherry Highlights */}
        <ellipse cx="44" cy="29" rx="3" ry="1.5" transform="rotate(-30 44 29)" fill="#FFFFFF" fillOpacity="0.75" />
        <circle cx="42" cy="34" r="1" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Right Cherry (Slightly smaller, overlapping behind) */}
        <circle cx="61" cy="39" r="8.5" fill="url(#cherry-grad-right)" />
        <ellipse cx="58" cy="35.5" rx="2" ry="1" transform="rotate(-30 58 35.5)" fill="#FFFFFF" fillOpacity="0.7" />

        {/* 9. Optional Script Text Label "Thecakebake" (Matches uploaded image exactly) */}
        {showText && (
          <text
            x="60"
            y="114"
            fontFamily="'Playfair Display', 'Georgia', 'Brush Script MT', cursive, serif"
            fontSize="18.5"
            fontWeight="bold"
            fontStyle="italic"
            fill="#5D4037"
            textAnchor="middle"
            filter="url(#logo-text-shadow)"
            letterSpacing="-0.3"
          >
            Thecakebake
          </text>
        )}
      </svg>
    </div>
  );
}
