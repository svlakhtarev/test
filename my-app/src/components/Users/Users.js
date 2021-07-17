import React from 'react';
import style from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({
                 unfollow,
                 follow,
                 followingInProgress,
                 users,
                 currentPage,
                 onPageChanged,
                 totalUsersCount,
                 pageSize
               }) => {
  return <div className={style.users}>
    <Paginator currentPage={currentPage}
               onPageChanged={onPageChanged}
               totalItemsCount={totalUsersCount}
               pageSize={pageSize}/>
    <div>
      {users.map(u =>
        <User user={u}
              key={u.id}
              followingInProgress={followingInProgress}
              unfollow={unfollow}
              follow={follow}/>)
      }
    </div>
  </div>
}

export default Users;
