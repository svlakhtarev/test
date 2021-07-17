import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/objectsHelpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userID,
          "id",
          {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(
          state.users,
          action.userID,
          "id",
          {followed: false})
      }
    case SET_USERS: {
      return {...state, users: action.users}
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.count}
    }
    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress
            .filter(id => id !== action.userID)
      }
    }
    default:
      return state;
  }
}

export const followSuccess = (userID) => ({
  type: FOLLOW,
  userID
})
export const unfollowSuccess = (userID) => ({
  type: UNFOLLOW,
  userID
})
export const setUsers = (users) => ({
  type: SET_USERS,
  users
})
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
})
export const setUsersTotalCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount
})
export const setToggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
})
export const ToggleFollowingProgress = (isFetching, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userID
})

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(setToggleIsFetching(true));

    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setToggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setUsersTotalCount(response.data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch,
                                  userID,
                                  apiMethod,
                                  actionCreator) => {
  dispatch(ToggleFollowingProgress(true, userID));
  let response = await apiMethod(userID);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }
  dispatch(ToggleFollowingProgress(false, userID));
}

export const follow = (userID) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userID,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  }
}
export const unfollow = (userID) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userID,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    );
  }
}

export default usersReducer;
