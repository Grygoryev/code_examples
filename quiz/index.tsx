import React, { useState, useContext, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { MessageWithLayoutProps } from '~/components/course/message/types'
import { Markdown } from '~/components/markdown'
import { QuizType, Quiz as QuizOptionType, MESSAGES_TYPES } from '~/domain/course'
import { getAnswerParams } from '~/domain/user-answer'
import { useGetCurrentAnswer } from '~/hooks/use-get-current-answer'
import { Box } from '~/primitives/box'
import { RestartArrowIcon } from '~/primitives/icon/variants/restart-arrow'
import { css } from '~/theming/styled'

import { CourseContext, CourseContextType } from '../../course/context'
import { Header, Title, Description, Footer, ButtonWrap, Container, ResetButton } from '../common'
import Card from './card'
import { QuizContext } from './context'

export type QuizProps = MessageWithLayoutProps & {
  message: QuizType
  isInsideDialog?: boolean
  onNext?: () => void
}

export const Quiz = ({ message, isInsideDialog, MessageLayout, onNext }: QuizProps) => {
  const [answers, setAnswers] = useState<QuizOptionType[]>([])
  const [isSubmitted, setHasSubmitted] = useState(false)
  // TODO: blockPromotion here is used as a flag for show TryAgainButton
  // perhaps it's better to rename it to showTryAgain, setShowTryAgain
  // but I am not aware of what is isInteractiveBlockPromotion from message
  const [blockPromotion, setBlockPromotion] = useState(false)

  const { handleSetAnswer, course, isAssesment: isDisableValidation } = useContext(CourseContext) as CourseContextType
  const currentAnswer = useGetCurrentAnswer(course.id, message.id)

  const { content, options, optionType = 'checkbox', isInteractiveBlockPromotion } = message
  const isCheckboxType = optionType === 'checkbox'

  const isAllAnswerCorrect = useMemo(() => {
    const isSelectedCorrect = answers?.every(answer => answer.isCorrect)
    const allCorrectOptions = options.filter(option => option.isCorrect)

    return isSelectedCorrect && answers.length === allCorrectOptions.length
  }, [answers, options])

  const reset = () => {
    setAnswers([])
    setHasSubmitted(false)
    setBlockPromotion(false)
  }

  const toggleAnswers = (answer: QuizOptionType) => {
    if (optionType === 'checkbox') {
      return toggleCheckboxAnswers(answer)
    }

    return setRadioAnswer(answer)
  }

  const setRadioAnswer = (answer: QuizOptionType) => {
    setAnswers([answer])
  }

  const toggleCheckboxAnswers = (answer: QuizOptionType) => {
    if (answers.find(question => question.id === answer.id)) {
      setAnswers(prev => prev.filter(question => question.id !== answer.id))
    } else {
      setAnswers(prev => [...prev, answer])
    }
  }

  const handleSubmitClick = () => {
    setHasSubmitted(true)

    if (isInteractiveBlockPromotion && !isAllAnswerCorrect) {
      setBlockPromotion(true)
      return
    }

    handleSetAnswer({
      ...getAnswerParams(message),
      answer: answers,
      isCorrect: !answers?.find(answer => !answer.isCorrect),
    })

    if (isDisableValidation) {
      reset()
      onNext && onNext()
    }
  }

  useEffect(() => {
    if (currentAnswer?.type === MESSAGES_TYPES.QUIZ) {
      setAnswers(currentAnswer?.answer)
      setHasSubmitted(true)
    }
  }, [currentAnswer])

  const isImageQuiz = options.some(option => option.imgUrl)

  return (
    <QuizContext.Provider
      value={{ answers, isSubmitted, checkWasCalled: isDisableValidation ? false : isSubmitted, toggleAnswers }}
    >
      <Container isInsideDialog={isInsideDialog} isImageQuiz={isImageQuiz}>
        <MessageLayout>
          <>
            <Header>
              {message?.title && (
                <Title>
                  <Markdown>{message.title}</Markdown>
                </Title>
              )}
              {content && (
                <Description>
                  <Markdown>{content}</Markdown>
                </Description>
              )}
            </Header>
            <Body>
              <QuizCards isImageQuiz={isImageQuiz} isInsideDialog={isInsideDialog}>
                {options.map((question, index) => (
                  <React.Fragment key={question.id}>
                    <Card
                      isInsideDialog={isInsideDialog}
                      question={question}
                      optionType={optionType}
                      isImageQuiz={isImageQuiz}
                    />
                    {!isImageQuiz && isInsideDialog && options.length - 1 !== index && <Line />}
                  </React.Fragment>
                ))}
              </QuizCards>
            </Body>
          </>
        </MessageLayout>
        {!isSubmitted && !blockPromotion && (
          <Footer>
            <ButtonWrap disabled={!answers?.length} onClick={handleSubmitClick}>
              {isDisableValidation ? 'Next' : 'Submit'}
            </ButtonWrap>
            {isCheckboxType && (
              <ResetButton onClick={reset}>
                <RestartArrowIcon />
              </ResetButton>
            )}
          </Footer>
        )}
        {blockPromotion && <TryAgainButton onClick={reset}>Try again</TryAgainButton>}
      </Container>
    </QuizContext.Provider>
  )
}

const TryAgainButton = styled(ButtonWrap)`
  padding: 20px;
`

const Body = styled(Box)`
  flex-wrap: wrap;
  align-items: stretch;
  border-radius: 6px;
  width: 100%;
`

const QuizCards = styled(Box)`
  ${p =>
    p.isImageQuiz
      ? css`
          flex-direction: row;
          flex-wrap: wrap;
          user-select: none;
          justify-content: center;
        `
      : css`
          text-align: left;
        `}
`

const Line = styled(Box)`
  height: 1px;
  width: calc(100% - 68px);
  background-color: ${({ theme }) => theme.colors.light3};
  margin-left: 35px;
`
