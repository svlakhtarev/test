import React, {FC} from 'react'
import style from './../Dialogs.module.css'

const Message: FC<PropsType> = ({message}) => {
  return (
    <div className={style.message}>{message}</div>
  )
}

type PropsType = {
  message: string
}

export default Message
