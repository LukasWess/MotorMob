import React from 'react';
import { clearModuleCache } from '../utils/devHelper';

/**
 * A development-only component that provides utilities for testing
 * Not rendered in production builds
 */
function DevTools() {
  // Only render in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}
    >
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Dev Tools</div>
      <button 
        onClick={() => clearModuleCache()}
        style={{ 
          background: '#444', 
          color: 'white', 
          border: 'none', 
          padding: '3px 8px', 
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '11px'
        }}
      >
        Clear Cache & Reload
      </button>
      <div style={{ marginTop: '5px', fontSize: '10px' }}>
        Last render: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}

export default DevTools;
