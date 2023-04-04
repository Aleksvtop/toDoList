import React /*{ChangeEvent}*/ from 'react';
import {FilterValuesType} from './AppWithReducers';
import SuperInput from "./components/SuperInput";
import EditableSpan from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
//import Checkbox from '@mui/material/Checkbox'
import {SuperCheckBox} from "./components/SuperCheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistId: string) => void
    editTodolist: (todolistID: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.todolistID, newTitle)
    }

    const changeStatusHandler = (tID: string, checkedValue: boolean) => {
        props.changeTaskStatus( tID, checkedValue, props.todolistID)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={editTodolistHandler}/>
            {/*<button onClick={removeTodolistHandler}>X</button>*/}
            <IconButton arial-label='delete' onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <SuperInput callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }*/

                    const editTaskHandler = (newTitle: string) => {
                        props.editTask(props.todolistID, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckBox callBack={(checkedValue) => changeStatusHandler(t.id, checkedValue)} isDone={t.isDone}/>
                        {/*<Checkbox onChange={onChangeHandler} checked={t.isDone}/>*/}
                        {/*<input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>*/}
                        <EditableSpan oldTitle={t.title} callBack={editTaskHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton arial-label='delete' onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button size='small' variant={props.filter === 'all'?'outlined':'contained'} onClick={onAllClickHandler} color='success'>All</Button>
            <Button size='small' variant={props.filter === 'active'?'outlined':'contained'} onClick={onActiveClickHandler} color='error'>Active</Button>
            <Button size='small' variant={props.filter === 'completed'?'outlined':'contained'} onClick={onCompletedClickHandler} color='secondary'>Completed</Button>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
        </div>
    </div>
}
