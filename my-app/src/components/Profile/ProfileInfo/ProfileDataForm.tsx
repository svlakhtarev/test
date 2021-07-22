import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {
  createField, GetStringKeys,
  Input,
  MyButtonString,
  Textarea
} from '../../common/FormsControls/formsContorls'
import style from './../../Login/Login.module.css'
import {ProfileType} from '../../../Types/Types'

type PropsType = {
  profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div><MyButtonString title={'save'}/>
        {error && <div className={style.formSummaryError}>
          {error}
        </div>
        }
      </div>
      <div>
        <strong>Full Name: </strong>
        {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
      </div>
      <div>
        <strong>About Me: </strong>
        {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
      </div>
      <div>
        <strong>Contacts: </strong>
        {Object.keys(profile.contacts).map(key => {
          return <div key={key}>
            <strong>{key}:</strong> {createField(key, 'contacts.' + key, [], Input)}
          </div>
        })}
      </div>
      <div>
        <strong>Looking For A Job: </strong>
        {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
      </div>
      <div>
        <strong>My professional skills: </strong>
        {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Textarea)}
      </div>
    </form>
  )
}

const ProfileDataReduxFrom = reduxForm<ProfileType, PropsType>({form: 'editProfile'})(ProfileDataForm)

export default ProfileDataReduxFrom
