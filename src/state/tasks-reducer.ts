import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";


export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'completed' | 'active'


export type  ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof addTaskAC>


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
            const stateCopy = {...state}
            let tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
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


export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task
} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    status,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskId, title, todolistId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => (
    {type: 'SET-TASKS', tasks, todolistId} as const)



export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
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

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

export const changeTaskTitleTC = (taskId: string, todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks[todolistId]
    const currentTask = tasks.find((t) => {
        return t.id === taskId
    })
    if (currentTask) {
        tasksAPI.updateTask(todolistId, taskId, {
            status: currentTask.status,
            deadline: currentTask.deadline,
            description: currentTask.description,
            priority: currentTask.priority,
            title: title,
            startDate: currentTask.startDate
        })
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
    }
}

