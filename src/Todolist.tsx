import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App";




type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value = {title}
                onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={() => {props.addTask(title); setTitle("")} }>+</button>
        </div>
        <ul>
            {props.tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input type='checkbox' checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>✖</button>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }
            }>All
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }
            }>Active
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }
            }>Completed
            </button>
        </div>
    </div>
}
