import {maxLenghtCreator, required} from '../../../utils/validators/validators'
import {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, MyButtonString, Textarea} from '../../common/FormsControls/formsContorls'
import {NewMsgFormValueType} from '../Dialogs'

type NewMsgFormValueTypeKeys = Extract<keyof NewMsgFormValueType, string>

const maxLenght200 = maxLenghtCreator(200)

const AddMessageForm: FC<InjectedFormProps<NewMsgFormValueType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMsgFormValueTypeKeys>('Enter your message',
          'newMessageBody',
          [required, maxLenght200],
          Textarea)}
      </div>
      <div>
        <MyButtonString title={'Send'}/>
      </div>
    </form>
  )
}

export default reduxForm<NewMsgFormValueType>({form: 'dialogAddMessageForm'})(AddMessageForm)
