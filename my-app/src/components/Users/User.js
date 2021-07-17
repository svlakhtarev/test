import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/1200px-User_with_smile.svg.png";
import Paginator from "../common/Paginator/Paginator";

let Users = ({
                 unfollow,
                 follow,
                 followingInProgress,
                 users,
                 currentPage,
                 onPageChanged,
                 totalUsersCount,
                 pageSize
             }) => {
    return <div className={s.users}>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div className={s.userList}>
            {users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={
                                u.photos.small != null
                                    ? u.photos.small
                                    : userPhoto}
                                 className={s.userPhoto}/>
                                 </NavLink>
                        </div>
                         <div>
                             {u.followed
                                 ? <button className={s.button}
                                           disabled={followingInProgress
                                               .some(id => id === u.id)}
                                           onClick={() => {
                                               unfollow(u.id)
                                           }}>
                                     Unfollow</button>
                                 : <button className={s.button}
                                           disabled={followingInProgress
                                               .some(id => id === u.id)}
                                           onClick={() => {
                                               follow(u.id);
                                           }}>
                                     Follow</button>}
                         </div>
                    </span>
                    <span>
                    <span>
                        <div>
                            <strong>
                                {u.name}
                            </strong>
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {"u.location.country"}
                        </div>
                        <div>
                            {"u.location.city"}
                        </div>
                    </span>
                </span>
                </div>
            )}
        </div>
    </div>
}

export default Users;