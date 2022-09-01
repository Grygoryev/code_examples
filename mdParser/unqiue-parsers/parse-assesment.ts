import showdown from 'showdown'

import { IMessage, IMessageGroup, MESSAGES_TYPES } from '../../../types/course'
import { getUniqueId } from '../../id'
import { createMessageObjectFromText } from '../core-instruments/create-message-object-from-text'
import { getEntitesArrayFromText } from '../core-instruments/get-entities-array-from-text'
import { replaceVariables, cleanEmptyProps } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType } from '../types'

export const parseAssesment = (resultingArray: IMessageGroup[], assessments: IMessage[]) => {
  const computedGroupsWithAssesments = resultingArray?.map(group => {
    const assesmentResult = group?.messages?.find(message => message?.type === MESSAGES_TYPES.ASSESMENT_RESULT)
    if (!!assesmentResult) {
      const messages = group?.messages

      return {
        ...group,
        messages: messages?.map(item => {
          if (item?.id === assesmentResult?.id) {
            const assesmentId = assessments?.[0]?.id
            assessments = assessments?.filter(assessment => assessment?.id !== assesmentId)

            return {
              ...item,
              assesmentId,
            }
          }
          return item
        }),
      }
    }

    return group
  })

  const assessmentIds = assessments?.map(assessment => assessment?.id)

  return computedGroupsWithAssesments?.reduce((accumulator: IMessageGroup[], group: IMessageGroup) => {
    const assessment = group?.messages?.find(message => assessmentIds.includes(message?.id))

    if (!!assessment) {
      return [
        ...accumulator,
        group,
        {
          id: getUniqueId(),
          type: MESSAGES_TYPES.MESSAGES_GROUP,
          messages: [
            {
              id: getUniqueId(),
              type: MESSAGES_TYPES.ASSESMENT_RESULT,
              assesmentId: assessment?.id,
              content: 'Your result',
            } as any,
          ],
        },
      ]
    }

    return [...accumulator, group]
  }, [])
}

type ParseAssesmentPropsType = {
  text: string
  propsForMessageObject: LessonVariablesType
  lessonVariables: LessonVariablesType
}

export const parseAssesmentsProps = ({ text, propsForMessageObject, lessonVariables }: ParseAssesmentPropsType) => {
  const rawedMessages = getEntitesArrayFromText(text, 'insideMessage')
  const messages: IMessage[] = []

  for (let rawedMessage of rawedMessages) {
    // skip empty option
    if (rawedMessage.length <= 1) continue

    // TODO: fix types
    const object = createMessageObjectFromText(rawedMessage, lessonVariables, true) as IMessage

    messages.push(object)
  }

  const rawContent = text.slice(text.indexOf('}-->') + 5, text.indexOf(pointers.insideMessage.start))

  // parsing text in html
  const converter = new showdown.Converter()
  const html = converter.makeHtml(rawContent)

  const preparedContent = replaceVariables(html, cleanEmptyProps(lessonVariables))

  return cleanEmptyProps({
    ...propsForMessageObject,
    ...(messages?.length ? { messages } : {}),
    content: preparedContent,
  })
}
