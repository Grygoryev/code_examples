import { getEntitesArrayFromText } from '../core-instruments/get-entities-array-from-text'
import {
  extractGroupMock,
  extractInsideMessageMock,
  extractMessagesMock,
  extractOptionsAndCodeMock,
  extractOptionsMock,
} from './mocks'

describe('testing getEntitesArrayFromText', () => {
  it('should extract groups', () => {
    const result = getEntitesArrayFromText(extractGroupMock, 'group')

    const expected = [
      '<!--{group}-->\n<!--{message type=MARKDOWN}-->\n\n**BOLD** not bold\n<!--{/message}-->\n<!--{message type=FILL_THE_GAP|title=Title|description=description|skills=[]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text}-->\n<!--{code}-->123<!--{/code}-->\n<!--{options}-->\npomodoro=1;\napple=2;\norange=3;\n<!--{/options}-->\n<!--{/message}-->\n\n<!--{/group}-->',
      '<!--{group}-->\n<!--{message type=ASSESMENT|totalSeconds=1800|nextButtonText=Check Result}-->\nAssesment Content\n\n<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->\ntest content message\n<!--{/insideMessage}-->\n\n<!--{insideMessage type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->\nWhat is the array method for flipping an array (reverse)?\n\n<!--{option hint=Wrong option|isCorrect=false}-->\n.map\n<!--{/option}-->\n\n<!--{option hint=Right option!|isCorrect=true}-->\n.reverse()\n<!--{/option}-->\n\n<!--{/insideMessage}-->\n\n<!--{/message}-->\n\n<!--{message type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->\nWhat is the array method for flipping an array (reverse)?\n\n<!--{option hint=Wrong option|isCorrect=false}-->\n.map\n<!--{/option}-->\n\n<!--{option hint=Right option!|isCorrect=true}-->\n.reverse()\n<!--{/option}-->\n\n<!--{/message}-->\n<!--{message type=ASSESMENT_RESULT}-->\nКакое-то описание для показа во флоу\n<!--{/message}-->\n<!--{/group}-->',
    ]

    expect(result).toEqual(expected)
  })

  it('should output array of option', () => {
    const result = getEntitesArrayFromText(extractOptionsMock, 'option')

    const expected = [
      '<!--{option hint=Wrong option|isCorrect=false}-->.map<!--{/option}-->',
      '<!--{option hint=Right option!|isCorrect=true}-->.reverse()<!--{/option}-->',
    ]

    expect(result).toEqual(expected)
  })

  it('should output array of messages', () => {
    const result = getEntitesArrayFromText(extractMessagesMock, 'message')

    const expected = [
      '<!--{message type=ASSESMENT|totalSeconds=1800|nextButtonText=Check Result}-->\nAssesment Content\n\n<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->\ntest content message\n<!--{/insideMessage}-->\n\n<!--{insideMessage type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->\nWhat is the array method for flipping an array (reverse)?\n\n<!--{option hint=Wrong option|isCorrect=false}-->\n.map\n<!--{/option}-->\n\n<!--{option hint=Right option!|isCorrect=true}-->\n.reverse()\n<!--{/option}-->\n\n<!--{/insideMessage}-->\n\n<!--{/message}-->',
      '<!--{message type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->\nWhat is the array method for flipping an array (reverse)?\n\n<!--{option hint=Wrong option|isCorrect=false}-->\n.map\n<!--{/option}-->\n\n<!--{option hint=Right option!|isCorrect=true}-->\n.reverse()\n<!--{/option}-->\n\n<!--{/message}-->',
      '<!--{message type=ASSESMENT_RESULT}-->\nКакое-то описание для показа во флоу\n<!--{/message}-->',
    ]

    expect(result).toEqual(expected)
  })

  it('should output inner of code tag', () => {
    const result = getEntitesArrayFromText(extractOptionsAndCodeMock, 'code')[0]
    const expected = `\`\`\`bash
Famous time for managing focus calls <answerId>1</answerId> technic
\`\`\``

    expect(result).toEqual(expected)
  })

  it('should output inner of options tag', () => {
    const result = getEntitesArrayFromText(extractOptionsAndCodeMock, 'options')

    const expected = ['pomodoro=1;\napple=2;\norange=3;']

    expect(result).toEqual(expected)
  })

  it('should output inner of insideMessage tag', () => {
    const result = getEntitesArrayFromText(extractInsideMessageMock, 'insideMessage')

    const expected = [
      '<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->\ntest content message\n<!--{/insideMessage}-->',
    ]

    expect(result).toEqual(expected)
  })
})
