import { createOptionObjectFromText } from '../core-instruments/create-option-object-from-text'
import { createOptionExpectedMock, createOptionSourceMock } from './mocks'

describe('creating object from option tag', () => {
  it('should create expected object', () => {
    const result = createOptionObjectFromText(createOptionSourceMock, {})

    expect(result).toMatchObject(createOptionExpectedMock)
  })
})
