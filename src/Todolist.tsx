import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)

    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
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
            <button onClick={removeTodolist}>x</button>
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

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input
                    type="checkbox"
                    onChange={onChangeStatusHandler}
                    checked={t.isDone}
                />
                    <EditableSpan OnChangeCallback={onChangeTitleHandler} title={t.title}/>
                    <button onClick={onRemoveHandler}>x
                    </button>
                </li>
            })
        }
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


