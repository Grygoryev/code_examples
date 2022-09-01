import { extractGroupAgruments } from '../core-instruments/extract-group-arguments'

describe('extract group arguments', () => {
  it('extracts args', () => {
    const mockLessonsVars = {
      goal1: '8237546b-f2ae-4e36-b7e6-14a0628140c8',
    }
    
    const mockGroupAgruments = `
    <!--{group closeGoal=<%goal1%>|someArgument=123}-->
    <!---{/group}-->
    `
    
    const result = extractGroupAgruments(mockGroupAgruments, mockLessonsVars)
    const expected = {
      closeGoal: '8237546b-f2ae-4e36-b7e6-14a0628140c8',
      someArgument: '123',
    }

    expect(result).toEqual(expected)
  })
})
