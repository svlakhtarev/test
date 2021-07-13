import React from "react";
import s from "./../Dialogs.module.css";

//Messages in open dialog
const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message;