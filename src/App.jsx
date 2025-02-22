
// import { useEffect, useState } from 'react'
import './App.css'
// import CreateTask from './components/CreateTask';
// import ListTask from './components/ListTask';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import AuthProvider from './components/AuthProvider';

// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import Navbar from './components/Navbar';
// import { Outlet } from 'react-router';

// const queryClient = new QueryClient()

function App() {
  // const [tasks, setTasks] = useState([]);
  // console.log(tasks)

  // useEffect(()=>{
  //   setTasks(JSON.parse(localStorage.getItem('tasks')))
  // },[])

  return (
    // <AuthProvider>
    //   <QueryClientProvider client={queryClient}>
    //   <DndProvider backend={HTML5Backend}>

    
    <div>
    <div className='flex items-start gap-6 justify-center'>
     
      <div>
        <AddTask></AddTask>
      </div>
    {/* <div className='flex flex-col gap-6 text-center my-8'>
      <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
      <ListTask tasks={tasks} setTasks={setTasks}></ListTask>
    </div> */}
    <div>
      <ShowTask></ShowTask>
    </div>
    </div>
    </div>
    
  )
}

export default App
