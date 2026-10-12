import Navbar from './Navbar.tsx';

export default function Header() {
  const navClass = 'w-full bg-header text-black font-orbitron font-bold shadow-md';

  return (
    <header className={navClass}>
      <Navbar />
    </header>
  );
}