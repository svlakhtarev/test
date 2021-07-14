import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/formsContorls";
import {maxLenghtCreator, required} from "../../utils/validators/validators";

//Messages page
const Dialogs = (props) => {
    let state = props.dialogPage;

    //Show dialogs
    let dialogsElement = state.dialogs.map(d =>
        <DialogItem name={d.name}
                    key={d.id}
                    id={d.id}/>);

    //Show messages from dialog
    let messagesElements = state.messages.map(m =>
        <Message message={m.message}
                 key={m.id}/>);

    //Send message
    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    };


    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux
                    onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

//validator message lenght
const maxLenght200 = maxLenghtCreator(200);

//Massege form
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLenght200]}
                       name={"newMessageBody"}
                       placeholder='Enter your message'/>
            </div>
            <div>
                <button className={s.button}>Send</button>
            </div>
        </form>
    )
}

//Handler for redux form
const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;