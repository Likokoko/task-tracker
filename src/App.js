import "./App.css";

import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./task/Login";
import TaskDetail from "./task/TaskDetail";
import TaskList from "./task/TaskList";
import TaskSearch from "./task/TaskSearch";

function App() {
  return (
    <div className="App">
      <Login />
      <TaskSearch />
      <TaskList />
      <TaskDetail />
    </div>
  );
}

export default App;
