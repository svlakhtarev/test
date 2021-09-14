import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import chatReducer from './chatReducer'

let rootReduser = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer
})

type RootReducerType = typeof rootReduser
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<AT extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, any, AT>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.__store__ = store

export default store