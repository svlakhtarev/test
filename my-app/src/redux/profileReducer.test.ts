import profileReducer, {actions} from './profileReducer'
import {PostType} from '../Types/Types'

let state = {
  posts: [
    {
      id: 1,
      message: 'Msg',
      likesCount: 12
    },
    {
      id: 2,
      message: 'Msg 2',
      likesCount: 1
    }
  ] as Array<PostType>,
  profile: null,
  status: '',
  newPostText: ''
}

it('lenght of post should be incremented', () => {
  let action = actions.addPostActionCreator('Test')
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct'), () => {
  let action = actions.addPostActionCreator('Test')
  let newState = profileReducer(state, action)
  expect(newState.posts[4].message).toBe('Test')
}


