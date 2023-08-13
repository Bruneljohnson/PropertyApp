import { type ReactNode } from "react";

export type ConditionalWrapperProps = {
  if?: boolean;
  wrapWith?: (children: ReactNode) => JSX.Element;
  children: ReactNode;
} & ({ if: true; wrapWith: (children: ReactNode) => JSX.Element } | { if?: false });
