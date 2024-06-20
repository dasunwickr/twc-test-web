import { forwardRef, Ref } from "react";
import { TextFieldProps } from "../types";

const TextField = forwardRef(
  (
    { isPassword, placeholder, name, ...rest }: TextFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputType = isPassword ? "password" : "text";

    return (
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        ref={ref}
        className="appearance-none block w-full py-2 px-8 my-4 border rounded-full placeholder-primary text-primary focus:outline-none focus:ring focus:border-blue-300 text-bold-xl font-semibold"
        {...rest}
      />
    );
  }
);

export default TextField;
