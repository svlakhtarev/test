import {stopSubmit} from 'redux-form';
import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO = 'SAVE-PHOTO';

let initialState = {
  posts: [
    {
      id: 1,
      message: "Msg",
      likesCount: "12"
    },
    {
      id: 2,
      message: "Msg 2",
      likesCount: "1"
    }
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case SAVE_PHOTO: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        }
      }
    }
    default:
      return state;
  }
}
const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE, profile
});

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST, newPostText
});
export const setStatus = (status) => ({
  type: SET_STATUS, status
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO, photos
});

export const getUserProfile = (userID) => async (dispatch) => {
  let response = await profileAPI.getProfile(userID);
  dispatch(setUserProfile(response.data));
};
export const getStatus = (userID) => async (dispatch) => {
  let response = await profileAPI.getStatus(userID);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userID = getState().auth.userID;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userID));
  } else {
    dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}));
  }
};

export default profileReducer;
