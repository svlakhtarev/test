import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import Preloader from '../common/Preloader'
import {getIsFetching} from '../../redux/usersSelectors'
import {Users} from './Users'

export const UsersPage: FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)

  return <>
    <h1>{props.pageTitle}</h1>
    {isFetching ? <Preloader/> : null}
    <Users/></>

}

type UsersPagePropsType = {
  pageTitle: string
}
