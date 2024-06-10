import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import NewContactsPage from "./pages/NewContactsPage";
import ContactsPage from "./pages/ContactsPage";

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
    element: <NewContactsPage />,
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
