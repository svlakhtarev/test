import React, {FC} from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/Post/MyPostsContainer'
import {ProfileType} from '../../Types/Types'

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        saveProfile={props.saveProfile}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}/>
      <div className={style.profile}>
        <MyPostsContainer/>
      </div>
    </div>
  )
}

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

export default Profile
