import React from 'react';
import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional image */
  img?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  img,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'newday-button--primary' : 'newday-button--secondary';
  return (
    <button
      title={label}
      type="button"
      className={['newday-button', `newday-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
      {img ? <img src={img} alt="image" /> : null}
    </button>
  );
};
