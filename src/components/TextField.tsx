import React from "react";

interface TextFieldProps {
  isPassword: boolean;
  placeholder: string;
  name: string;
}

const TextField: React.FC<TextFieldProps> = ({
  isPassword,
  placeholder,
  name,
}) => {
  const inputType = isPassword ? "password" : "text";

  return <input type={inputType} placeholder={placeholder} name={name} />;
};

export default TextField;
