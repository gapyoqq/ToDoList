import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";



export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}



const ValueCallback = action('Value changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan OnChangeCallback={ValueCallback} title={'start value'}/>
}
