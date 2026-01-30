import React, { useEffect } from 'react';

interface AnalyticsProps {
  trackingId?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ trackingId }) => {
  useEffect(() => {
    // Basic page view tracking
    const trackPageView = (url: string) => {
      // This would integrate with Google Analytics, Facebook Pixel, etc.
      console.log(`Page view tracked: ${url}`);
      
      // Example: Send to Google Analytics
      if (typeof gtag !== 'undefined' && trackingId) {
        gtag('config', trackingId, {
          page_path: url,
        });
      }
    };

    // Track initial page load
    trackPageView(window.location.pathname);

    // Track navigation changes
    const handlePopState = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    // Performance monitoring
    const trackPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track Core Web Vitals
        if ('web-vitals' in window) {
          // This would use the web-vitals library
          // getCLS, getFID, getFCP, getLCP, getTTFB
        }
      }
    };

    // Track performance after page load
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('load', trackPerformance);
    };
  }, [trackingId]);

  return null;
};

export default Analytics;