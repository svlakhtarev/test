import s from "./../Dialogs.module.css";
import React from "react";


const Massage = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Massage;