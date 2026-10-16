import { type ComponentPropsWithoutRef } from "react";

type NavItemPropTypes = ComponentPropsWithoutRef<"button"> & {
  onNavItemClick: () => void;
}

export default function NavItem({ onNavItemClick, children, ...navItemProps }: NavItemPropTypes) {
  return (
    <button onClick={onNavItemClick}  {...navItemProps}>
      {children}
    </button>
  );
}