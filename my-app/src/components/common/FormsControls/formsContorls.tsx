import React, {FC} from 'react'
import {
  Field,
  WrappedFieldMetaProps,
  WrappedFieldProps
} from 'redux-form'
import {FieldValidatorType} from '../../../utils/validators/validators'
import style from './formsContorls.module.css'

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}
const FormControl: FC<FormControlPropsType> = ({
                                                 meta: {touched, error},
                                                 children
                                               }) => {
  const hasError = touched && error
  return (
    <div className={style.formControl + ' ' + (hasError ? style.error : ' ')}>
      <div>
        {children}
      </div>
      {
        hasError &&
        <span>{error}</span>
      }
    </div>
  )
}
export const Textarea: FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props
  return <FormControl {...props}>
    <textarea {...input} {...restProps}/>
  </FormControl>
}
export const Input: FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props
  return <FormControl {...props}>
    <input {...input} {...restProps}/>
  </FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validate: Array<FieldValidatorType> | null,
                                                         component: FC<WrappedFieldProps>,
                                                         props = {},
                                                         text = '') {
  return <div className={style.field}>
    <Field placeholder={placeholder}
           name={name}
           validate={validate}
           component={component}
           {...props}
    /> {text}
  </div>
}

type MyButtonStringParamsType = {
  title: string
}
export const MyButtonString: React.FC<MyButtonStringParamsType> = ({title}) => {
  return <button className={style.button}>
    {title}
  </button>
}

type MyButtonClickParamsType = {
  onClick: () => void
  title: string
}
export const MyButtonClick: FC<MyButtonClickParamsType> = ({onClick, title}) => {
  return <button className={style.button}
                 onClick={onClick}>
    {title}
  </button>
}

type MyButtonParamsType = {
  onClick: () => void
  title: string
  disabled: boolean | undefined
}
export const MyButton: FC<MyButtonParamsType> = ({onClick, title, disabled}) => {
  return <button className={style.button}
                 onClick={onClick}
                 disabled={disabled}>
    {title}
  </button>
}

export type GetStringKeys<T> = Extract<keyof T, string>