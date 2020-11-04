import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    changeTaskTitleAC, addTaskTC, deleteTaskTC,
    FilterValuesType,
    TasksStateType, updateTaskStatusTC,
} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, getTodolistsTC,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/tasks-api";


function AppWithRedux() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])


    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(taskId, todolistId, status))
    }, [dispatch])


    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(taskTitle, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))

    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])


    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

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
                        todoLists.map((tl) => {
                            let tasksForTodoList: Array<TaskType> = tasks[tl.id];
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


export default AppWithRedux;
