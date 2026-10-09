import { useEffect } from 'react';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ opened, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!opened) return;
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <>
      <div className={`modal__backdrop${className ? ` ${className}__backdrop` : ''}`} onClick={onClose} />
      <div className={`modal${className ? ` ${className}` : ''}`} role="dialog" aria-modal="true">
        <div className="modal__handle" />
        <div className="modal__content">{children}</div>
      </div>
    </>
  );
}
