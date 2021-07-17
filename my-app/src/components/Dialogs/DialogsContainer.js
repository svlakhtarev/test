import {connect} from 'react-redux';
import {compose} from 'redux';
import Dialogs from './Dialogs';
import {sendMessageCreator} from '../../redux/dialogsReducer';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

let mapStateToProps = (state) => {
  return {
    dialogPage: state.dialogPage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
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
