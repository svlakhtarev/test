import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Dialogs from "./Dialogs";
import {
    sendMassegeCreator
} from "../../redux/dialogsReducer";
import {withAuthRedirect}
    from "../../hoc/WithAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMassege: (newMassegeBody) => {
            dispatch(sendMassegeCreator(newMassegeBody));
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withAuthRedirect
)(Dialogs);