// app/admin/prompts/components/Modal.tsx
import React from 'react';
// Assuming IconX might be used from constants for a close button
// import { IconX } from '../../constants'; // Example path relative to app/admin/prompts/components

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Optional size prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
    >
      <div
        className={`bg-slate-800 text-white rounded-lg shadow-xl w-full ${sizeClasses[size]} p-6 z-50 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <header className="flex justify-between items-center pb-3 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-sky-400">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-sky-300 transition-colors p-1 rounded-full hover:bg-slate-700"
            aria-label="Close modal"
          >
            {/* <IconX className="h-6 w-6" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="py-4 custom-scrollbar max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {/* Footer can be added here if needed, e.g. for common action buttons */}
        {/* <footer className="pt-3 border-t border-slate-700 flex justify-end">
          <button onClick={onClose} className="text-sm bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-md">
            Close
          </button>
        </footer> */}
      </div>
      <style jsx global>{`
        @keyframes modalShow {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          animation: modalShow 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
