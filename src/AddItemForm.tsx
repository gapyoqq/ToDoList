import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
        <TextField
            helperText={errorMyMessage}
            variant={"outlined"}
            label={'Type value'}
            error={!!errorMyMessage}
            onKeyPress={onKeyPressHandler}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}/>
        <IconButton
            color={"primary"}
            onClick={addTask}>
            <AddIcon/>
        </IconButton>
    </div>
}
