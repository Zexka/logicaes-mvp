import React, { useState, useRef, useEffect } from 'react';

export default function GlosarioTooltip({ palabraES, traduccionEN }) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Cerrar el tooltip si el usuario toca fuera de él en dispositivos móviles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <span 
      ref={tooltipRef}
      className="relative inline-block cursor-help border-b border-dashed border-blue-400 text-blue-100 hover:text-blue-300 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="button"
      tabIndex="0"
    >
      {palabraES}
      <span 
        className={`absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-gray-800 px-3 py-1.5 text-xs text-gray-200 z-20 border border-gray-600 shadow-xl transition-opacity duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        🇬🇧 En inglés: <strong className="text-white">{traduccionEN}</strong>
        <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-gray-600 bg-gray-800"></div>
      </span>
    </span>
  );
}
