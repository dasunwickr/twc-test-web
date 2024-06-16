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

  return (
    <input
      type={inputType}
      placeholder={placeholder}
      name={name}
      className="appearance-none block w-full py-2 px-8 my-4 border rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-bold-xl font-semibold "
    />
  );
};

export default TextField;
