import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }


    return <div>
        <div>
            <input placeholder={'Enter todolist id'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>Get tasks</button>
            <>{JSON.stringify(state)}</>
        </div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const createTask = () => {
        tasksAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }


    return <div>
        <input placeholder={'Enter task title'} value={taskTitle} onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
        }}/>
        <input placeholder={'Enter todolist id'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>Add new task</button>
        <div> {JSON.stringify(state)}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'Enter Todolist id'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'Enter task id'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}> Delete task</button>
            <div> {JSON.stringify(state)}</div>
        </div>
    </div>
}


export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [description, setDescription] = useState<string>('Description')
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadLine, setDeadLine] = useState<string>('')
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const updateTask = () => {

        tasksAPI.updateTask(todolistId, taskId, {
            deadline: deadLine,
            description: description,
            priority: priority,
            startDate: startDate,
            status: status,
            title: title
        })
            .then(
                (res) => {
                    setState(res.data)
                }
            )
    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Task Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <input placeholder={'Description'} value={description} onChange={(e) => {
            setDescription(e.currentTarget.value)
        }}/>
        <input placeholder={'Status'} value={status} onChange={(e) => {
            setStatus(+e.currentTarget.value)
        }}/>
        <input placeholder={'deadLine'} value={deadLine} onChange={(e) => {
            setDeadLine(e.currentTarget.value)
        }}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'startDate'} value={startDate} onChange={(e) => {
            setStartDate(e.currentTarget.value)
        }}/>
        <input placeholder={'priority'} value={priority} onChange={(e) => {
            setPriority(+e.currentTarget.value)
        }}/>
        <button onClick={updateTask}> Update task</button>
        {JSON.stringify(state)}

    </div>
}
