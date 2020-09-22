import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";




export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [errorMyMessage, setErrorMyMessage] = useState<string  | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorMyMessage(null)
        if (e.charCode == 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
        else {
            setErrorMyMessage('Title is requred')
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return <div>
        <h3>{props.title}</h3>
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
                    props.removeTask(t.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(t.id, e.currentTarget.checked)
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

