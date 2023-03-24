import {FilterValuesType, TodolistsType} from "../../App";
import {v1} from "uuid";

export const TodolistReducer = (state: TodolistsType[], action: TodolistACType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodolist ]
        }
        case "CHANGE-TODOLIST-TITLE": {
            /*const editTodolist = (todolistID: string, newTitle: string) => {
                setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title : newTitle}: tl ))*/
            return state.map(tdl => tdl.id === action.payload.id ? {...tdl, title: action.payload.newTodolistTitle} : tdl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tdl => tdl.id === action.payload.id ? {...tdl, filter: action.payload.filter} : tdl)
        }
        default: return state
    }
}
export type TodolistACType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    title: string,
    todolistId: string
}
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) : AddTodolistACType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
        }
}

export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            newTodolistTitle}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}