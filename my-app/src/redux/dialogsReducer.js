const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages,
                    {
                        id: 3,
                        message: body
                    }]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({
    type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;