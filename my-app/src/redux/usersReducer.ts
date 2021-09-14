import {Dispatch} from 'redux'
import {updateObjectInArray} from '../utils/objectsHelpers'
import {UserType} from '../Types/Types'
import {BaseThunkType, InferActionsTypes} from './reduxStore'
import {usersAPI} from '../api/usersAPI'
import {APIResponceType} from '../api/api'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userID,
          'id',
          {followed: true})
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userID,
          'id',
          {followed: false})
      }
    case 'SET_USERS': {
      return {...state, users: action.users}
    }
    case 'SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {...state, totalUsersCount: action.count}
    }
    case 'TOGGLE_IS_FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case 'SET_FILTER': {
      return {...state, filter: action.payload}
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress
            .filter(id => id !== action.userID)
      }
    }
    default:
      return state
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userID: number) => ({
    type: 'FOLLOW',
    userID
  } as const),
  unfollowSuccess: (userID: number) => ({
    type: 'UNFOLLOW',
    userID
  } as const),
  setUsers: (users: Array<UserType>) => ({
    type: 'SET_USERS',
    users
  } as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
  } as const),
  setUsersTotalCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    count: totalUsersCount
  } as const),
  setToggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
  } as const),
  ToggleFollowingProgress: (isFetching: boolean, userID: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userID
  } as const),
  setFilter: (filter: FilterType) => ({
    type: 'SET_FILTER',
    payload: filter
  } as const),
}

export const requestUsers = (currentPage: number,
                             pageSize: number,
                             filter: FilterType): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setToggleIsFetching(true))
    dispatch(actions.setFilter(filter))

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.setToggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userID: number,
                                   apiMethod: (userID: number) => Promise<APIResponceType>,
                                   actionCreator: (userID: number) => ActionsTypes) => {
  dispatch(actions.ToggleFollowingProgress(true, userID))
  let response = await apiMethod(userID)
  if (response.resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(actions.ToggleFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userID,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    )
  }
}
export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userID,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    )
  }
}

export default usersReducer
