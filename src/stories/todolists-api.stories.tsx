import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'Redux'
        todoListAPI.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ae348b6b-c4bd-45c4-b881-d8703337f27c'
        todoListAPI.deleteTodoList(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5a417b6d-9198-4c49-91ee-a30a9b38742a'
        let title = 'GraphQL'
        todoListAPI.updateTodoList(todolistId, title)
            .then(
                (res) => {
                    setState(res.data)
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
