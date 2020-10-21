import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
        const [newTaskTitle, setNewTaskTitle] = useState('')
        const [error, setError] = useState<string | null>(null)
        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value)
        }
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null)
            }
            if (newTaskTitle.trim() !== '' && e.key == 'Enter') {
                props.addItem(newTaskTitle.trim())
                setNewTaskTitle('')
            }
        }
        const addTask = () => {
            if (error !== null) {
                setError(null)
            }
            if (newTaskTitle.trim() !== '') {
                props.addItem(newTaskTitle.trim())
                setNewTaskTitle('')
            } else {
                setError('Title is required')
            }
        }

        return <div>
            <TextField
                helperText={error}
                variant={"outlined"}
                label={'Type value'}
                error={!!error}
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
)
