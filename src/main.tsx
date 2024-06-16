import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
