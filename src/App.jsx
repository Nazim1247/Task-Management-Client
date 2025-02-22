
import './App.css'
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

function App() {
  
  return (
    <div>
    <div className='lg:flex items-start gap-6 justify-between mt-16 pt-6 w-11/12 mx-auto space-y-4'>
     
      <div className='w-full'>
        <AddTask></AddTask>
      </div>
    <div className='w-full'>
      <ShowTask></ShowTask>
    </div>
    </div>
    </div>
    
  )
}

export default App
