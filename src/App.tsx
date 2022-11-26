import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "React API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')



    const getFilteredTasks =(tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter){
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }

    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    /*const addTask = (title: string) => {
        setTasks([{id:v1(),title,isDone: false},...tasks])
    }*/
    //выше представлена сокращенная запись (тяжелее дебажить и рефакторить)
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = [...tasks]
        copyTasks.unshift(newTask)
        setTasks(copyTasks)
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
