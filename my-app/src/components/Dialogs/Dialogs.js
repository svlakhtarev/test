import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Message";

const Dialogs = (props) => {

    let dialogs = [
        {id: 1, name: 'Name 1'},
        {id: 2, name: 'Name 2'}
    ]

    let messages = [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'How are you?'}
    ]

    let dialogsElement = dialogs.map (d => <DialogItem name={d.name} id={d.id}/> );
    let messagesElements = messages.map (m => <Massage message={m.message}/> );

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