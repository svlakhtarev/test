import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  follow,
  requestUsers,
  setCurrentPage,
  ToggleFollowingProgress,
  unfollow
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from './UsersSelectors';


class UsersContainer extends React.Component {
  componentDidMount() {
    let {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    let pageSize = this.props;
    this.props.getUsers(pageNumber, pageSize);
  }

  render() {
    return <>
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

let mapStateToProps = (state) => {
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
  connect(
    mapStateToProps, {
      follow,
      unfollow,
      setCurrentPage,
      ToggleFollowingProgress,
      getUsers: requestUsers
    }),
  withAuthRedirect
)(UsersContainer)
