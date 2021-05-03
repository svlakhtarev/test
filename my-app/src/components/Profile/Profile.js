import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <div className={s.profile}>
                <MyPosts posts={props.state.posts} />
            </div>
        </div>
    )
}

export default Profile;