export default function Footer() {
  const year = new Date().getFullYear();
  const footerClasses = `
    flex items-center justify-center mt-auto h-14 bg-footer
    font-orbitron font-bold text-sm text-accent md:h-16 md:text-base
  `;

  return (
    <footer className={footerClasses}>
      Copyright © {year}
    </footer>
  );
}