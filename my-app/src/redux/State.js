let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: 'Msg',
                    likesCount: '12'
                },
                {
                    id: 2,
                    message: 'Msg 2',
                    likesCount: '1'
                }
            ],
            newPostText: ''
        },
        dialogPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Name 1'
                },
                {
                    id: 2,
                    name: 'Name 2'
                }
            ],
            messages: [
                {
                    id: 1,
                    message: 'Hi!'
                },
                {
                    id: 2,
                    message: 'How are you?'
                }
            ]
        }
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    _callSubscriber() {
        console.log('State changed')
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export default store;