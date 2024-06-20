import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Contacts from "./pages/Contacts";
import NewContacts from "./pages/NewContacts";
import Welcome from "./pages/Welcome";
import AuthLayout from "./layout/AuthLayout";
import { useState } from "react";
import HomeLayout from "./layout/HomeLayout";

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleSetIsFirstTime = (value: boolean) => {
    setIsFirstTime(value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Welcome setIsFirstTime={handleSetIsFirstTime} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/new" element={<NewContacts firstTime={isFirstTime} setIsFirstTime={handleSetIsFirstTime} />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
