import React from 'react';
import {Field, reduxForm} from 'redux-form';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {maxLenghtCreator, required} from '../../../utils/validators/validators';
import {MyButton, Textarea} from '../../common/FormsControls/formsContorls';

const maxLenght100 = maxLenghtCreator(100);

const AddNewPostForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field component={Textarea}
               placeholder={"Post massage"}
               name={"newPostText"}
               validate={[required, maxLenght100]}
        />
      </div>
      <div>
        <MyButton title={"Add Post"}/>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({form: "AddNewPostForm"})(AddNewPostForm)

const MyPosts = React.memo(props => {
  let postsElements = props.posts.map(p =>
    <Post key={p.id}
          message={p.message}
          likesCount={p.likesCount}/>);
  let onAddPost = (value) => {
    props.addPost(value.newPostText);
  }

  return (
    <div>
      <h3>My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  )
})

export default MyPosts;
