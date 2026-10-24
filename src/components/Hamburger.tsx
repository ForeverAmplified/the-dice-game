import Button from './Button';

type HamburgerProps = {
  isMobileMenuOpen: boolean;
  hamburgerClick: () => void;
};

export default function Hamburger({ isMobileMenuOpen, hamburgerClick }: HamburgerProps) {
  const hamburgerClasses = 'block w-6 h-[0.25rem] rounded bg-black transition-all origin-[1px]';

  return (
    <Button
      className="flex flex-col flex-wrap justify-around h-6 w-6 z-10 cursor-pointer"
      onClick={hamburgerClick}
      aria-label="Toggle mobile menu"
    >
      <div className={`${hamburgerClasses} ${isMobileMenuOpen ? "rotate-45" : "rotate-0"}`}></div>
      <div className={`${hamburgerClasses} ${isMobileMenuOpen ? "translate-x-full bg-transparent" : "translate-x-0"}`}></div>
      <div className={`${hamburgerClasses} ${isMobileMenuOpen ? "-rotate-45" : "rotate-0"}`}></div>
    </Button>
  );
}