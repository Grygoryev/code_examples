import { getLessonVariables } from '../core-instruments/get-lesson-variables'

const mockVariablesText = `
<!--
{variables}
author1=0b7f425d-be9f-4fb3-996d-7d6c82f95246;
goal1=8237546b-f2ae-4e36-b7e6-14a0628140c8;
xxx=777;
{/variables}
-->
`

describe('parse variables', () => {
  it('should extract correctly', () => {
    const result = getLessonVariables(mockVariablesText)
    const expected = {
      author1: '0b7f425d-be9f-4fb3-996d-7d6c82f95246',
      goal1: '8237546b-f2ae-4e36-b7e6-14a0628140c8',
      xxx: '777',
    }

    expect(result).toEqual(expected)
  })
})
