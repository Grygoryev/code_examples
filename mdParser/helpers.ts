import { pointers } from './pointers'
import { LessonVariablesType, CommonObjectType } from './types'

const mapKeysAndValues = (value: string | number | boolean, cleanKey: string) => {
  const key = cleanKey?.toLocaleLowerCase()

  switch (key) {
    case 'authorid':
      return { key: 'authorId', value: `${value}` }
    default:
      return { key: cleanKey, value }
  }
}

const getValue = (value: string): string | number | boolean => {
  if (['true', 'false'].includes(value?.toLowerCase())) {
    return value?.toLowerCase() === 'true'
  }

  const isNumber = isNaN(+value) ? false : true

  if (isNumber) {
    return +value
  }

  return value
}

const replaceVariables = (text: string, variables?: LessonVariablesType) => {
  if (!variables || Object.keys(variables).length === 0) return text

  let workingArea = text

  let replacementMap: LessonVariablesType = {}

  for (let key in variables) {
    const elemToFind = pointers.variables.replace.start + key.trim() + pointers.variables.replace.end
    const elemToReplace = variables[key].toString().trim()

    replacementMap[elemToFind] = elemToReplace
  }

  workingArea = replaceAllSubstrings(text, replacementMap)

  return workingArea
}

const replaceAllSubstrings = (str: string, mapObj: CommonObjectType) => {
  var re = new RegExp(Object.keys(mapObj).join('|'), 'gi')

  return str.replace(re, function (matched) {
    return mapObj[matched]
  })
}

const cleanEmptyProps = (obj: CommonObjectType) => {
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  return obj
}

export { cleanEmptyProps, replaceAllSubstrings, replaceVariables, getValue, mapKeysAndValues }
