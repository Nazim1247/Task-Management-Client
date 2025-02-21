
import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks)

  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  },[])

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='flex items-center gap-6 justify-center'>
      <div>
        <AddTask></AddTask>
      </div>
    <div className='flex flex-col gap-6 text-center my-8'>
      <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
      <ListTask tasks={tasks} setTasks={setTasks}></ListTask>
    <div>
      <ShowTask></ShowTask>
    </div>
    </div>
    </div>
    </DndProvider>
  )
}

export default App
