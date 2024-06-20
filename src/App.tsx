import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Contacts from "./pages/Contacts";
import NewContacts from "./pages/NewContacts";
import Welcome from "./pages/Welcome";

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleSetIsFirstTime = (value: boolean) => {
    setIsFirstTime(value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Welcome setIsFirstTime={handleSetIsFirstTime} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/contacts/new"
          element={
            <NewContacts
              firstTime={isFirstTime}
              setIsFirstTime={handleSetIsFirstTime}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
