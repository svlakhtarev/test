import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import style from './MyPosts.module.css'
import Post from './Post/Post'
import {maxLenghtCreator, required} from '../../../utils/validators/validators'
import {createField, GetStringKeys, MyButtonString, Textarea} from '../../common/FormsControls/formsContorls'
import {PostType} from '../../../Types/Types'

const maxLenght100 = maxLenghtCreator(100)

type FormPropsType = {}
const AddNewPostForm: FC<InjectedFormProps<AddPostFormType, FormPropsType> & FormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<PostFormValueTypeKeys>('Post massage',
          'newPostText',
          [required, maxLenght100],
          Textarea)}
      </div>
      <div>
        <MyButtonString title={'Add Post'}/>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm<AddPostFormType>({form: 'AddNewPostForm'})(AddNewPostForm)

type AddPostFormType = {
  newPostText: string
}
type PostFormValueTypeKeys = GetStringKeys<AddPostFormType>
export type MapMyPostsPropsType = {
  posts: Array<PostType>
}
export type DispatchMyPostPropsType = {
  addPost: (newPostText: string) => void
}
const MyPosts: FC<MapMyPostsPropsType & DispatchMyPostPropsType> = props => {
  let postsElements = [...props.posts]
    .reverse()
    .map(p =>
      <Post key={p.id}
            message={p.message}
            likesCount={p.likesCount}/>)

  let onAddPost = (value: AddPostFormType) => {
    props.addPost(value.newPostText)
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
}

const MyPostMemo = React.memo(MyPosts)

export default MyPosts
