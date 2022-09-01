export const extractGroupMock = `
<!--
{variables}
author1=0b7f425d-be9f-4fb3-996d-7d6c82f95246;
goal1=8237546b-f2ae-4e36-b7e6-14a0628140c8;
{/variables}
-->
<!--{group}-->
<!--{message type=MARKDOWN}-->

**BOLD** not bold
<!--{/message}-->
<!--{message type=FILL_THE_GAP|title=Title|description=description|skills=[]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text}-->
<!--{code}-->123<!--{/code}-->
<!--{options}-->
pomodoro=1;
apple=2;
orange=3;
<!--{/options}-->
<!--{/message}-->

<!--{/group}-->

<!--{group}-->
<!--{message type=ASSESMENT|totalSeconds=1800|nextButtonText=Check Result}-->
Assesment Content

<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->
test content message
<!--{/insideMessage}-->

<!--{insideMessage type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->
What is the array method for flipping an array (reverse)?

<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->

<!--{option hint=Right option!|isCorrect=true}-->
.reverse()
<!--{/option}-->

<!--{/insideMessage}-->

<!--{/message}-->

<!--{message type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->
What is the array method for flipping an array (reverse)?

<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->

<!--{option hint=Right option!|isCorrect=true}-->
.reverse()
<!--{/option}-->

<!--{/message}-->
<!--{message type=ASSESMENT_RESULT}-->
Какое-то описание для показа во флоу
<!--{/message}-->
<!--{/group}-->
`

export const extractOptionsMock = `
<!--{option hint=Wrong option|isCorrect=false}-->.map<!--{/option}-->
<!--{option hint=Right option!|isCorrect=true}-->.reverse()<!--{/option}-->
`
export const extractMessagesMock = `
<!--{group}-->
<!--{message type=ASSESMENT|totalSeconds=1800|nextButtonText=Check Result}-->
Assesment Content

<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->
test content message
<!--{/insideMessage}-->

<!--{insideMessage type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->
What is the array method for flipping an array (reverse)?

<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->

<!--{option hint=Right option!|isCorrect=true}-->
.reverse()
<!--{/option}-->

<!--{/insideMessage}-->

<!--{/message}-->

<!--{message type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->
What is the array method for flipping an array (reverse)?

<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->

<!--{option hint=Right option!|isCorrect=true}-->
.reverse()
<!--{/option}-->

<!--{/message}-->
<!--{message type=ASSESMENT_RESULT}-->
Какое-то описание для показа во флоу
<!--{/message}-->
<!--{/group}-->
`

export const extractOptionsAndCodeMock = `
<!--{code}-->
\`\`\`bash
Famous time for managing focus calls <answerId>1</answerId> technic
\`\`\`
<!--{/code}-->
<!--{options}-->
pomodoro=1;
apple=2;
orange=3;
<!--{/options}-->
`

export const extractInsideMessageMock = `
<!--{message type=ASSESMENT|totalSeconds=1800|nextButtonText=Check Result}-->
Assesment Content

<!--{insideMessage type=CARD_INPUT|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|answers=[1, 2, 3]}-->
test content message
<!--{/insideMessage}-->
<!--{/message}-->`

export const extractMessageObjMock = `<!--{message type=QUIZ|skills=[<%metamaskBasicSkill%>]|successAnswer=success text|wrongAnswer=wrong text|difficulty=EASY|nextButtonText=next btn text|title=test title unused|optionType=radio|isInteractiveBlockPromotion=true}-->
What is the array method for flipping an array (reverse)?

<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->

<!--{option hint=Right option!|isCorrect=true}-->
.reverse()
<!--{/option}-->

<!--{/message}-->`

export const extractMessageObjMockExpected = {
  type: 'QUIZ',
  skills: ['<%metamaskBasicSkill%>'],
  successAnswer: 'success text',
  wrongAnswer: 'wrong text',
  difficulty: 'EASY',
  nextButtonText: 'next btn text',
  title: 'test title unused',
  optionType: 'radio',
  isInteractiveBlockPromotion: true,
  // id: '2bb4e9cf-a561-4bf8-8c99-4e9e34a42941', id will be different every test
  options: [
    {
      hint: 'Wrong option',
      isCorrect: false,
      // id: '6f5599d8-33e2-4dad-9ebf-fe9eb668fae4', id will be different every test
      content: '.map',
    },
    {
      hint: 'Right option!',
      isCorrect: true,
      // id: 'ab44a71c-55a1-45b2-a446-5a78cd5b174f', id will be different every test
      content: '.reverse()',
    },
  ],
  content: 'What is the array method for flipping an array (reverse)?\n\n',
}

export const extractMessagePropsMock = [
  'type=FILL_THE_GAP',
  'title=Title',
  'description=description',
  'skills=[]',
  'successAnswer=success text',
  'wrongAnswer=wrong text',
  'difficulty=EASY',
  'nextButtonText=next btn text',
]

export const extractMessagePropsExpected = {
  type: 'FILL_THE_GAP',
  title: 'Title',
  description: 'description',
  skills: [''],
  successAnswer: 'success text',
  wrongAnswer: 'wrong text',
  difficulty: 'EASY',
  nextButtonText: 'next btn text',
  // id: '77e253ac-a5e2-47c2-b742-00f0ef019257', id will be different every test
}

export const createOptionSourceMock = `
<!--{option hint=Wrong option|isCorrect=false}-->
.map
<!--{/option}-->
`

export const createOptionExpectedMock = {
  hint: 'Wrong option',
  isCorrect: false,
  // "id": "03e2d8ab-5ae9-405d-a3c9-5893f8534023", id will be different every test
  content: '.map',
}
