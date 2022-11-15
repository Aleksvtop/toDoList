import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "React API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone === false)
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
