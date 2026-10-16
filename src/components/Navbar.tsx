import { useState } from 'react';

import dice from '../assets/dice.svg'
import NavItem from './NavItem.tsx'
import Modal from './Modal.tsx'
import AboutUs from "../content/AboutUs.tsx";
import HowToPlay from '../content/HowToPlay.tsx'

type ModalType = "howToPlay" | "aboutUs" | null;

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  function handleOpenModal(navItem: ModalType) {
    setModalIsOpen(true);
    setActiveModal(navItem);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  let modalContent = null;
  let source = null;

  if (activeModal === "howToPlay") {
    modalContent = <HowToPlay />;
    source = "How to Play"
  } else if (activeModal === "aboutUs") {
    modalContent = <AboutUs />;
    source = "About Us"
  }

  return (
    <>
      <Modal isOpen={modalIsOpen} source={source} onClose={handleCloseModal}>
        {modalContent}
      </Modal>

      <nav className="mx-auto flex w-full px-4 max-w-screen-2xl items-center justify-between p-2 md:px-4 md:py-1">
        {/* Brand */}
        <a href="/" className="flex flex-col items-center leading-none">
          <span className="text-xs md:text-base">The</span>
          <img
            className="-my-0.5 h-8 w-8 opacity-80 md:-my-1 md:w-10 md:h-10"
            src={dice}
            alt="dice icon"
          />
          <span className="text-xs md:text-base -mt-0.5">Game</span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavItem
            onNavItemClick={() => handleOpenModal("howToPlay")}
            className="nav-item"
          >
            How to Play
          </NavItem>
          <NavItem
            onNavItemClick={() => handleOpenModal("aboutUs")}
            className="nav-item"
          >
            About Us
          </NavItem>
        </div>
      </nav>
    </>
  );
}