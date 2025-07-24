import { X } from 'lucide-react';
import { useEffect, useState, type FC, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onTransitionEnd: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<ModalProps> = ({ open, title, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [show, setShow] = useState(open);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (open) {
      setShouldRender(true);
      timerId = setTimeout(() => {
        setShow(true);
      }, 10);
    } else {
      setShow(false);
    }

    return () => clearTimeout(timerId);
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      data-testid="modal-overlay"
      className={`fixed inset-0 flex justify-center items-center transition-colors ${show ? 'visible bg-black/20' : 'invisible'}`}
      onTransitionEnd={handleTransitionEnd}>
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card py-5 px-4 transition-all duration-300
        ${show ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}>
        <header className="flex gap-x-4 justify-center items-center not-last:mb-4">
          <div className="w-6 h-6"></div>
          {title && <h2 className="text-xl/loose font-bold text-center flex-1">{title}</h2>}
          <button aria-label="Close modal" onClick={onClose} className="cursor-pointer text-muted w-6 h-6">
            <X />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
