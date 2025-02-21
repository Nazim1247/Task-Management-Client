/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Swal from "sweetalert2";
// import Section from './Section';

const ListTask = ({tasks,setTasks}) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(()=>{
        const fTodos = tasks.filter((task)=> task.status === 'todo');
        const fInProgress = tasks.filter((task)=> task.status === 'inProgress');
        const fDone = tasks.filter((task)=> task.status === 'done');

        setTodos(fTodos)
        setInProgress(fInProgress)
        setDone(fDone)
    },[tasks])

    const statuses = ['todo','inProgress','done'];
// console.log(statuses)
    return (
        <div className="flex items-start gap-16 justify-center mt-6 ">
            {statuses.map((status,index)=>
            (<Section 
            key={index} 
            status={status} 
            tasks={tasks} 
            setTasks={setTasks} 
            todos={todos} 
            inProgress={inProgress} 
            done={done}
            />))}
        </div>
    );
};

export default ListTask;

const Section = ({status,tasks,setTasks,todos,inProgress,done})=>{
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item)=> addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

    let text = 'Todo';
    let bg = 'bg-slate-500';
    let taskToMap = todos;

    if(status === 'inProgress'){
        text = 'In Progress'
        bg = 'bg-purple-500'
        taskToMap = inProgress
    }

    if(status === 'done'){
        text = 'Done'
        bg = 'bg-green-500'
        taskToMap = done
    }

    const addItemToSection = (id)=>{
        // console.log('drop', id, status)
        setTasks((prev)=> {
            // console.log('prev', prev)
            const mTask = prev.map(t => {
                if(t.id === id){
                    return {...t, status: status}
                }
                return t
            })

            localStorage.setItem("tasks",JSON.stringify(mTask))
            return mTask;
        })
    }

    return (
        <div ref={drop} className={`w-64 min-h-screen ${isOver ? "bg-slate-200":""}`}>
            <Header text={text} bg={bg} count={taskToMap.length}/>
            {taskToMap.length > 0 && taskToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>)}
        </div>
    )
}

const Header = ({text, bg,count})=>{
    return (
        <div className={`${bg} flex items-center py-2 px-10 gap-4 rounded-lg justify-center`}>
            <h2>{text}</h2> 
            <div>{count}</div>
        </div>
    )
}

const Task = ({task,tasks,setTasks})=>{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    //   console.log(isDragging)

    const handleRemove = (id)=>{
        // console.log(id)
        const fTask = tasks.filter(t => t.id !== id);

        localStorage.setItem('tasks',JSON.stringify(fTask))

        setTasks(fTask)

        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Removed",
        showConfirmButton: false,
        timer: 1500
        });
    }

    return (
        <div ref={drag} className={`border rounded-lg shadow mt-2 py-2 px-4 ${isDragging ? "opacity-25" : "opacity-100"}`}>
            <div className="flex justify-between items-center">
            <p>{task.name}</p>
            <div className="flex items-center gap-2">
            <button className="btn btn-xs">E</button>
            <button onClick={()=> handleRemove(task.id)} className="btn btn-xs">x</button>
            </div>
            </div>
        </div>
    )
}