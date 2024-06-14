import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Contacts from "./pages/Contacts";
import NewContacts from "./pages/NewContacts";

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
    element: isAuthenticated ? <NewContacts /> : <Navigate to="/login" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
