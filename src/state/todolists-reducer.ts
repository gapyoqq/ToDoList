
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
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todos: TodolistDomainType[]
}
export type  ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
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
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
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


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        title: title,
        type: "CHANGE-TODOLIST-TITLE",
        id: id
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        id,
        filter,
        type: "CHANGE-TODOLIST-FILTER"
    }
}

export const setTodolistsAC = (todos: Array<TodolistDomainType>): SetTodolistsActionType => ({
    type: 'SET-TODOLISTS', todos
} as const)



export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists().then( (res)=> {
        let todos = res.data
        dispatch(setTodolistsAC(todos))
    })
}
