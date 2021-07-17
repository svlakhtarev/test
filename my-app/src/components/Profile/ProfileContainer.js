import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Profile from "./Profile";
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus
} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

class ProfileContainer extends React.Component {

  refreshProfile() {
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

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userID}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
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
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
