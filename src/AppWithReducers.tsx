import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import SuperInput from "./components/SuperInput";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./components/reducer/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./components/reducer/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key:string]:TaskType[]
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(taskID: string, todolistID: string) {
        //let action = removeTaskAC(taskID, todolistID)
        dispatchToTasks(removeTaskAC(todolistID, taskID))
    }

    function addTask(title: string, todolistID:string) {
        dispatchToTasks(addTaskAC(todolistID, title))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID:string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    const editTask = (taskId: string, newTitle:string, todolistID:string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodolist=(newTitle:string)=>{
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchToTodolists(changeFilterAC(todolistID, value))
    }

    const editTodolist = (todolistID: string, newTodolistTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, newTodolistTitle))
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

export default AppWithReducers;
