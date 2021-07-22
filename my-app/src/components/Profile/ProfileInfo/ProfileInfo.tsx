import React, {ChangeEvent, FC, useState} from 'react'
import style from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWhithHooks'
import userPhoto from './../../../assets/images/1200px-User_with_smile.svg.png'
import ProfileDataForm from './ProfileDataForm'
import {MyButtonClick} from '../../common/FormsControls/formsContorls'
import {ContactsType, ProfileType} from '../../../Types/Types'

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: FC<PropsType> = ({
                                      profile,
                                      status,
                                      updateStatus,
                                      isOwner,
                                      savePhoto,
                                      saveProfile
                                    }) => {

  let [editMode, setEditMode] = useState(false)


  if (!profile) return <Preloader/>

  const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      savePhoto(event.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
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
            {isOwner && <input className={style.file}
                               type={'file'}
                               onChange={onMainPhotoSelected}/>}
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

type PropsProfileDataType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: FC<PropsProfileDataType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><MyButtonClick onClick={goToEditMode}
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
      <div className={style.contact}> {
        Object
          .keys(profile.contacts)
          .map(key => {
            return <Contact key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}/>
          })}</div>
    </div>
    <div>
      <strong>Looking For A Job: </strong>
      {profile.lookingForAJob}
    </div>
    <div>
      <strong>My professional skills: </strong>
      {profile.lookingForAJobDescription}
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div>
    <strong>{contactTitle}: </strong> {contactValue}
  </div>
}

export default ProfileInfo
