import { cleanEmptyProps, replaceVariables } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType } from '../types'
import { createMessagePropsObject } from './create-message-props-object'

export const createOptionObjectFromText = (optionText: string, lessonVariables: LessonVariablesType) => {
  const baseForOptionProps = optionText
    .slice(optionText.indexOf(pointers.option.start) + pointers.option.start.length, optionText.indexOf('}-->'))
    .split(pointers.message.propertiesDivider)

  //TODO: define why there is undefined props in object and remove cleanEmptyProps
  const propsForOptionObject = createMessagePropsObject(baseForOptionProps, cleanEmptyProps(lessonVariables))

  const rawContent = optionText.slice(optionText.indexOf('}-->') + 5, optionText.indexOf(pointers.option.end))

  const preparedContent = replaceVariables(rawContent, cleanEmptyProps(lessonVariables)).trim()

  return cleanEmptyProps({
    ...propsForOptionObject,
    content: preparedContent,
  })
}
