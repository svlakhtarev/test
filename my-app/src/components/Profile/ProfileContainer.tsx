import React, {ComponentType} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Profile from './Profile'
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profileReducer'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
import {ProfileType} from '../../Types/Types'
import {AppStateType} from '../../redux/reduxStore'

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userID: number | null = +this.props.match.params.userID
    if (!userID) {
      userID = this.props.AuthorizedUserID
      if (!userID) {
        this.props.history.push('/login')
      }
    }
    if (!userID) {
      throw new Error('ID should exists')
    } else {
      this.props.getUserProfile(userID)
      this.props.getStatus(userID)
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile()
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

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  AuthorizedUserID: state.auth.userID,
  isAuth: state.auth.isAuth
})

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userID: number) => void
  getStatus: (userID: number) => void
  updateStatus: (text: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
  userID: string
}
type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

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
)(ProfileContainer) as ComponentType
