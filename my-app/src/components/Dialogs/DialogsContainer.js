import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Message";
import {sendMassegeCreator, updateNewMassegeBodyCreator}
    from "../../redux/dialogsReducer";

const Dialogs = (props) => {
    let state = props.store.getState().dialogPage;
    let dialogsElement = state.dialogs
        .map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages
        .map(m => <Massage message={m.message}/>);
    let newMassegeBody = state.newMassegeBody;
    let onSendMassegeClick = () => {
        props.store.dispatch(sendMassegeCreator());
    };
    let onNewMassegeChange = (event) => {
        let body = event.target.value;
        props.store.dispatch(updateNewMassegeBodyCreator(body));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>

                    <div><textarea
                        value={newMassegeBody}
                        onChange={onNewMassegeChange}
                        placeholder='Enter your massege'/></div>
                    <div>
                        <button onClick={onSendMassegeClick}>Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;