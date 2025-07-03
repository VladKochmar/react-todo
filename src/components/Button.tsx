import type { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-white py-1 px-3 rounded-[8px] hover:bg-primary/90 disabled:bg-primary/70 transition-colors duration-300 cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;
