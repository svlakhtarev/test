import {InferActionsTypes} from './reduxStore'

type DialogsType = {
  id: number
  name: string
}
type MassageType = {
  id: number
  message: string
}
type ActionsType = InferActionsTypes<typeof actions>
export type initialStateType = typeof initialState
export const actions = {
  sendMessage: (newMessageBody: string) => ({
    type: 'SEND_MESSAGE', newMessageBody
  } as const)
}

let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Name 1'
    },
    {
      id: 2,
      name: 'Name 2'
    }
  ] as Array<DialogsType>,
  messages: [
    {
      id: 1,
      message: 'Hi!'
    },
    {
      id: 2,
      message: 'How are you?'
    }
  ] as Array<MassageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages,
          {
            id: 3,
            message: body
          }]
      }
    default:
      return state
  }
}

export default dialogsReducer