import {connect} from 'react-redux'
import MyPosts, {DispatchMyPostPropsType, MapMyPostsPropsType} from '../MyPosts'
import {actions} from '../../../../redux/profileReducer'
import {AppStateType} from '../../../../redux/reduxStore'

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
}

const MyPostsContainer = connect<MapMyPostsPropsType, DispatchMyPostPropsType, {}, AppStateType>(
  mapStateToProps, {
    addPost: actions.addPostActionCreator
  }
)(MyPosts)

export default MyPostsContainer
