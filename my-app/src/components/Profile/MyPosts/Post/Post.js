import React from 'react';
import style from './Post.module.css';
import userPhoto from '../../../../assets/images/1200px-User_with_smile.svg.png';


const Post = ({name, message, likesCount}) => {
  return (
    <div className={style.postBody}>
      <img src={userPhoto} alt={''}/>
      <div>{name}</div>
      <div>{message}</div>
      <div>{likesCount}</div>
    </div>
  )
}

export default Post;
