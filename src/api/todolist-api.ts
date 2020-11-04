import axios from 'axios'
import {TodolistDataType, TodolistDomainType} from "../state/todolists-reducer";

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '2ab06da3-ea5f-4726-b6a5-ae0f930da8a3'
        },
    }
)



export type ResponseType<D = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: D
}


export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodolistDomainType[]>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistDataType }>>('todo-lists', {title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}


