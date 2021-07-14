import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLenghtCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/formsContorls";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p =>
        <Post message={p.message}
              likesCount={p.likesCount}/>);
    let onAddPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div>
            <h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const maxLenght100 = maxLenghtCreator(100);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       placeholder={"Post massage"}
                       name={"newPostText"}
                       validate={[required, maxLenght100]}
                />
            </div>
            <div>
                <button className={s.button}>Add Post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: "AddNewPostForm"})(AddNewPostForm)

export default MyPosts;