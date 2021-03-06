import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Profile from "./Profile";
import {
    getStatus,
    getUserProfile,
    updateStatus
} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = this.props.AuthorizedUserID;
            if (!userID) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    AuthorizedUserID: state.auth.userID,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);