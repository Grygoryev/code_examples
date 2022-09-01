import showdown from 'showdown'
import { getUniqueId } from '~/helpers/id'
import { IMessageGroup, IMessage, MESSAGES_TYPES } from '~/types/course'

import { createMessageObjectFromText } from './core-instruments/create-message-object-from-text'
import { extractGroupAgruments } from './core-instruments/extract-group-arguments'
import { getEntitesArrayFromText } from './core-instruments/get-entities-array-from-text'
import { getLessonVariables } from './core-instruments/get-lesson-variables'
import { parseAssesment } from './unqiue-parsers/parse-assesment'
import { parseFillTheGap } from './unqiue-parsers/parse-fill-the-gap'

const converter = new showdown.Converter()

export const mdParser = (text: string): IMessageGroup[] => {
  const lessonVariables = getLessonVariables(text)
  const groups = getEntitesArrayFromText(text, 'group')
  const resultingArray: IMessageGroup[] = []
  // requires to be an array
  // will go to groupMetaInfo
  let closedGroupGoalMeta: string[] = []

  for (let groupText of groups) {
    const group: IMessage[] = []
    const { closedGoal } = extractGroupAgruments(groupText, lessonVariables)
    const messages = getEntitesArrayFromText(groupText, 'message')

    for (let message of messages) {
      // skip empty messages
      if (message.length <= 1) continue

      const messageObject = createMessageObjectFromText(message, lessonVariables) as IMessage

      switch (messageObject.type) {
        case MESSAGES_TYPES.FILL_THE_GAP:
          const fillTheGapMessageObject = parseFillTheGap(messageObject)
          group.push(fillTheGapMessageObject)
          break
        case MESSAGES_TYPES.MARKDOWN:
          const { content } = messageObject
          group.push({
            ...messageObject,
            content: converter.makeHtml(content),
          })
          break
        default:
          group.push(messageObject)
      }

      closedGoal && closedGroupGoalMeta.push(closedGoal)
    }

    const groupMetaInfo: IMessageGroup = {
      id: getUniqueId(),
      type: MESSAGES_TYPES.MESSAGES_GROUP,
      messages: group,
      ...(closedGroupGoalMeta?.length > 0 ? { closeGoals: closedGroupGoalMeta } : {}),
    }

    groupMetaInfo?.messages?.length && resultingArray.push(groupMetaInfo)
    // reset, as 1 group has 1 closed goal
    closedGroupGoalMeta = []
  }

  const messages = resultingArray?.map(group => group?.messages)?.flat()
  let assessments = messages?.filter(message => message?.type === MESSAGES_TYPES.ASSESMENT)

  if (assessments?.length) {
    return parseAssesment(resultingArray, assessments)
  }

  return resultingArray
}
