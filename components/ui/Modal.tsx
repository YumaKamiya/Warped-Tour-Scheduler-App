
import React, { useEffect } from 'react';
import XMarkIcon from '../icons/XMarkIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-700 bg-opacity-60 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{ animationName: 'modalAppear', animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <h2 id="modal-title" className="text-xl font-semibold text-blue-700">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-blue-600 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-700">
          {children}
        </div>
        {footer && (
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes modalAppear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;