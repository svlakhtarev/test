import React from 'react';
import style from './../Dialogs.module.css';

//Messages in open dialog
const Message = ({message}) => {
  return (
    <div className={style.message}>{message}</div>
  )
}

export default Message;
