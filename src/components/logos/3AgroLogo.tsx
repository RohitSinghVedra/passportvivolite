import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export const Ag3roLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  height = 32, 
  width = 80 
}) => {
  return (
    <svg 
      className={className}
      height={height}
      width={width}
      viewBox="0 0 200 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular Icon */}
      <circle cx="40" cy="40" r="25" fill="white"/>
      
      {/* Agricultural Elements */}
      {/* Bird/Plant shape */}
      <path 
        d="M25 35 Q30 25 35 35 Q30 30 25 35" 
        fill="none" 
        stroke="#2d5a27" 
        strokeWidth="2"
      />
      
      {/* Central plant/tree */}
      <rect x="37" y="25" width="6" height="30" fill="#2d5a27"/>
      <line x1="40" y1="30" x2="40" y2="35" stroke="#2d5a27" strokeWidth="1"/>
      <line x1="40" y1="40" x2="40" y2="45" stroke="#2d5a27" strokeWidth="1"/>
      
      {/* Flower/leaves */}
      <circle cx="50" cy="30" r="3" fill="#2d5a27"/>
      <path d="M50 30 Q55 25 50 20 Q45 25 50 30" fill="#2d5a27"/>
      
      {/* Lower leaf */}
      <path d="M50 45 Q55 50 50 55 Q45 50 50 45" fill="#2d5a27"/>
      
      {/* Text "3Agro" */}
      <text x="80" y="35" fill="white" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">
        3
      </text>
      <text x="95" y="35" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
        Agro
      </text>
    </svg>
  );
};
