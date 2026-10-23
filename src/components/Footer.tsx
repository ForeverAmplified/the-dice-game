export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`
        flex justify-center items-center mt-auto h-14 bg-footer 
        font-orbitron font-bold text-sm text-accent md:h-16 md:text-base
      `}
    >
      Copyright © {year}
    </footer>
  );
}