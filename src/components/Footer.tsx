export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto flex items-center justify-center h-14 bg-footer font-orbitron font-bold text-sm text-accent md:h-16 md:text-base">
      Copyright © {year}
    </footer>
  );
}