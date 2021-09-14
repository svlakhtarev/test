import {ComponentType} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Dialogs from './Dialogs'
import {actions} from '../../redux/dialogsReducer'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
import {AppStateType} from '../../redux/reduxStore'

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogPage: state.dialogPage
  }
}

export default compose(
  connect(
    mapStateToProps,
    {...actions}
  ), withAuthRedirect
)(Dialogs) as ComponentType
