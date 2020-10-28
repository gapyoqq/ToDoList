import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2ab06da3-ea5f-4726-b6a5-ae0f930da8a3'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            withCredentials: true
        }).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'NewTodoList'}, settings).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ae348b6b-c4bd-45c4-b881-d8703337f27c'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5a417b6d-9198-4c49-91ee-a30a9b38742a'
axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title:'React'},settings).then(
    (res)=> {
        setState(res.data)
    }
)
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
