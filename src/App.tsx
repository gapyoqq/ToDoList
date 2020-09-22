import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all')


    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id
        )
        setTasks(filteredTasks)
    }

    function addTask(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }


    /*let tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]*/

    return (
        <div className="App">
            <Todolist
                removeTask={removeTask}
                title="What to learn"
                tasks={tasksForTodoList}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
            {/*<Todolist removeTask={removeTask}
                      title="Songs"
                      initTasks={tasks2}/>*/}
        </div>
    );
}


export default App;
