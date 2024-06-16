import React from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import HomeLayout from "../layout/HomeLayout";

interface NewContactsProps {
  firstTime: boolean;
}

const NewContacts: React.FC<NewContactsProps> = ({ firstTime }) => {
  const buttonText = firstTime ? "add your first contact" : "add contact";

  return (
    <div className="">
      <HomeLayout>
        <div className="flex flex-col">
          <h1 className="text-6xl font-normal italic text-white flex-1">
            New Contact
          </h1>
          <div className="flex-grow">
            <form action="" className="grid grid-cols-2 gap-4">
              <TextField
                isPassword={false}
                name="name"
                placeholder="full name"
              />
              <TextField isPassword={false} name="email" placeholder="e-mail" />
              <TextField
                isPassword={false}
                name="phone"
                placeholder="phone number"
              />
              <div className="flex flex-row items-center space-x-4 text-xl">
                <p className="mr-4">Gender</p>
                <label htmlFor="male" className="flex items-center space-x-2">
                  <input type="radio" id="male" name="gender" value="male" />
                  <span>Male</span>
                </label>
                <label htmlFor="female" className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <span>Female</span>
                </label>
              </div>
              <Button>{buttonText}</Button>
            </form>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default NewContacts;
