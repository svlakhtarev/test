import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Massage = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                <Dialog name="Name 1" id="1"/>
                <Dialog name="Name 2" id="2"/>
            </div>
            <div className={s.messages}>
                <Massage message="Hi!"/>
            </div>
        </div>
    )
}

export default Dialogs;