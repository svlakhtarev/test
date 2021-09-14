import {maxLenghtCreator, required} from '../../../utils/validators/validators'
import {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Textarea} from '../../common/FormsControls/formsContorls'
import {NewMsgFormValueType} from '../Dialogs'
import {Button} from 'antd'

const maxLenght200 = maxLenghtCreator(200)

const AddMessageForm: FC<InjectedFormProps<NewMsgFormValueType>> = ({handleSubmit}) => {
  return (
    <form>
      <div>
        {createField<NewMsgFormValueTypeKeys>('Enter your message',
          'newMessageBody',
          [required, maxLenght200],
          Textarea)}
      </div>
      <div>
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </form>
  )
}

type NewMsgFormValueTypeKeys = Extract<keyof NewMsgFormValueType, string>

export default reduxForm<NewMsgFormValueType>({form: 'dialogAddMessageForm'})(AddMessageForm)
