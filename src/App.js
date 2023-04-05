import React, { useState, useEffect, Fragment } from "react";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./task/Login";
import TaskDetail from "./task/TaskDetail";
import TaskList from "./task/TaskList";
import TaskSearch from "./task/TaskSearch";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const port = window.location.port;
  const code = new URLSearchParams(port).get("code");

  const handleLogin = () => {
    setLoggedIn(true);
    console.log("hi setLoggedIn true")
  };

  useEffect(() => {
    if (code !== "") {
      setAuthorized(true);
      console.log(true)
    } else {
      setAuthorized(false);
      console.log(false)
    }
  }, [code]);

  return (
    <div>
      {loggedIn && authorized ? (
        <Fragment>
          <TaskSearch />
          <TaskList />
          <TaskDetail />
        </Fragment>
      ) : (
        <Login onSubmit={handleLogin} />
      )}
    </div>
  );
}

export default App;
