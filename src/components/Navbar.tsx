import dice from '../assets/dice.svg'
import Navlink from './Navlink'

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between p-2 md:px-4 md:py-1">
      {/* Brand */}
      <Navlink page="/" className="flex flex-col items-center leading-none">
        <span className="text-xs md:text-base">The</span>
        <img
          className="-my-0.5 h-8 w-8 opacity-80 md:-my-1 md:w-10 md:h-10"
          src={dice}
          alt="dice icon"
        />
        <span className="text-xs md:text-base -mt-0.5">Game</span>
      </Navlink>

      {/* Navigation */}
      <div className="hidden md:flex md:items-center md:gap-6">
        <Navlink page="/game-play" className="nav-link text-base">
          Game Play
        </Navlink>
        <Navlink page="/about" className="nav-link text-base">
          About Us
        </Navlink>
      </div>
    </nav>
  );
}
