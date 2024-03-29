import {Field, Form, Formik} from 'formik'
import React, {FC, memo} from 'react'
import {FilterType} from '../../redux/usersReducer'
import style from './Users.module.css'
import {useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/usersSelectors'

const userSearchValidate = (values: any) => {
  const errors = {}
  return errors
}

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
  term: string
  friend: FriendFormType
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: FC<PropsType> = memo((props) => {
  const filter = useSelector(getUsersFilter)
  const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter)
    setSubmitting(false)
  }

  return <div>
    <Formik
      enableReinitialize={true}
      initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
      validate={userSearchValidate}
      onSubmit={submit}
    >{({isSubmitting}) => (
        <Form className={style.search}>
          <Field type='text' name='term'/>
          <Field name={'friend'} as={'select'}>
            <option value={'null'}>All</option>
            <option value={'true'}>Followed</option>
            <option value={'false'}>Unfollowed</option>
          </Field>
          <button type='submit' disabled={isSubmitting}>
            SEARCH
          </button>
        </Form>
      )}
    </Formik>
  </div>
})

export default UsersSearchForm
