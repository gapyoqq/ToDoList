import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]

}

function App() {

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id
        )
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(newTaskTitle: string, todolistId: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasksObj[todolistId]]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter((t => t.id !== todolistId))
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todolistId2]: [{id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false}]
    })

    function addTodolist(title: string) {

        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }

        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {

                todolists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        removeTask={removeTask}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}


export default App;
