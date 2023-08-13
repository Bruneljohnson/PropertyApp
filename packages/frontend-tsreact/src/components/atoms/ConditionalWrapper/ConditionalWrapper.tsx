import { type ConditionalWrapperProps } from "./ConditionalWrapper.type";

export const ConditionalWrapper = ({
  if: condition,
  wrapWith: wrapper,
  children,
}: ConditionalWrapperProps): JSX.Element => (condition ? wrapper(children) : <>{children}</>);
