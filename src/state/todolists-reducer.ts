import {v1} from "uuid";
import {todoListAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {FilterValuesType} from "./tasks-reducer";

export type TodolistDataType = {
    id: string
    title: string,
    addedDate?: string,
    order?: number
}
export type TodolistDomainType = TodolistDataType & {
    filter: FilterValuesType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type  ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((t => t.id !== action.id))
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            },
                ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy = [...state]
            const todolist = stateCopy.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const stateCopy = [...state]
            let todolist = stateCopy.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return stateCopy
        }
        case "SET-TODOLISTS": {
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            })
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title: title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    title, type: "CHANGE-TODOLIST-TITLE", todolistId
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    todolistId,
    filter,
    type: "CHANGE-TODOLIST-FILTER"
} as const)
export const setTodolistsAC = (todos: Array<TodolistDomainType>) => ({type: 'SET-TODOLISTS', todos} as const)


export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists().then((res) => {
        let todos = res.data
        dispatch(setTodolistsAC(todos))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodolistAC(title))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodoList(todolistId)
        .then((res) => {
            dispatch(addTodolistAC(todolistId))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

export const changeTodolistFilterTC = (todolistId: string, filter: FilterValuesType) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todolistId, filter)
        .then((res) => {
            dispatch(changeTodolistFilterAC(todolistId, filter))
        })
}


