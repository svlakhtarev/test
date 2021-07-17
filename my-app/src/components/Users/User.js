import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Users.module.css';
import userPhoto from '../../assets/images/1200px-User_with_smile.svg.png';
import {MyButton} from '../common/FormsControls/formsContorls';

const User = ({
                user,
                unfollow,
                follow,
                followingInProgress
              }) => {
  return (
    <div className={style.userList}>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null
              ? user.photos.small
              : userPhoto}
                 className={style.userPhoto}
                 alt={''}/>
          </NavLink>
        </div>
        <div>{user.followed ?
          <MyButton onClick={() => {
            unfollow(user.id)
          }}
                    title={"Unfollow"}
                    disabled={followingInProgress.some(id => id === user.id)}/>
          : <MyButton onClick={() => {
            follow(user.id);
          }}
                      title={"Follow"}
                      disabled={followingInProgress.some(id => id === user.id)}/>}
        </div>
      </span>
      <span>
        <div>
          <strong>
            {user.name}
          </strong>
        </div>
        <div>
          {user.status}
        </div>
      </span>
    </div>
  )
}

export default User;
