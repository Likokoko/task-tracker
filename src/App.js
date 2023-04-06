import "./App.css";

import { AuthContextProvider } from "./contexts/AuthContext";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./route";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  );
}

export default App;
