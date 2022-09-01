import { getUniqueId } from '../../id'
import { getValue, mapKeysAndValues, replaceVariables } from '../helpers'
import { pointers } from '../pointers'
import { LessonVariablesType } from '../types'

export const createMessagePropsObject = (base: string[], lessonVariables?: LessonVariablesType) => {
  const props: LessonVariablesType = {}

  base.forEach(prop => {
    // if lessonVariables has been passed, we replace it
    const finalProp = replaceVariables(prop, lessonVariables)

    const [key, value] = finalProp.split(pointers.variables.equalSign)
    const cleanKey = key.trim()?.indexOf('type') !== -1 ? 'type' : key.trim()
    const trimmedValue = value?.trim()

    const isArrayContainer = trimmedValue.startsWith('[') && trimmedValue.endsWith(']')

    if (isArrayContainer) {
      const valueInsideContainer = trimmedValue?.slice(1, trimmedValue?.length - 1)
      const values = valueInsideContainer?.split(',')
      props[cleanKey] = values
    } else {
      const parsedValue = getValue(value)
      const { value: mappedValue } = mapKeysAndValues(parsedValue, cleanKey)
      props[cleanKey] = mappedValue
    }
  })

  props.id = getUniqueId()

  return props
}
