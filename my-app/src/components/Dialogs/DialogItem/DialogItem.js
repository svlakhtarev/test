import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './../Dialogs.module.css';

//Dialogs list on Messages
const DialogItem = ({name, id}) => {
  return (
    <div className={style.dialog}>
      <NavLink to={'/dialogs/' + id}>
        {name}
      </NavLink>
    </div>
  )
}

export default DialogItem;
