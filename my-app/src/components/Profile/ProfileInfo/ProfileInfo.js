import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWhithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) return <Preloader/>

    return (
        <div>
            {/*<div>
                <img className={s.pImg}
                     src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
            </div>*/}
            <div className={s.description}>
                <div>
                    <img src={props.profile.photos.large}/>
                </div>
                <div>
                    <strong>Status: </strong>
                    <i><u><ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus}/></u></i>
                </div>
                <div>
                    <strong>Full Name: </strong>
                    {props.profile.fullName}
                </div>
                <div>
                    <strong>About Me: </strong>
                    {props.profile.aboutMe}
                </div>
                <div>
                    <strong>Contacts:</strong>
                </div>
                <div>{props.profile.contacts.facebook}</div>
                <div>{props.profile.contacts.website}</div>
                <div>{props.profile.contacts.vk}</div>
                <div>{props.profile.contacts.twitter}</div>
                <div>{props.profile.contacts.instagram}</div>
                <div>{props.profile.contacts.youtube}</div>
                <div>{props.profile.contacts.github}</div>
                <div>{props.profile.contacts.mainLink}</div>
                <div>
                    <strong>Looking For A Job: </strong>
                    {props.profile.lookingForAJob}
                    {props.profile.lookingForAJobDescription}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;