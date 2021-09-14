let subscribers = {
  'message-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventsNames = 'message-received' | 'status-changed'

const closeHandler = () => {
  notyfySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['message-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
  notyfySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notyfySubscribersAboutStatus('error')
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notyfySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notyfySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['message-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsNames, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventsNames, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageAPIType = {
  message: string,
  photo: string,
  userID: number,
  userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
