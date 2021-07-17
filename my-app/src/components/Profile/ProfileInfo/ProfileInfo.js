import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWhithHooks';
import userPhoto from './../../../assets/images/1200px-User_with_smile.svg.png'
import ProfileDataForm from './ProfileDataForm';
import {MyButton, MyFile} from '../../common/FormsControls/formsContorls';

const ProfileInfo = ({
                       profile,
                       status,
                       updateStatus,
                       isOwner,
                       savePhoto,
                       saveProfile
                     }) => {

  let [editMode, setEditMode] = useState(false);


  if (!profile) return <Preloader/>

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {
      savePhoto(event.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <div>
      <div className={style.description}>
        <div>
          <img className={style.userPhoto}
               src={profile.photos.large
               || userPhoto}
               alt={''}/>
          <div>
            {isOwner && <MyFile onChange={onMainPhotoSelected}/>}
          </div>
        </div>
        <div className={style.profileStatus}>
          <strong>Status: </strong>
          <ProfileStatusWithHooks
            status={status}
            updateStatus={updateStatus}/>
        </div>
        {editMode ? <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}/>
          : <ProfileData goToEditMode={() => {
            setEditMode(true)
          }} isOwner={isOwner} profile={profile}/>}
      </div>
    </div>
  )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><MyButton onClick={goToEditMode}
                               title={'Edit profile info'}/></div>}
    <div>
      <strong>Full Name: </strong>
      {profile.fullName}
    </div>
    <div>
      <strong>About Me: </strong>
      {profile.aboutMe}
    </div>
    <div>
      <strong>Contacts: </strong>
      <div className={style.contact}> {Object.keys(profile.contacts).map(key => {
        return <Contact key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key]}/>
      })}</div>
    </div>
    <div>
      <strong>Looking For A Job: </strong>
      {profile.lookingForAJob}
      {profile.lookingForAJobDescription}
    </div>
  </div>
}

const Contact = ({contactTitle, contactValue}) => {
  return <div>
    <strong>{contactTitle}: </strong> {contactValue}
  </div>
}

export default ProfileInfo;
