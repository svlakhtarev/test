import s from "./ProfileInfo.module.css";
import React from "react";


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={s.pImg} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
            </div>
            <div className={s.description}>
                Avatar+ description
            </div>
        </div>
    )
}

export default ProfileInfo;