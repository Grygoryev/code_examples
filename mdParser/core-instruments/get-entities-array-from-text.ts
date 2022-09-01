import { pointers } from '../pointers'
import { PointersEntityName } from '../types'

const TAGS_WITH_PROPS = ['group', 'message', 'option', 'insideMessage']
const TAGS_WITHOUT_PROPS = ['options', 'code']

export const getEntitesArrayFromText = (text: string, entityName: PointersEntityName): string[] => {
  let sliceStart
  let sliceEnd

  // slicing for message and group is different
  // because message has arguments
  if (TAGS_WITH_PROPS.includes(entityName)) {
    sliceStart = text.indexOf(pointers[entityName].start)
    sliceEnd = text.indexOf(pointers[entityName].end) + pointers[entityName].end.length
  }

  if (TAGS_WITHOUT_PROPS.includes(entityName)) {
    sliceStart = text.indexOf(pointers[entityName].start) + pointers[entityName].start.length
    sliceEnd = text.indexOf(pointers[entityName].end)
  }

  let entity = null

  // check if there is a our entity in text,
  // if yes, we extract it to entity var
  // if no, further will be check for !entity and recursion will over
  if (sliceStart !== -1) {
    entity = text.slice(sliceStart, sliceEnd).trim()
  }

  if (!entity) {
    return []
  }

  const restText = text.slice(text.indexOf(pointers[entityName].end) + pointers[entityName].end.length)

  return [entity, ...getEntitesArrayFromText(restText, entityName)]
}
