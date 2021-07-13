import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {
    follow,
    requestUsers,
    setCurrentPage,
    ToggleFollowingProgress,
    unfollow
} from "../../redux/usersReducer";
import Users from './Users';
import Preloader from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "./UsersSelectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(
            this.props.currentPage,
            this.props.pageSize
        );
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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
) (UsersContainer)