import React from "react";
import Button from "../components/Button";

const WelcomePage: React.FC = () => {
  return (
    <>
      <div className="flex h-screen flex-col ml-64">
        <div className="flex-1 bg-red-600">
          <img
            src="src\assets\contacts_portal_logo.png"
            alt="TWC Contacts Portal Logo"
          />
        </div>
        <div className="flex-1 flex flex-col bg-blue-600">
          <h1 className="text-4xl font-bold text-white">
            Welcome to the TWC Contacts Portal
          </h1>
          <p className="text-white">
            Your one-stop shop for managing your contacts with TWC.
          </p>
          <Button
            children={"add your first contact"}
            onClick={() => {}}
          ></Button>
        </div>
        <div className="flex-1 bg-blue-400"></div>
        <div className="flex-1 bg-green-400"></div>
      </div>
    </>
  );
};

export default WelcomePage;
