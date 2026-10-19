import { createPortal } from "react-dom";
import { type ReactNode } from "react";

type MobileMenuProps = {
  isMenuOpen: boolean;
  source: string | null;
  children: ReactNode;
}

export default function MobileMenu({ isMenuOpen, source, children }: MobileMenuProps) {
  const backdropClasses = "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300";
  const navClasses = "fixed flex flex-col shadow-xl top-0 right-0  h-dvh w-9/10 text-header/90 z-50";
  const navTransitionClasses = "transition-transform duration-300 ease-in-out";

  return createPortal(
    <>
      {/*Backdrop*/}
      <div className={`${backdropClasses} ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      {/*Menu*/}
      <nav
        className={`
          ${navClasses} ${source !== null ? "font-inter" : "font-orbitron font-bold text-2xl"}
          ${navTransitionClasses} ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {children}
      </nav>
    </>,
    document.getElementById("mobile-menu")!
  );
}