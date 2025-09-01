import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export const VedraLabsLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  height = 32, 
  width = 120 
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
      {/* VL Icon - Red V and Blue L */}
      {/* Red V */}
      <path 
        d="M20 20 L35 50 L50 20" 
        fill="none" 
        stroke="#ff4444" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Blue L */}
      <path 
        d="M45 20 L45 50 L70 50" 
        fill="none" 
        stroke="#4444ff" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Text "VEDRA LABS" */}
      <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">
        VEDRA
      </text>
      <text x="90" y="50" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">
        LABS
      </text>
    </svg>
  );
};
