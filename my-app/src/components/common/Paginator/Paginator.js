import React from "react";
import s from "./Users.module.css";

const Paginator = () => {
    let pagesCount =
        Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={s.currentPage}>
            {pages.map(p => {
                return <span className={
                    props.currentPage === p && s.selectedPage}
                             onClick={
                                 (e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
            })}
        </div>
    )
}

export default Paginator;