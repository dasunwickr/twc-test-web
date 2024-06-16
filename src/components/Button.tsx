import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "colored" | "outlined";
  color?: string;
};

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
      className={`px-14 py-2 border-2 rounded-full text-2xl font-normal ${
        isOutlined
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
