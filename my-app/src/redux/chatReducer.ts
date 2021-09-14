import {stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from './reduxStore'
import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chatAPI'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
}

export type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>
type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({
          ...m,
          id: v1()
        }))].filter((m, index, array) => index >= array.length - 100)
      }
    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}

export const actions = {
  messageReceived: (messages: ChatMessageAPIType[]) => ({
    type: 'MESSAGE_RECEIVED', payload: {messages}
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'STATUS_CHANGED', payload: {status}
  } as const)

}
let _newMsgHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMsgHandlerCreator = (dispatch: Dispatch) => {
  if (_newMsgHandler === null) {
    _newMsgHandler = (messages) => {
      dispatch(actions.messageReceived(messages))
    }
  }
  return _newMsgHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('message-received', newMsgHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('message-received', newMsgHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}

export default chatReducer
