import { createMessagePropsObject } from '../core-instruments/create-message-props-object'
import { extractMessagePropsExpected, extractMessagePropsMock } from './mocks'

describe('creating message props object', () => {
  it('should create message props obj', () => {
    const result = createMessagePropsObject(extractMessagePropsMock, {})

    expect(result).toMatchObject(extractMessagePropsExpected)
  })
})
