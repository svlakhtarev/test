import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import style from './ProfileInfo.module.css'

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value)
  }

  return (
    <div className={style.profileStatus}>
      {!editMode &&
      <span onDoubleClick={activateEditMode}>
            {props.status
            || 'No status'}
         </span>}
      {editMode &&
      <input onChange={onStatusChange}
             autoFocus={true}
             onBlur={deactivateEditMode}
             value={status}/>}
    </div>)
}

export default ProfileStatusWithHooks
