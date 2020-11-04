import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";

import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {AppRootStateType} from "./store";


export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string

}


export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'completed' | 'active'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    status: TaskStatuses
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
    | SetTodolistsActionType
    | SetTasksActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
            const task = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...task]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})

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
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {
        type: "ADD-TASK",
        task
    }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId, status, todolistId
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId, title, todolistId
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks,todolistId))
        })
}

export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, taskId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })

}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks[todolistId]
    const currentTask = tasks.find((t) => {
        return t.id === taskId
    })
    if (currentTask) {
        tasksAPI.updateTask(todolistId, taskId, {
            status: status,
            deadline: currentTask.deadline,
            description: currentTask.description,
            priority: currentTask.priority,
            title: currentTask.title,
            startDate: currentTask.startDate
        })
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}

