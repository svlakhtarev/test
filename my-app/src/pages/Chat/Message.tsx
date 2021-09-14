import React, {FC} from 'react'
import style from './ChatPages.module.css'
import {ChatMessageAPIType} from '../../api/chatAPI'

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
  return <div>
    <img className={style.chatUserPhoto} src={message.photo} alt={'chatUserPhoto'}/> <strong>{message.userName}</strong>
    <div>
      {message.message}
    </div>
    <hr/>
  </div>
})
