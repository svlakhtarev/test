import React, {FC} from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {initialStateType} from '../../redux/dialogsReducer'
import AddMessageForm from './Message/AddMessageFrom'

type OwnPropsType = {
  dialogPage: initialStateType
  sendMessage: (messageText: string) => void
}
export type NewMsgFormValueType = {
  newMessageBody: string
}
const Dialogs: FC<OwnPropsType> = (props) => {

  let state = props.dialogPage
  let dialogsElement = state.dialogs.map(d =>
    <DialogItem name={d.name}
                key={d.id}
                id={d.id}/>)
  let messagesElements = state.messages.map(m =>
    <Message message={m.message}
             key={m.id}/>)
  let addNewMessage = (value: NewMsgFormValueType) => {
    props.sendMessage(value.newMessageBody)
  }

  return (
    <div className={style.dialogs}>
      <div className={style.dialogs_items}>
        {dialogsElement}
      </div>
      <div className={style.messages}>
        <div>{messagesElements}</div>
        <AddMessageForm
          onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs
