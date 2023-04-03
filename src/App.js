import './App.css';
import TaskDetail from './task/TaskDetail'
import TaskList from './task/TaskList';
import TaskSearch from './task/TaskSearch';
import Login from './task/Login';
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
