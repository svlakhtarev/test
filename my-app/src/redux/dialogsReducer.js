const SEND_MASSEGE = 'SEND-MASSSEGE';

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
        case SEND_MASSEGE:
            let body = action.newMassegeBody;
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

export const sendMassegeCreator = (newMassegeBody) => ({
    type: SEND_MASSEGE, newMassegeBody});

export default dialogsReducer;