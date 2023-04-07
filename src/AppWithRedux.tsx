import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import SuperInput from "./components/SuperInput";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
} from "./components/state/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./components/state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key:string]:TaskType[]
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(taskID: string, todolistID: string) {
        //let action = removeTaskAC(taskID, todolistID)
        dispatch(removeTaskAC(todolistID, taskID))
    }

    function addTask(title: string, todolistID:string) {
        dispatch(addTaskAC(todolistID, title))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID:string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    const editTask = (taskId: string, newTitle:string, todolistID:string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    const addTodolist=(newTitle:string)=>{
        let action = addTodolistAC(newTitle)
        dispatch(action)
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, value))
    }

    const editTodolist = (todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
                    <SuperInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }
                        return <Grid item>
                            <Paper style={{padding:'10px'}}>
                            <Todolist key={el.id}
                                      todolistID={el.id}
                                      title={el.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      removeTodolist={removeTodolist}
                                      filter={el.filter}
                                      editTask={editTask}
                                      editTodolist={editTodolist}
                            />
                        </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
