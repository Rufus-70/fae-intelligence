// Placeholder for HumanActionIcon.tsx
import React from 'react';

const HumanActionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v5m0 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 0H9m3 0h3m-3 5v5m0 0H9m3 0h3" />
    {/* A simple representation of a person/human action */}
    <circle cx="12" cy="4" r="2" />
    <path d="M12 10v4M10 12h4" /> {/* Arms */}
    <path d="M12 14v6M10 20h4" /> {/* Legs */}
  </svg>
);

export default HumanActionIcon;
