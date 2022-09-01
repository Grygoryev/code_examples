import { replaceVariables, cleanEmptyProps } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType, CommonObjectType } from '../types'

export const extractGroupAgruments = (text: string, lessonVariables: LessonVariablesType) => {
  const groupArguments: CommonObjectType = {}

  const groupArgumentsRaw = text
    .slice(
      text.indexOf(pointers.group.extractArgumens.start) + pointers.group.extractArgumens.start.length,
      text.indexOf(pointers.group.extractArgumens.end),
    )
    .trim()
  const groupArgumentsSplitted = groupArgumentsRaw.split(pointers.group.extractArgumens.propertiesDivider)

  groupArgumentsSplitted.forEach(arg => {
    const preparedArg = replaceVariables(arg, lessonVariables)
    const [key, value] = preparedArg.split(pointers.variables.equalSign)

    groupArguments[key] = value
  })

  return cleanEmptyProps(groupArguments)
}
