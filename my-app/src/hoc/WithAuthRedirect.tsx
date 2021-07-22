import React, {ComponentType, FC} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../redux/reduxStore'

let mapStateToPropsRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})

type mapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {

  const RedirectComponent: FC<mapPropsType & DispatchPropsType> = (props) => {
    let {isAuth, ...restProps} = props
    if (!isAuth) return <Redirect to='/login'/>
    return <WrappedComponent {...restProps as WCP} />
  }

  let ConnectedAuthRedirectComponent = connect<mapPropsType, DispatchPropsType, WCP, AppStateType>(
    mapStateToPropsRedirect, {})
  (RedirectComponent)

  return ConnectedAuthRedirectComponent
}
