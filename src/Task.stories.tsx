import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const changeTaskStatusCallback = action('Status changed ')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')




export const TaskBaseExample = () => {
    return <>
        <Task changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
              task={{id: '1', title:'Css', isDone:true}}
              todoListId={'todolistId1'}
              />
        <Task changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
              task={{id: '2', title:'JS', isDone:false}}
              todoListId={'todolistId2'}
              />
        </>
}
