import showdown from 'showdown'
import { getUniqueId } from '~/helpers/id'

import { pointers } from './pointers'
import { PointersEntityName, LessonVariablesType, CommonObjectType } from './types'

export const getEntitesArrayFromText = (text: string, entityName: PointersEntityName): string[] => {
  let sliceStart
  let sliceEnd

  // slicing for message and group is different
  // because message has arguments
  if (entityName === 'group') {
    sliceStart = text.indexOf(pointers[entityName].start) + pointers[entityName].start.length
    sliceEnd = text.indexOf(pointers[entityName].end)
  }

  if (entityName === 'message') {
    sliceStart = text.indexOf(pointers[entityName].start)
    sliceEnd = text.indexOf(pointers[entityName].end) + pointers[entityName].end.length
  }

  const entity = text.slice(sliceStart, sliceEnd)

  if (!entity) {
    return []
  }
  const restText = text.slice(text.indexOf(pointers[entityName].end) + pointers[entityName].end.length)

  return [entity, ...getEntitesArrayFromText(restText, entityName)]
}

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

  return variables
}

const createMessagePropsObject = (base: string[], lessonVariables: LessonVariablesType) => {
  const props: LessonVariablesType = {}

  base.forEach(prop => {
    // if there is a variable in props, we replace it
    const preparedProp = replaceVariables(prop, lessonVariables)
    const [key, value] = preparedProp.split(pointers.variables.equalSign)

    const cleanKey = key.trim()

    props[cleanKey] = value
  })

  props.id = getUniqueId()

  return props
}

const replaceVariables = (text: string, variables: LessonVariablesType) => {
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

function replaceAllSubstrings(str: string, mapObj: CommonObjectType) {
  var re = new RegExp(Object.keys(mapObj).join('|'), 'gi')

  return str.replace(re, function (matched) {
    return mapObj[matched.toLowerCase()]
  })
}

export function cleanEmptyProps(obj: CommonObjectType) {
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  return obj
}

export const createMessageObjectFromText = (text: string, lessonVariables: LessonVariablesType) => {
  const baseForMessageProps = text
    .slice(text.indexOf(pointers.message.start) + pointers.message.start.length, text.indexOf('}-->'))
    .split(pointers.message.propertiesDivider)

  //TODO: define why there is undefined props in object and remove cleanEmptyProps
  const propsForMessageObject = createMessagePropsObject(baseForMessageProps, cleanEmptyProps(lessonVariables))

  const rawContent = text.slice(text.indexOf('}-->') + 5, text.indexOf(pointers.message.end))

  // parsing text in html
  const converter = new showdown.Converter()
  const html = converter.makeHtml(rawContent)

  const preparedContent = replaceVariables(html, cleanEmptyProps(lessonVariables))

  return cleanEmptyProps({
    ...propsForMessageObject,
    content: preparedContent,
  })
}
