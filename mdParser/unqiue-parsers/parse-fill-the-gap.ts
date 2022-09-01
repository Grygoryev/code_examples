import showdown from 'showdown'
import { makeFillGapOptionsFromRaw } from '~/modals/message-modal/message-modal-types/fill-the-gap/helpers'

import { getEntitesArrayFromText } from '../core-instruments/get-entities-array-from-text'

export const parseFillTheGap = (messageObject: any) => {
  const { content } = messageObject

  const converter = new showdown.Converter()

  // converting md to html for more convenient view in ui
  let code = getEntitesArrayFromText(content, 'code')[0]
  code = converter.makeHtml(code)

  let rawOptions = getEntitesArrayFromText(content, 'options')[0]

  const options = makeFillGapOptionsFromRaw(rawOptions)

  return {
    ...messageObject,
    options,
    content: code,
  }
}
