import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";




type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
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
    const tasksListItems = props.tasks.length
        ? props.tasks.map((task:TaskType) => {

        const removeTask = () => {
            props.removeTask(task.id)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
            return (
                <li key={task.id}>
                    <input
                        type='checkbox'
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={task.isDone ? 'task-done' : ''}>{task.title}</span>
                    <button onClick={removeTask}>✖</button>
                </li>
            )
        })
        : <span>Create your first task</span>
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
            <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('all')}>All</button>
            <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('active')}>Active</button>
            <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('completed')}>Completed</button>
        </div>
    </div>
}
