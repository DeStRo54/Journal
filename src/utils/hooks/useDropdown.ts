import React from 'react';

export const useDropdown = <T extends HTMLElement = HTMLDivElement>() => {
  const menuRef = React.useRef<T>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen]);

  return [menuRef, isOpen, setIsOpen] as const;
};
