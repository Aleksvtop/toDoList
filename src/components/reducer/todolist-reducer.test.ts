import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistsType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {

    // const endState = TodolistReducer(startState, {type:'REMOVE-TODOLIST', id: todolistId1})
    const endState = TodolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () =>{

    let newTodolistTitle = 'New Todolist'

    const endState = TodolistReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () =>{

    let newTodolistTitle = 'New Todolist'

    // const endState = TodolistReducer(startState, {type:'ADD-TODOLIST', title: newTodolistTitle})
    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }*/
    const endState = TodolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () =>{

    let newFilter: FilterValuesType = 'completed'

    // const endState = TodolistReducer(startState, {type:'ADD-TODOLIST', title: newTodolistTitle})
    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }*/
    const endState = TodolistReducer(startState, changeFilterAC(todolistId2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
