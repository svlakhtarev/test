import React from 'react';
import {reduxForm} from 'redux-form';
import {
  createField,
  Input,
  MyButton,
  Textarea
} from '../../common/FormsControls/formsContorls';
import style from './../../Login/Login.module.css';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div><MyButton title={"save"}/>
        {error && <div className={style.formSummaryError}>
          {error}
        </div>
        }
      </div>
      <div>
        <strong>Full Name: </strong>
        {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <strong>About Me: </strong>
        {createField("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <strong>Contacts: </strong>
        {Object.keys(profile.contacts).map(key => {
          return <div key={key}>
            <strong>{key}:</strong> {createField(key, "contacts." + key, [], Input)}
          </div>
        })}
      </div>
      <div>
        <strong>Looking For A Job: </strong>
        {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
      </div>
      <div>
        <strong>My professional skills: </strong>
        {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
      </div>
    </form>
  )
}

const ProfileDataReduxFrom = reduxForm({form: "editProfile"})(ProfileDataForm)

export default ProfileDataReduxFrom;
