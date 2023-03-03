import {FilterValuesType, TodolistsType} from "../../App";
import {v1} from "uuid";

export const TodolistReducer = (state: TodolistsType[], action: tsarType):TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST":{
            let newTodolist: TodolistsType = {id: v1(), title: action.payload.newTitle, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.newFilter} : el)
        }
    }
}

type tsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    }as const
}