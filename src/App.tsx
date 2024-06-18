import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/user/Login";
import Contacts from "./pages/Contacts";
import NewContacts from "./pages/NewContacts";
import Welcome from "./pages/Welcome";

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleSetIsFirstTime = (value: boolean) => {
    setIsFirstTime(value);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome setIsFirstTime={handleSetIsFirstTime} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
    },
    {
      path: "/contacts/new",
      element: (
        <NewContacts
          firstTime={isFirstTime}
          setIsFirstTime={handleSetIsFirstTime}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
