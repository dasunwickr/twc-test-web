import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { getToken } from "./util/tokenSerivces";
import { setApiAuthHeader } from "./util/axiosInstance";

const queryClient = new QueryClient();

const token = getToken();

if(token){
  setApiAuthHeader(token);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
