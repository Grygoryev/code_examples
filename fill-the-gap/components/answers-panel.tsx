import React from 'react'
import styled from 'styled-components/macro'
import { Box } from '~/primitives/box'

import { AnswersPanelProps } from '../types'
import { Answer } from './answer'

export const AnswersPanel = ({ answersMap, handleAnswerClick }: AnswersPanelProps) => {
  return (
    <AnswersContainer>
      {Object.values(answersMap)?.map((answer: any) => {
        return (
          <Answer
            onAnswerClick={() => handleAnswerClick(answer.id)}
            value={answer.value}
            key={answer.id}
            id={answer.id}
            isChoosen={answer.isChoosen}
          />
        )
      })}
    </AnswersContainer>
  )
}

const AnswersContainer = styled(Box)`
  margin-bottom: 32px; // in figma 40px, but <Answer /> gives +8px margin-bottom
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`
