import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const id_1 = v1()
    const id_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: id_1, title: 'What to learn', filter: 'all'},
        {id: id_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [id_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "React API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [id_2]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Water', isDone: false},
        ]
    })

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }

    }

    function changeTodoListFilter(nextFilterValue: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl))
    }

    function removeTask(taskId: string, todoListId: string) {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const copy = [...tasksForUpdate]
        const updatedTasks: Array<TaskType> = copy.filter(task => task.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)
        /*Сокращенная запись
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
         */
        //...tasks - делает копию объекта tasks. Далее по ключу todoListId производим фильтрацию и заносим новый массив
    }

    const addTask = (title: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const updatedTasks: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)
        /*Сокращенная запись:
        setTasks({...tasks, [todoListId]:[newTask, ...tasksForUpdate]})*/
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const updatedTasks: Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)
        /* Сокращенная запись:
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)*/

    }
    const todoListsComponents = todoLists.map((tl: ToDoListType) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist title={tl.title}
                      todoListId={tl.id}
                      tasks={filteredTasks}
                      filter={tl.filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      removeTodoList={removeTodoList}
                      changeTaskStatus={changeTaskStatus}
                      changeFilter={changeTodoListFilter}/>
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
