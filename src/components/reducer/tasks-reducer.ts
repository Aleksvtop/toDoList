import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistACType} from "./todolist-reducer";
//import {addTodolistACType} from "./todolist-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusType |
    ChangeTaskTitleType |
    AddTodolistACType
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.payload.todolistId] :
                    state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId] : [{id: v1(), title: action.payload.newTitle, isDone: false},...state[action.payload.todolistId]]
            }
        }

        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payload.todolistId] : [...state[action.payload.todolistId].
                map( task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task) ]
            }
        }

        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId] : state[action.payload.todolistId].
                map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,[action.todolistId] : []
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const addTaskAC = (newTitle: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTitle,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            newTitle,
            todolistId
        }
    } as const
}

