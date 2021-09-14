import React, {FC} from 'react'
import style from './Post.module.css'
import userPhoto from '../../../../assets/images/1200px-User_with_smile.svg.png'

const Post: FC<PropsType> = ({message, likesCount}) => {
  return (
    <div className={style.postBody}>
      <img src={userPhoto} alt={''}/>
      <div>{message}</div>
      <div>{likesCount}</div>
    </div>
  )
}

type PropsType = {
  message: string
  likesCount: number
}

export default Post
