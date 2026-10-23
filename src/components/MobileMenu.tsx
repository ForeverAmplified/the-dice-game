import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';

type MobileMenuProps = {
  isMenuOpen: boolean;
  source: string | null;
  children: ReactNode;
}

export default function MobileMenu({ isMenuOpen, source, children }: MobileMenuProps) {
  return createPortal(
    <>
      {/*Backdrop*/}
      <div className={`
        fixed inset-0 bg-black/60 z-40 transition-opacity duration-300
        ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/*Menu*/}
      <nav
        className={`
          fixed flex flex-col shadow-xl top-0 right-0  h-dvh w-9/10 text-header/90 z-50
          ${source !== null ? "font-inter" : "font-orbitron font-bold text-2xl"}
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {children}
      </nav>
    </>,
    document.getElementById('mobile-menu')!
  );
}