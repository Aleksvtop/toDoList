import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId);
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const tasksListItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            const removeTask = () => {
                props.removeTask(task.id, props.todoListId)
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
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
    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => {
            props.changeFilter(filter, props.todoListId)
        }
    }

    return <div>
        <h3>
            {props.title}
            <button>X</button>
        </h3>
        <div>
            <input
                value={title}
                onKeyDown={onEnterAddTask}
                onChange={setLocalTitle}
                className={error ? 'input-error' : ''}
            />

            <button onClick={addTask}>+</button>
            {error && <div style={{fontWeight: 'bold', color: 'red'}}>Please, enter your task</div>}
        </div>
        <ul>
            {tasksListItems}
        </ul>
        <div>
            <button
                className={props.filter === 'all' ? 'btn-active' : ''}
                onClick={onClickHandlerCreator('all')}>All
            </button>
            <button
                className={props.filter === 'active' ? 'btn-active' : ''}
                onClick={onClickHandlerCreator('active')}>Active
            </button>
            <button
                className={props.filter === 'completed' ? 'btn-active' : ''}
                onClick={onClickHandlerCreator('completed')}>Completed
            </button>
        </div>
    </div>
}
