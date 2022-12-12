import { MouseEventHandler, PropsWithChildren } from "react";
import './button.css';

type Props = {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: MouseEventHandler;
};

export const Button = ({ 

  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props

 }: Props) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

