import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

type PropsSuperInputType = {
    callBack: (title: string) => void
}

export const SuperInput = (props: PropsSuperInputType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const buttonStyles = {maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px', background: 'aqua'};
    return (

        <div>
            <TextField value={title}
                       id='outlined-basic'
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size='small'
                       label={error?'Title is required':'Welcome'}
                       variant='outlined'
                       error={!!error}
            />
            {/*<input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            {/*<button onClick={addTask}>+</button>*/}
            <Button variant='contained' onClick={addTask} style={buttonStyles}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default SuperInput;