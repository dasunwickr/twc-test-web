import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages";
import LoginPage from "./pages/login";
import NewContactPage from "./pages/contacts/new";
import ContactsPage from "./pages/contacts";

const router = createBrowserRouter([
  {
    index: true,
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/contacts/new",
    element: <NewContactPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
