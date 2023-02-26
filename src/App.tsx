import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import SuperInput from "./components/SuperInput";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id!==todolistID))
        delete tasks[todolistID]
    }

    const editTask = (todolistID:string, taskID: string, newTitle:string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el => el.id === taskID ? {...el, title : newTitle} : el)})
    }

    const editTodolist = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title : newTitle}: tl ))
    }

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el => el.id!==taskID)})
    }

    function addTask(todolistID:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:[ newTask,...tasks[todolistID]]});
    }

    function changeStatus(todolistID:string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el => el.id === taskId ? {...el, isDone}: el)})
    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        // setFilter(value);
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    const addTodolist=(newTitle:string)=>{
        const newTodolistId = v1()
        const newTodolist: TodolistsType={id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({[newTodolistId]:[],...tasks})
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

export default App;
