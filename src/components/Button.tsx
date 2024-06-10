import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-16 py-3 border-2 border-white bg-[#083F46] text-white rounded-full text-xl font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
