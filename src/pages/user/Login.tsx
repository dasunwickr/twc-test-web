// Login.tsx

import React, { useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Register from "./Register";

interface LoginProps {
  // Define any props if needed
}

const Login: React.FC<LoginProps> = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div>
      {!showRegister ? (
        <AuthLayout
          children={
            <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
              <div className="">
                <h1 className="font-bold text-5xl text-white">Hi there,</h1>
                <h2 className="font-semibold text-3xl text-white w-56">
                  Welcome to our contacts portal
                </h2>
              </div>
              <div>
                <form className="flex flex-col">
                  <TextField
                    placeholder="e-mail"
                    name="email"
                    isPassword={false}
                  />
                  <TextField
                    placeholder="password"
                    name="password"
                    isPassword={true}
                  />
                </form>
              </div>
              <div className="flex flex-row items-center">
                <Button onClick={() => {}} children={"Login"} />
                <p className="ml-5 text-xl text-white flex flex-row">
                  <div className="mx-5">or</div>
                  <a className="underline" onClick={switchToRegister}>
                    Click here to Register
                  </a>
                </p>
              </div>
            </div>
          }
        />
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Login;
