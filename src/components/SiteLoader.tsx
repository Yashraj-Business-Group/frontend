import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface SiteLoaderProps {
  /** Optional minimum display time in ms (default 900ms for smooth cinematic feel) */
  minDuration?: number;
}

export const SiteLoader: React.FC<SiteLoaderProps> = ({ minDuration = 850 }) => {
  const [progress, setProgress] = useState(12);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const statusMessages = [
    'Initializing secure systems...',
    'Loading corporate divisions...',
    'Synchronizing operations...',
    'Ready'
  ];

  useEffect(() => {
    // Lock scroll during initial load
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    let currentProgress = 12;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const isDocumentLoaded = document.readyState === 'complete';

      if (isDocumentLoaded && elapsed >= minDuration) {
        currentProgress = 100;
        setProgress(100);
        setStatusIndex(3);
        clearInterval(interval);

        // Allow user to see 100% for 180ms before smooth fade-out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsMounted(false);
            document.body.style.overflow = originalOverflow;
          }, 700);
        }, 180);
      } else {
        // Natural easing progress simulation
        const step = (100 - currentProgress) * 0.14 + Math.random() * 6;
        currentProgress = Math.min(94, currentProgress + step);
        setProgress(currentProgress);

        if (currentProgress > 70) {
          setStatusIndex(2);
        } else if (currentProgress > 38) {
          setStatusIndex(1);
        }
      }
    }, 45);

    // Hard fallback safety: never trap the user longer than 2.4s even on slow connections
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setStatusIndex(3);
      setIsExiting(true);
      setTimeout(() => {
        setIsMounted(false);
        document.body.style.overflow = originalOverflow;
      }, 700);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration]);

  if (!isMounted) return null;

  return (
    <aside 
      aria-label="Loading Website"
      aria-live="polite"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#001736] text-white select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-600/15 via-[#1a3a6b]/25 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        {/* Subtle tactical grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>

      {/* Main Loader Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm sm:max-w-md">
        
        {/* Animated Emblem Badge */}
        <div className="relative mb-6">
          {/* Subtle spinning halo ring */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-400/40 via-blue-500/30 to-amber-300/40 opacity-75 blur-md animate-pulse"></div>
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2.5 shadow-2xl flex items-center justify-center border border-white/20 transform transition-transform hover:scale-105">
            <img 
              src="/Logo2.jpg" 
              alt="Yashraj Business Group Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Tactical Security Icon Corner Badge */}
          <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#002451] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
            <Shield size={14} className="fill-amber-400/30" />
          </div>
        </div>

        {/* Brand Headline */}
        <h1 className="font-headline font-black text-xl sm:text-2xl tracking-[0.2em] uppercase text-white drop-shadow-md">
          Yashraj Business Group
        </h1>

        {/* Refined Gold Tagline */}
        <p className="text-[10px] sm:text-xs font-bold text-amber-400/90 tracking-[0.22em] uppercase mt-1.5">
          Security • Facility • Manpower
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 mt-8">
          <div className="h-1.5 w-full bg-slate-900/80 rounded-full overflow-hidden border border-white/10 p-[1px] relative shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-blue-400 to-amber-300 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.6)] relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light beam sliding over progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>

          {/* Status Label & Percentage Indicator */}
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mt-3 px-0.5">
            <span className="truncate pr-2 text-slate-300 transition-all duration-300">
              {statusMessages[statusIndex]}
            </span>
            <span className="font-mono font-bold text-amber-400/90 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

      </div>

      {/* ISO / PSARA Trust Tag at bottom */}
      <div className="absolute bottom-6 z-10 flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Government Registered & PSARA Certified</span>
      </div>
    </aside>
  );
};

/**
 * Lightweight top navigation progress bar for smooth route transitions
 */
export const RouteProgressBar: React.FC = () => {
  const location = useLocation();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(true);
    const timer = setTimeout(() => setNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!navigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] pointer-events-none overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-amber-400 via-[#1a3a6b] to-amber-300 animate-[routeProgress_0.35s_ease-out_forwards] shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
    </div>
  );
};

export default SiteLoader;
