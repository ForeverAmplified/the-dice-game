import { type ComponentPropsWithoutRef } from "react";

type LinkProps = ComponentPropsWithoutRef<"a"> & {
  page: string;
}

export default function Navlink({ page, children, ...anchorProps }: LinkProps) {
  return (
    <a href={page} {...anchorProps}>
      {children}
    </a>
  );
}