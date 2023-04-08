import React /*{ChangeEvent}*/ from 'react';
import {FilterValuesType} from './AppWithReducers';
import SuperInput from "./components/SuperInput";
import EditableSpan from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
//import Checkbox from '@mui/material/Checkbox'
import {SuperCheckBox} from "./components/SuperCheckBox";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./components/state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./components/state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeFilterAC(props.todolistID, 'all'))
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.todolistID, 'active'))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.todolistID, 'completed'))

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, props.todolistID))
    }

    const editTodolistHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, newTitle))
    }

    const changeStatusHandler = (tID: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(tID, checkedValue, props.todolistID))
    }

    if(props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if(props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
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
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.todolistID))
                    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }*/

                    const editTaskHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, props.todolistID))
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
