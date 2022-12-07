import { MouseEventHandler, PropsWithChildren } from "react";

type Props = {
  onClick?: MouseEventHandler;
};

export const Button = ({ children, onClick }: PropsWithChildren<Props>) => {
  return <button onClick={onClick}>{children}</button>;
};
