import React, {FC, useEffect} from 'react'
import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import {useDispatch, useSelector} from 'react-redux'
import {startMessagesListening, stopMessagesListening} from '../../redux/chatReducer'
import {AppStateType} from '../../redux/reduxStore'

export const Chat: FC = () => {

  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)
  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return <div>
    {status === 'error' && <div>Some error</div>}
    <>
      <Messages/>
      <AddMessageForm/>
    </>
  </div>
}
