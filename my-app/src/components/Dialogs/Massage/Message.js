import React from "react";
import s from "./../Dialogs.module.css";

const Massage = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Massage;