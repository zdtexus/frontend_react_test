import { Button as NextButton } from '@nextui-org/react';
import type React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  color?: 
    'default' |
    'primary' |
    'success' |
    'warning' |
    'danger' |
    undefined;
  href?: string;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
  href,
  onClick,  // Принимаем обработчик клика
}) => {
  return (
    <NextButton
      startContent={icon}
      size='lg'
      color={color}
      variant='light'
      className={className}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </NextButton>
  );
};
