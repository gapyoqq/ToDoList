import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";


export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchTasksReducer(action)
    }


    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, todolistId, newTitle)
        dispatchTasksReducer(action)
    }


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchTasksReducer(action)
    }

    function addTask(newTaskTitle: string, todolistId: string) {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatchTasksReducer(action)
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatchToDolistsReducer(action)
    }

    let removeTodolist = (todolistId: string) => {
        dispatchToDolistsReducer(removeTodolistAC(todolistId))
        dispatchTasksReducer(removeTodolistAC(todolistId))
    }
    let changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToDolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    function addTodolist(title: string) {
        dispatchToDolistsReducer(addTodolistAC(title))
        dispatchTasksReducer(addTodolistAC(title))
    }


    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, dispatchToDolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todolistId2]: [{id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false}]
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid
                    spacing={3}
                    container>
                    {
                        todolists.map((tl) => {
                        let tasksForTodoList: Array<TaskType> = tasksObj[tl.id];

                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    changeTaskTitle={changeTaskTitle}
                                    key={tl.id}
                                    id={tl.id}
                                    removeTask={removeTask}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist} changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                    }</Grid>
            </Container>
        </div>
    );
}


export default AppWithReducers;
