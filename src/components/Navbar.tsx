import { useState } from 'react';

import logoImg from '../assets/images/dice.svg';

import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import NavItem from './NavItem';
import Modal from './Modal';
import AboutUs from '../content/AboutUs';
import HowToPlay from '../content/HowToPlay';

type ContentType = 'howToPlay' | 'aboutUs' | null;

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentType>(null);

  function handleModalOpen(navItem: ContentType) {
    setIsModalOpen(true);
    setSelectedContent(navItem);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleHamburgerClick() {
    setIsMobileMenuOpen(prev => !prev);
    setSelectedContent(null)
  }

  function handleMenuItemLoad(navItem: ContentType) {
    setSelectedContent(navItem);
  }

  let componentContent = null;
  let source = null;

  if (selectedContent === 'howToPlay') {
    componentContent = <HowToPlay />;
    source = 'How to Play';
  } else if (selectedContent === 'aboutUs') {
    componentContent = <AboutUs />;
    source = 'About Us';
  }

  return (
    <>
      <Modal isOpen={isModalOpen} source={source} onClose={handleModalClose}>
        {componentContent}
      </Modal>

      <nav className="flex justify-between items-center w-full max-w-8xl mx-auto px-4 py-0.75 md:py-1">
        {/* Logo */}
        <a href="/" className="flex flex-col items-center leading-none">
          <span className="text-xs md:text-base">The</span>
          <img className="-my-0.75 h-7 w-7 opacity-80 md:-my-1 md:h-10 md:w-10" src={logoImg} alt="dice icon" />
          <span className="text-xs md:text-base -mt-0.5">Game</span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <NavItem
            className="nav-item"
            onNavItemClick={() => handleModalOpen('howToPlay')}
          >
            How to Play
          </NavItem>
          <NavItem
            className="nav-item"
            onNavItemClick={() => handleModalOpen('aboutUs')}
          >
            About Us
          </NavItem>
        </div>

        {/* <Hamburger /> */}
        <div className="z-50 md:hidden">
          <Hamburger isMobileMenuOpen={isMobileMenuOpen} hamburgerClick={handleHamburgerClick} />
        </div>

        {/* <MobileMenu /> */}
          <MobileMenu isMenuOpen={isMobileMenuOpen} source={source}>
            <>
              <header className="shrink-0 flex justify-start items-center  bg-header rounded-tl-lg h-15 pl-4 font-orbitron font-bold text-xl text-black">
                {componentContent !== null && (
                  <NavItem
                    className="mobile-menu-header nav-item"
                    onNavItemClick={() => handleMenuItemLoad(null)}
                  >
                    Back
                  </NavItem>
                )}
              </header>

              {componentContent === null ? (
                <div className="flex flex-col flex-1  items-start min-h-0 gap-12 px-15 pt-24 bg-page">
                  <NavItem
                    className="mobile-menu nav-item"
                    onNavItemClick={() => handleMenuItemLoad('howToPlay')}
                  >
                    How to Play
                  </NavItem>
                  <NavItem
                    className="mobile-menu nav-item"
                    onNavItemClick={() => handleMenuItemLoad('aboutUs')}
                  >
                    About Us
                  </NavItem>
                </div>
              ) : (
                <div className={`flex-1 min-h-0 pt-1 rounded-bl-lg overflow-y-auto  bg-page`}>
                  {componentContent}
                </div>
              )}
            </>
          </MobileMenu>
      </nav>
    </>
  );
}