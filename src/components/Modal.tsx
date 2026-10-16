import { useRef, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

import { type ComponentPropsWithoutRef } from "react";

type HowToPlayProps = ComponentPropsWithoutRef<"dialog"> & {
  isOpen: boolean;
  source: string | null;
  onClose: () => void;
}

export default function HowToPlay({isOpen, source, onClose, children }: HowToPlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal (
    <dialog
      ref={dialogRef}
      className="mt-26 mx-auto rounded-lg bg-page text-header w-[min(90vw,600px)] max-h-[80vh] font-inter overflow-hidden"
      onClick={(event) => handleDialogClick(event)}
    >
      <header className="flex justify-between items-center font-orbitron font-bold text-xl text-black py-4 px-5 bg-header">
        <span>
          {source}
        </span>

        <Button
          onClick={onClose}
          aria-label="Close dialog"
          className="nav-item text-base"
        >
          Close
        </Button>
      </header>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}