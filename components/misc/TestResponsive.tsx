'use client';
import React, { useState } from 'react';

const ResponsiveToggle: React.FC = () => {
  const [viewport, setViewport] = useState<number>(1); // 1 for desktop, 2 for tablet, 3 for mobile

  const handleToggleClick = () => {
    // Toggle between desktop, tablet, and mobile
    setViewport((prevViewport) => (prevViewport % 3) + 1);
  };

  const getViewportLabel = () => {
    switch (viewport) {
      case 1:
        return 'Desktop';
      case 2:
        return 'Tablet';
      case 3:
        return 'Mobile';
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: '#2dd4bf',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 999,
      }}
      onClick={handleToggleClick}
    >
      Toggle {getViewportLabel()}
    </div>
  );
};

export default ResponsiveToggle;
