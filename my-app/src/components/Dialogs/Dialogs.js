import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Message";

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogs.map (d => <DialogItem name={d.name} id={d.id}/> );
    let messagesElements = props.state.messages.map (m => <Massage message={m.message}/> );

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;