import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    const addTask = () => {props.addTask(title); setTitle("")}
    const setLocalTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTask()
        }
    }
    const tasksListItems = props.tasks.map((task:TaskType) => {
        const removeTask = () => {
            props.removeTask(task.id)
        }
            return (
                <li key={task.id}>
                    <input type='checkbox' checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>✖</button>
                </li>
            )
        })
    const onClickHandlerCreator = (filter:FilterValuesType) => {
        return () => {props.changeFilter(filter)}
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value = {title}
                onKeyDown={onEnterAddTask}
                onChange={setLocalTitle}/>
            <button onClick= {addTask} >+</button>
        </div>
        <ul>
            {tasksListItems}
        </ul>
        <div>
            <button onClick={onClickHandlerCreator('all')}>All</button>
            <button onClick={onClickHandlerCreator('active')}>Active</button>
            <button onClick={onClickHandlerCreator('completed')}>Completed</button>
        </div>
    </div>
}
