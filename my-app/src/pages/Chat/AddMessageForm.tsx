import React, {FC, useEffect, useState} from 'react'
import {Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage} from '../../redux/chatReducer'
import {AppStateType} from '../../redux/reduxStore'

export const AddMessageForm: FC<{}> = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
      <Button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</Button>
    </div>
  </div>
}
