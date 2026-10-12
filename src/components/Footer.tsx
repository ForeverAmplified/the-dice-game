export default function Footer() {
  const year = new Date().getFullYear();
  const footerClass = 'absolute left-0 right-0 bottom-0 mt-auto h-14 flex justify-center items-center bg-footer font-orbitron font-bold text-white text-xs  md:h-16 md:text-base';

  return (
    <footer className={footerClass}>
      Copyright © {year}
    </footer>
  );
}