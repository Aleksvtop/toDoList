import {tasksReducer} from "./tasks-reducer";
import {TodolistReducer} from './todolist-reducer'
import {combineReducers, legacy_createStore} from "redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodolistReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

/*
window.store = store;*/
