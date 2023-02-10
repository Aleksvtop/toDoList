import React, {ChangeEvent, useState} from 'react';

type PropsEditType = {
    oldTitle: string
    callBack: (newTask: string) => void
}

const EditableSpan = (props: PropsEditType) => {
    let [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        edit ?
            <input onChange={onChangeHandler} value={newTitle} onBlur={editHandler} autoFocus/> :
            <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;