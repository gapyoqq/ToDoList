import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [errorMyMessage, setErrorMyMessage] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorMyMessage(null)
        if (e.charCode == 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setErrorMyMessage('Title is required')
        }
    }

    return <div>
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
}
