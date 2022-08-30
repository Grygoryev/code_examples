import React, { useState } from 'react'
import { Markdown } from '~/components/markdown'
import { useMediaQuery } from '~/hooks/use-media-query'
import { useTheme } from '~/theming/styled'

import { QuizContext, QuizContextType } from '../context'
import {
  CardWrapper,
  ImageLayout,
  CardLayout,
  Checkbox,
  Title,
  Circle,
  Arrow,
  Hint,
  CheckboxAndTitleBox,
  IncorrectCheckedAnswerIcon,
} from './styled'
import { CardProps } from './types'

const Card = ({ question, isImageQuiz, optionType, isInsideDialog }: CardProps) => {
  const theme = useTheme()
  const context = React.useContext(QuizContext) as QuizContextType

  const isRadioQuiz = optionType === 'radio'
  const isMobile = useMediaQuery(() => `(max-width: ${theme.finalBreakpoints.md})`)

  const [isHovering, setIsHovering] = useState(false)
  const { isSubmitted } = context
  const isChecked = context?.answers.find(answer => answer.id === question.id)
  const { isCorrect } = question
  const isUntouched = !isSubmitted && !isChecked && !isHovering
  const answerFeedback = (isCorrect && !isChecked && question.notChoosenAndCorrectHint) || question.hint

  // show hint if it's either checked or correct
  const isHintVisible = isSubmitted && (isChecked || isCorrect)

  const selectedIcon = React.useMemo(() => {
    // if radio quiz
    if (isRadioQuiz) {
      if (isChecked && isCorrect && isSubmitted) {
        return <Arrow isChecked isCorrect isSubmitted />
      }

      if (isChecked && !isCorrect && isSubmitted) {
        return <IncorrectCheckedAnswerIcon />
      }

      return <Circle />
    }

    // if checkbox quiz
    if (isChecked && !isCorrect && isSubmitted) {
      return <IncorrectCheckedAnswerIcon className="quadro" />
    }

    return <Arrow isSubmitted={isSubmitted} isCorrect={isCorrect} isChecked={isChecked} />
  }, [isRadioQuiz, isChecked, isCorrect, isSubmitted])

  const icon = isChecked || (!isMobile && isHovering) ? selectedIcon : null

  const handleCardClick = () => {
    if (isSubmitted) return
    context?.toggleAnswers(question)
  }

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  return (
    <CardWrapper isImageQuiz={isImageQuiz} isInsideDialog={isInsideDialog}>
      <CardLayout
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleCardClick}
        isChecked={isChecked}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
      >
        {question?.imgUrl && <ImageLayout src={question?.imgUrl} />}
        <CheckboxAndTitleBox isHintVisible={isHintVisible}>
          <Checkbox
            isBordered={isRadioQuiz}
            isImageQuiz={isImageQuiz}
            isHovering={isHovering}
            isChecked={isChecked}
            isCorrect={isCorrect}
            isUntouched={isUntouched}
            isSubmitted={isSubmitted}
            isRadioQuiz={isRadioQuiz}
          >
            {icon}
          </Checkbox>
          <Title isSubmitted={isSubmitted} isChecked={isChecked} isCorrect={isCorrect}>
            <Markdown>{question.content}</Markdown>
          </Title>
        </CheckboxAndTitleBox>
        {isHintVisible && (
          <Hint isChecked={isChecked} isCorrect={isCorrect} isSubmitted={isSubmitted}>
            {answerFeedback}
          </Hint>
        )}
      </CardLayout>
    </CardWrapper>
  )
}

export default Card
