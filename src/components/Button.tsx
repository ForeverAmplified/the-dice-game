import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function Button({ children, ...buttonProps }: ButtonProps) {
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}