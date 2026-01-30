import React, { useState, useEffect, createContext, useContext } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProps {
  children: React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(() => {
    // Ensure we're in the browser before accessing window
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // Set initial path
    setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to regular navigation
      window.location.href = path;
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export const Route: React.FC<RouteProps> = ({ path, component: Component }) => {
  const { currentPath } = useRouter();
  
  if (currentPath === path) {
    return <Component />;
  }
  
  return null;
};

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      navigate(to);
      onClick?.();
    } catch (error) {
      console.error('Link navigation error:', error);
      // Fallback to regular navigation
      window.location.href = to;
    }
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
      role="button"
      tabIndex={0}
    >
      {children}
    </a>
  );
};