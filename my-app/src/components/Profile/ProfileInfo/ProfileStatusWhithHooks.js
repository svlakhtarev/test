import React, {useState} from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {

    let stateWithSetState = useState(false);
    let editMode = stateWithSetState[0];
    let SetEditMode = stateWithSetState[1];

    return (
        <div className={s.profileStatus}>
            {!editMode &&
            <div>
                    <span>
                        {props.status
                        || 'No status'}
                    </span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true}/>
            </div>}
        </div>)
}

export default ProfileStatusWithHooks;