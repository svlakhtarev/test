import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/formsContorls";
import {maxLenghtCreator, required} from "../../utils/validators/validators";

const Dialogs = (props) => {
    let state = props.dialogPage;
    let dialogsElement = state.dialogs.map(d =>
        <DialogItem name={d.name}
                    key={d.id}
                    id={d.id}/>);
    let messagesElements = state.messages.map(m =>
        <Massage message={m.message}
                 key={m.id}/>);

    let addNewMassege = (value) => {
        props.sendMassege(value.newMassegeBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMassegeFormRedux
                    onSubmit={addNewMassege}/>
            </div>
        </div>
    )
}

const maxLenght200 = maxLenghtCreator(200);

const AddMassegeForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLenght200]}
                       name={"newMassegeBody"}
                       placeholder='Enter your massege'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMassegeFormRedux = reduxForm({form: "dialogAddMassegeForm"})(AddMassegeForm)

export default Dialogs;