import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';

const Profile = (props) => {
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

export default Profile;
