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
<!--{code}-->
```bash
Famous time for managing focus calls <answerId>1</answerId> technic
```
<!--{/code}-->
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
