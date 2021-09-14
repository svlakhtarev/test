import React, {FC, useEffect, useRef, useState} from 'react'
import {Message} from './Message'
import style from './ChatPages.module.css'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/reduxStore'

export const Messages: FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }
  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  return (
    <div className={style.messagesChat} onScroll={scrollHandler}>
      {messages.map((m, index) => <Message key={m.id} message={m}/>)}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}
