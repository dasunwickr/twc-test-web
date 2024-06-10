import React from "react";
import Button from "../components/Button";
import Logout from "../components/Logout";

const WelcomePage: React.FC = () => {
  return (
    <div className="w-screen  bg-[#083F46]">
      <div className="flex h-screen flex-col mx-64">
        {/* Logo Section */}
        <div className="flex mt-16">
          <img
            src="src/assets/contacts_portal_logo.png"
            alt="TWC Contacts Portal Logo"
            className="max-w-full h-auto"
          />
        </div>

        {/* Welcome and Button Section */}
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome,</h1>
          <p className="text-xl text-white mb-20">
            This is where your contacts will live. Click the button below to add
            a new contact.
          </p>
          <div className="flex flex-col">
            <div className="w-auto">
              <Button onClick={() => {}}>add your first contact</Button>
            </div>
            <div className="" />
          </div>
        </div>

        {/* Logout Section */}
        <div className=" flex justify-end items-center p-4 text-2xl mr-32 mb-8">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
