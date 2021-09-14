import React, {FC} from 'react'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {FieldValidatorType} from '../../../utils/validators/validators'
import style from './formsContorls.module.css'
import TextArea from 'antd/es/input/TextArea'
import {Input} from 'antd'

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
    <TextArea {...input} {...restProps}/>
  </FormControl>
}
export const InputArea: FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props
  return <FormControl {...props}>
    <Input {...input} {...restProps}/>
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


export const MyButtonString: React.FC<MyButtonStringParamsType> = ({title}) => {
  return <button className={style.button}>
    {title}
  </button>
}

export const MyButton: FC<MyButtonParamsType> = ({onClick, title, disabled}) => {
  return <button className={style.button}
                 onClick={onClick}
                 disabled={disabled}>
    {title}
  </button>
}

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}

type MyButtonStringParamsType = {
  title: string
}

type MyButtonParamsType = {
  onClick: () => void
  title: string
  disabled: boolean | undefined
}

export type GetStringKeys<T> = Extract<keyof T, string>
