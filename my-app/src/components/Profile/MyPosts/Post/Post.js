import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.postBody}>
            <img src='https://i2.wp.com/nopcproblem.ru/wp-content/uploads/2019/05/discord-logo.png'/>
            <div>{props.name}</div>
            <div>{props.massage}</div>
            <div>{props.like}</div>
        </div>
    )
}

export default Post;