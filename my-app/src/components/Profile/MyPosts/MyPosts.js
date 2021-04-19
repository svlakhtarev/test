import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
     <div>
        My Post
      <div>
        New post
      </div>
      <div className={s.posts}>
        <Post name="Name" massage='Msg' like='Like: 1'/>
      </div>
    </div>
    )
}

export default MyPosts;