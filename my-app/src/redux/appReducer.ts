import {getAuthUserData} from './authReducer'
import {InferActionsTypes} from './reduxStore'

let initialState = {
  initialized: false
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess())
    })
}

export default appReducer
