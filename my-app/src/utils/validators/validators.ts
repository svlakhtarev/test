export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
  if (value) return undefined
  return 'Field is required'
}
export const maxLenghtCreator = (maxLenght: number): FieldValidatorType => (value) => {
  if (value && value.length > maxLenght) return 'Max lenght is ${maxLenght} symbols'
  return undefined
}
