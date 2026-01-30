import React from 'react';
import { useRouter } from './Router';

const DebugPanel: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="mb-2">
        <strong>Debug Panel</strong>
      </div>
      <div className="mb-2">
        Current Path: <span className="text-yellow-300">{currentPath}</span>
      </div>
      <div className="mb-2">
        URL: <span className="text-blue-300">{typeof window !== 'undefined' ? window.location.href : 'N/A'}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {['/', '/shop', '/about', '/contact', '/current-stock'].map(path => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`px-2 py-1 text-xs rounded ${
              currentPath === path 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            {path === '/' ? 'Home' : path.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;