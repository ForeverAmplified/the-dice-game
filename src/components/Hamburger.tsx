import Button from "./Button.tsx";

type HamburgerProps = {
  isMobileMenuOpen: boolean;
  hamburgerClick: () => void;
};

export default function Hamburger({ hamburgerClick, isMobileMenuOpen }: HamburgerProps) {
  return (
    <Button className="flex flex-col flex-wrap justify-around w-7 h-7 z-10 cursor-pointer" onClick={hamburgerClick} aria-label="Toggle mobile menu">
      <div className={`block w-7 h-[0.27rem] rounded bg-black transition-all origin-[1px] ${isMobileMenuOpen ? "rotate-45" : "rotate-0"}`}></div>
      <div className={`block w-7 h-[0.27rem] rounded bg-black transition-all origin-[1px] ${isMobileMenuOpen ? "translate-x-full bg-transparent" : "translate-x-0"}`}></div>
      <div className={`block w-7 h-[0.27rem] rounded bg-black transition-all origin-[1px] ${isMobileMenuOpen ? "-rotate-45" : "rotate-0"}`}></div>
    </Button>
  );
}