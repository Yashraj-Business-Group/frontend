import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { AlertTriangle, Trash2, Info, CheckCircle2, X } from 'lucide-react';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  icon?: 'trash' | 'alert' | 'info' | 'check';
  alertOnly?: boolean;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context.confirm;
};

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ message: '' });
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions | string): Promise<boolean> => {
    const normalizedOptions: ConfirmOptions = typeof opts === 'string' ? { message: opts } : opts;
    setOptions(normalizedOptions);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(true);
      resolverRef.current = null;
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const variant = options.variant || 'danger';

  const renderIcon = () => {
    if (options.icon === 'trash' || (variant === 'danger' && !options.icon)) {
      return (
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 ring-8 ring-rose-50">
          <Trash2 size={24} />
        </div>
      );
    }
    if (variant === 'warning' || options.icon === 'alert') {
      return (
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 ring-8 ring-amber-50">
          <AlertTriangle size={24} />
        </div>
      );
    }
    if (variant === 'success' || options.icon === 'check') {
      return (
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 ring-8 ring-emerald-50">
          <CheckCircle2 size={24} />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 ring-8 ring-blue-50">
        <Info size={24} />
      </div>
    );
  };

  const getConfirmButtonClasses = () => {
    if (variant === 'danger') {
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm ring-rose-500/20';
    }
    if (variant === 'warning') {
      return 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm ring-amber-500/20';
    }
    if (variant === 'success') {
      return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-emerald-500/20';
    }
    return 'bg-[#002451] hover:bg-[#001b3d] text-white shadow-sm ring-[#002451]/20';
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCancel}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150 text-left relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header with Icon and Title */}
            <div className="flex items-start gap-4">
              {renderIcon()}
              <div className="flex-1 pr-6">
                <h3 className="text-lg font-headline font-bold text-slate-900 leading-snug">
                  {options.title || (variant === 'danger' ? 'Confirm Deletion' : 'Confirm Action')}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                  {options.message}
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-3 border-t border-slate-100">
              {!options.alertOnly && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  {options.cancelText || 'Cancel'}
                </button>
              )}
              <button
                type="button"
                autoFocus
                onClick={handleConfirm}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all focus:outline-none focus:ring-2 ${getConfirmButtonClasses()}`}
              >
                {options.confirmText || (options.alertOnly ? 'OK' : variant === 'danger' ? 'Yes, Delete' : 'Confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
