import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Msg', likesCount: '12'},
        {id: 2, message: 'Msg 2', likesCount: '1'}
    ]

    let postsElements =  posts.map(p =>  <Post message={p.message} likesCount={p.likesCount}/>);

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;