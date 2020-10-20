import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}
export type  ActionsType =
    RemoveTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let filteredTasks = tasks.filter((t) => t.id !== action.taskId
            )
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...stateCopy[action.todolistId]]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find((t) => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find((t) => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId, isDone, todolistId
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId, title, todolistId
    }
}


