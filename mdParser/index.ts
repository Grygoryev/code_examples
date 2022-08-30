import { getUniqueId } from '~/helpers/id'
import { IMessageGroup, IMessage } from '~/types/course'

import { getEntitesArrayFromText, getLessonVariables, createMessageObjectFromText } from './helpers'

export const mdParser = (text: string): IMessageGroup[] => {
  const lessonVariables = getLessonVariables(text)
  const groups = getEntitesArrayFromText(text, 'group')
  const resultingArray: IMessageGroup[] = []

  for (let groupText of groups) {
    const group: IMessage[] = []

    const messages = getEntitesArrayFromText(groupText, 'message')

    for (let message of messages) {
      // skip empty messages
      if (message.length <= 1) continue

      // TODO: fix types
      const messageObject = createMessageObjectFromText(message, lessonVariables) as IMessage

      group.push(messageObject)
    }

    const groupMetaInfo: IMessageGroup = {
      id: getUniqueId(),
      type: 'MESSAGES_GROUP',
      messages: group,
    }

    resultingArray.push(groupMetaInfo)
  }

  return resultingArray
}
