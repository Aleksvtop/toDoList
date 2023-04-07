import {TasksStateType} from "../../AppWithReducers";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";
//import {addTodolistACType} from "./todolist-state";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusType |
    ChangeTaskTitleType |
    AddTodolistACType |
    RemoveTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
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

        case 'REMOVE-TODOLIST': {
            //решение с помощью деструктуризации:
            /*const {[action.id]: [], ...rest} = {...state}
            return rest*/
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
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

