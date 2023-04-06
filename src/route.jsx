import { First } from "./pages/First";
import Login from "./task/Login";
import TaskDetail from "./pages/TaskDetail";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/tasks/:id",
    element: <TaskDetail />,
  },
  {
    path: "/tasks",
    element: <First />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);
