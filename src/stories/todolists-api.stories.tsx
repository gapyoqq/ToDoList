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
                setState(res.data.data.item)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '92c83b44-d0df-47fd-9576-ac4fd3bebbad'
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
        const todolistId = '5e73a8cc-b3a8-4314-b75e-4432d4416e0e'
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
