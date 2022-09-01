import { MESSAGES_TYPES } from '../../../types/course'
import { cleanEmptyProps, replaceVariables } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType } from '../types'
import { parseAssesmentsProps } from '../unqiue-parsers/parse-assesment'
import { createMessagePropsObject } from './create-message-props-object'
import { createOptionObjectFromText } from './create-option-object-from-text'
import { getEntitesArrayFromText } from './get-entities-array-from-text'

export const createMessageObjectFromText = (
  text: string,
  lessonVariables: LessonVariablesType,
  isInsideMessage?: boolean,
) => {
  const baseForMessageProps = text
    .slice(text.indexOf(pointers.message.start) + pointers.message.start.length, text.indexOf('}-->'))
    .split(pointers.message.propertiesDivider)

  //TODO: define why there is undefined props in object and remove cleanEmptyProps
  const propsForMessageObject = createMessagePropsObject(baseForMessageProps, cleanEmptyProps(lessonVariables))

  if (propsForMessageObject?.type === MESSAGES_TYPES.ASSESMENT) {
    return parseAssesmentsProps({
      text,
      propsForMessageObject,
      lessonVariables,
    })
  }

  const rawedOptions = getEntitesArrayFromText(text, 'option')

  const options: any[] = []

  for (let rawedOption of rawedOptions) {
    // skip empty option
    if (rawedOption.length <= 1) continue

    // TODO: fix types
    const object = createOptionObjectFromText(rawedOption, lessonVariables) as any

    options.push(object)
  }

  // eslint-disable-next-line max-len
  // TODO: тут собрать сообщения внутри сообщения, хз нужно ли сделать хард проверку для типа сообщения, мне кажется не стоит.
  // TODO: Пусть ломают, как хотят
  const rawContent = text.slice(
    text.indexOf('}-->') + 5,
    text.indexOf(
      // eslint-disable-next-line no-nested-ternary
      rawedOptions?.length
        ? pointers.option.start
        : isInsideMessage
        ? pointers.insideMessage.end
        : pointers.message.end,
    ),
  )

  const contentWithVarsReplaced = replaceVariables(rawContent, cleanEmptyProps(lessonVariables))

  return cleanEmptyProps({
    ...propsForMessageObject,
    ...(options?.length ? { options } : {}),
    content: contentWithVarsReplaced,
  })
}
