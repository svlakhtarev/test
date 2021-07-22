import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../Types/Types'
import {profileAPI} from '../api/profileAPI'
import {BaseThunkType, InferActionsTypes} from './reduxStore'

let initialState = {
  posts: [
    {
      id: 1,
      message: 'Msg',
      likesCount: 12
    },
    {
      id: 2,
      message: 'Msg 2',
      likesCount: 1
    }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ''
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile
      }
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status
      }
    }
    case 'SAVE_PHOTO': {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        } as ProfileType
      }
    }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: 'ADD_POST', newPostText
  }),
  setUserProfile: (profile: ProfileType) => ({
    type: 'SET_USER_PROFILE', profile
  }),
  setStatus: (status: string) => ({
    type: 'SET_STATUS', status
  }),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: 'SAVE_PHOTO', photos
  }),
}

export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userID)
  dispatch(actions.setUserProfile(data))
}
export const getStatus = (userID: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userID)
  dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userID = getState().auth.userID
  const data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    if (userID != null) {
      dispatch(getUserProfile(userID))
    } else {
      throw new Error('userID is null')
    }
  } else {
    dispatch(stopSubmit('editProfile', {_error: data.messages[0]}))
  }
}

export default profileReducer
