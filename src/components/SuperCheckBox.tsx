import React, {ChangeEvent} from 'react';

type SuperCheckBoxType = {
    isDone: boolean,
    callBack: (checkedValue: boolean) => void
}

export const SuperCheckBox = (props: SuperCheckBoxType) => {
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               onChange={onChangeHandler}
               checked={props.isDone}/>
    );
};

