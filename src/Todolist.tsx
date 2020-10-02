import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";




export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [errorMyMessage, setErrorMyMessage] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorMyMessage(null)
        if (e.charCode == 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(),props.id)
            setNewTaskTitle('')
        }
        else {
            setErrorMyMessage('Title is required')
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)

    }
    const onActiveClickHandler = () => {
        props.changeFilter('active',props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id)
    }
const removeTodolist =  () => {
        props.removeTodolist(props.id)
}

    return <div>
        <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
        <div>
            <input
                className={errorMyMessage ? 'error' : ''}
                onKeyPress={onKeyPressHandler}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}/>
            <button onClick={addTask}>
                +
            </button>

            {errorMyMessage && <div className='error-message'>{errorMyMessage}</div>}

        </div>
        {
            props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(t.id,props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(t.id, e.currentTarget.checked,props.id)
                }

                return <li key={t.id} className={t.isDone? 'is-done':''}><input
                    type="checkbox"
                    onChange={onChangeHandler}
                    checked={t.isDone}
                /> <span>{t.title}</span>
                    <button onClick={onRemoveHandler}>x
                    </button>
                </li>
            })
        }
        <div>
            <button className={props.filter === 'all'? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active'? 'active-filter': ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed'? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

