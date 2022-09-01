import { cleanEmptyProps } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType } from '../types'

export const getLessonVariables = (text: string) => {
  const keyAndValueStringsArr = text
    .slice(
      text.indexOf(pointers.variables.start) + pointers.variables.start.length,
      text.indexOf(pointers.variables.end),
    )
    .split(pointers.variables.divider)

  const variables: LessonVariablesType = {}

  keyAndValueStringsArr.forEach(item => {
    const [key, value] = item.split(pointers.variables.equalSign)

    const cleanKey = key.trim()

    variables[cleanKey] = value
  })

  return cleanEmptyProps(variables)
}
