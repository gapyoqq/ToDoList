import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: ( todolistId: string, filter: FilterValuesType) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter(props.id,'all')

    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id,'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id,'completed')
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} OnChangeCallback={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {
            props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(t.id, props.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(t.id, e.currentTarget.checked, props.id)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id)
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <Checkbox
                        onChange={onChangeStatusHandler}
                        checked={t.isDone}
                    />
                    <EditableSpan OnChangeCallback={onChangeTitleHandler} title={t.title}/>
                    <IconButton onClick={onRemoveHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            })
        }
        <div>
            <Button variant={props.filter === 'all' ? "contained" : 'text'}
                    onClick={onAllClickHandler}>All</Button>
            <Button
                variant={props.filter === 'active' ? "contained" : 'text'}
                color={"primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? "contained" : 'text'}
                color={"secondary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


