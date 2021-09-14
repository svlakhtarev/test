import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import style from './../Dialogs.module.css'

const DialogItem: FC<PropsType> = ({name, id}) => {
  return (
    <div className={style.dialog}>
      <NavLink to={'/dialogs/' + id}>
        {name}
      </NavLink>
    </div>
  )
}

type PropsType = {
  id: number
  name: string
}

export default DialogItem
