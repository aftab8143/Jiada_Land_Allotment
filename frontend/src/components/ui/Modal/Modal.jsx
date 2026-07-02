import { useEffect } from 'react';
import denyBtn from '../../../assets/icons/deny-btn.svg';

const Modal = ({ title, children, footer, onClose, isOpen, headerColor = 'bg-primary-dark' }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${headerColor} flex items-center justify-between px-6 py-4`}>
          <h2 className="text-[1.05rem] font-bold text-white m-0">{title}</h2>
          <button
            className="w-9 h-9 p-0 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-150"
            style={{ background: 'none', border: 'none' }}
            onClick={onClose}
            aria-label="Close"
          >
            <img src={denyBtn} alt="Close" className="w-full h-full" />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
