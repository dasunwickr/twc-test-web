import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/user/Login";
import Contacts from "./pages/Contacts";
import NewContacts from "./pages/NewContacts";
import Welcome from "./pages/Welcome";

const isFirstTimeUser = () => {
  return false;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
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
    element: <NewContacts firstTime={isFirstTimeUser()} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
