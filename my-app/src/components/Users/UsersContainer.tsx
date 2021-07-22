import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {
  follow,
  requestUsers,
  unfollow
} from '../../redux/usersReducer'
import {AppStateType} from '../../redux/reduxStore'
import Preloader from '../common/Preloader'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
import {UserType} from '../../Types/Types'
import Users from './Users'
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from './UsersSelectors'

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  totalUsersCount: number
  isFetching: boolean
  users: Array<UserType>
  followingInProgress: Array<number>
}
type MapDispatchPropsType = {
  unfollow: (userID: number) => void
  follow: (userID: number) => void
  getUsers: (currentPage: number,
             pageSize: number) => void
}
type OwnPropsType = {
  pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let {currentPage, pageSize} = this.props
    this.props.getUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props
    this.props.getUsers(pageNumber, pageSize)
  }

  render() {
    return <>
      <h1>{this.props.pageTitle}</h1>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             followingInProgress={this.props.followingInProgress}/></>
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    AppStateType>(
    mapStateToProps, {
      follow,
      unfollow,
      getUsers: requestUsers
    }),
  withAuthRedirect
)(UsersContainer) as ComponentType
