import { useState, useRef, useEffect } from "react";
import type { ComponentPropsWithoutRef, MouseEvent, SyntheticEvent, TransitionEvent } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  isOpen: boolean;
  source: string | null;
  onClose: () => void;
}

export default function HowToPlay({ isOpen, source, onClose, children }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !isClosing) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (!isOpen && dialog.open && !isClosing) {
      setIsClosing(true);
    }
  }, [isOpen, isClosing]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();

    if (!isClosing) {
      onClose();
    }
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!isClosing) {
      return;
    }

    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    setIsClosing(false);
  }

  return createPortal (
    <dialog
      ref={dialogRef}
      className={`
        modal-dialog m-auto  w-[min(90vw,600px)] max-h-[80vh] overflow-hidden rounded-lg bg-page font-inter text-header
        origin-center open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 ${isClosing ? "modal-closing" : ""}
      `}
      onCancel={handleCancel}
      onClick={(event) => handleBackdropClick(event)}
      onTransitionEnd={handleTransitionEnd}
    >
      <header className="flex justify-between items-center py-4 px-5  bg-header font-orbitron font-bold text-black text-xl">
        <span>
          {source}
        </span>
        <Button className="nav-item text-base" onClick={onClose} aria-label="Close dialog">
          Close
        </Button>
      </header>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}