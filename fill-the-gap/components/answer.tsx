import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Box } from '~/primitives/box'

import { localPalette } from '../../common/localPalette'
import { AnswerProps } from '../types'

export const Answer = ({ id, value, onAnswerClick, isChoosen }: AnswerProps) => {
  const ref = React.useRef<any>(null)

  const handleAnswerClick = () => {
    if (isChoosen) return
    onAnswerClick(id)
  }
  return (
    <AnswerWrap isChoosen={isChoosen}>
      <AnswerLayout isChoosen={isChoosen} onClick={handleAnswerClick} ref={ref}>
        {value}
      </AnswerLayout>
    </AnswerWrap>
  )
}

const AnswerWrap = styled(Box)`
  height: 32px;
  margin: 0 8px 8px 0;
  border-radius: 8px;

  ${p => css`
    border: ${p.isChoosen && `3px dashed ${localPalette.gray}`};
  `}
`

const AnswerLayout = styled(Box)`
  padding: 4px 8px;
  border-radius: 8px;
  width: auto;
  flex-grow: 0;
  cursor: pointer;
  min-width: 60px;
  justify-content: center;
  border: 1px solid ${localPalette.kindOfWhite2};
  background-color: ${localPalette.kindOfWhite};
  margin-bottom: 24px;
  height: 32px;
  transition: 100ms all ease;

  ${p => css`
    opacity: ${p.isChoosen && '0'};
  `}

  &:hover {
    border: 2px solid ${localPalette.gray};
  }
`
