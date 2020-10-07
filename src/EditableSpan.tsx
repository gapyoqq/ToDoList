import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    OnChangeCallback:(newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title,setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.OnChangeCallback(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
        ? <input onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

