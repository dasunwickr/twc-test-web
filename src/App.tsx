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

const isAuthenticated = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? <Welcome /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/contacts",
    element: isAuthenticated ? <Contacts /> : <Navigate to="/login" />,
  },
  {
    path: "/contacts/new",
    element: isAuthenticated ? (
      <NewContacts firstTime={isFirstTimeUser()} />
    ) : (
      <Navigate to="/login" />
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
