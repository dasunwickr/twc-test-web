import React from "react";
import { ButtonProps } from "../types";


const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "colored",
  color = "#083F46",
}) => {
  const isOutlined = variant === "outlined";

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`px-14 py-1.5 border-2 rounded-full text-2xl font-normal ${isOutlined
        ? `border-${color} text-${color} bg-white`
        : `border-white bg-[#083F46] text-white`
        }`}
      style={
        isOutlined
          ? { borderColor: color, color: color, backgroundColor: "white" }
          : {}
      }
    >
      {children}
    </button>
  );
};

export default Button;
