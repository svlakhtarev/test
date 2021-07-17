import React from 'react';
import {Field, reduxForm} from 'redux-form';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {MyButton, Textarea} from '../common/FormsControls/formsContorls';
import {maxLenghtCreator, required} from '../../utils/validators/validators';

//Messages page
const Dialogs = ({dialogPage, ...props}) => {

  let state = dialogPage;
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
    <div className={style.dialogs}>
      <div className={style.dialogs_items}>
        {dialogsElement}
      </div>
      <div className={style.messages}>
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
const AddMessageForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field component={Textarea}
               validate={[required, maxLenght200]}
               name={"newMessageBody"}
               placeholder="Enter your message"/>
      </div>
      <div>
        <MyButton title={"Send"}/>
      </div>
    </form>
  )
}

//Handler for redux form
const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;
