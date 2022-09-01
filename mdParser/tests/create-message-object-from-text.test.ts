import { createMessageObjectFromText } from '../core-instruments/create-message-object-from-text'
import { extractMessageObjMock, extractMessageObjMockExpected } from './mocks'

describe('creating message object from text', () => {
  it('should create message obj', () => {
    const result = createMessageObjectFromText(extractMessageObjMock, {})

    expect(result).toMatchObject(extractMessageObjMockExpected)
  })
})
