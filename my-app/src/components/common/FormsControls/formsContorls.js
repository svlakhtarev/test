import React from 'react';
import {Field} from 'redux-form';
import style from './formsContorls.module.css';

//Fields type builder. Use custom types.
const FormControl = ({input, meta: {touched, error}, children}) => {
  const hasError = touched && error;
  return (
    <div className={style.formControl + " " + (hasError ? style.error : " ")}>
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

//Custom types for Fields.
export const Textarea = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}>
    <textarea {...input} {...restProps}/>
  </FormControl>
}

export const Input = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}>
    <input {...input} {...restProps}/>
  </FormControl>
}

export const createField = (placeholder,
                            name,
                            validate,
                            component,
                            props = {},
                            text = "") => (
  <div className={style.field}>
    <Field placeholder={placeholder}
           name={name}
           validate={validate}
           component={component}
           {...props}
    /> {text}
  </div>
)

export const MyButton = ({onClick, title, disabled}) => {
  return <button className={style.button}
                 onClick={onClick}
                 disabled={disabled}>
    {title}
  </button>
}

export const MyFile = ({onChange}) => {
  return <input className={style.file}
                type={"file"}
                onChange={onChange}/>
}
