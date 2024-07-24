import type React from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
}

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <Button
      className="flex justify-start text-xl"
      icon={icon}
      onClick={handleClick}
    >
      
      {children}
    </Button>
  );
};


