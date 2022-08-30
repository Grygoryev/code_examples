import { isEqual } from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Text } from '~/primitives/text'

import { localPalette } from '../../common/localPalette'
import { FillTheGapContext } from '../context'
import { AnswerBlankProps, BlanksMapItemProps } from '../types'

export const AnswerBlank = React.memo(
  ({ correctAnswerId, blankIndex }: AnswerBlankProps) => {
    const {
      blanksMap,
      setBlanksMap,
      isSubmitted,
      indexCurrentBlankToFill,
      setIndexCurrentBlankToFill,
      toggleAnswerInMap,
    } = React.useContext(FillTheGapContext)

    const ref = React.useRef<any>(null)
    const [isReserved, setReserved] = React.useState<boolean | undefined>(false)
    const [reservedValue, setReservedValue] = React.useState<number | string | null | undefined>(null)
    const [reservedId, setReservedId] = React.useState<any>(null)
    const [isCorrectAnswer, setIsCorrectAnswer] = React.useState<boolean>(false)

    const isNextBlankToFill = indexCurrentBlankToFill === blankIndex

    const handleBlankClick = React.useCallback(() => {
      if (isSubmitted) return
      // check if blank is empty, if it is
      // we make it next blank to fill, when user click answer
      if (!isReserved) {
        setIndexCurrentBlankToFill(blankIndex)
      }

      if (isReserved) {
        const blanksOmitCurrentBlank = blanksMap.filter((blank: BlanksMapItemProps) => blank.index !== blankIndex)
        const currentBlank = blanksMap.find((blank: BlanksMapItemProps) => blank.index === blankIndex)

        setIndexCurrentBlankToFill(blankIndex)
        toggleAnswerInMap(reservedId)
        setBlanksMap([
          ...blanksOmitCurrentBlank,
          {
            ...currentBlank,
            isReserved: false,
            reservedValue: null,
            reservedId: null,
          },
        ])
      }
    }, [
      blanksMap,
      setBlanksMap,
      isReserved,
      reservedId,
      blankIndex,
      setIndexCurrentBlankToFill,
      isSubmitted,
      toggleAnswerInMap,
    ])

    React.useEffect(() => {
      if (!blanksMap.length) return
      const currentBlank = blanksMap.find((blank: BlanksMapItemProps) => blank.index === blankIndex)

      if (currentBlank) {
        setReserved(currentBlank.isReserved)
        setReservedValue(currentBlank.reservedValue)
        setReservedId(currentBlank.reservedId)
      }
    }, [blanksMap, blankIndex])

    React.useEffect(() => {
      const isAlreadyInBlanksMap = !!blanksMap.find((blank: BlanksMapItemProps) => blank.index === blankIndex)

      if (!isAlreadyInBlanksMap) {
        setBlanksMap((prev: any) => [
          ...prev,
          {
            index: blankIndex,
            isReserved: false,
            reservedId: null,
            reservedValue: null,
            correctAnswerId,
          },
        ])
      }
    }, [blanksMap, correctAnswerId, blankIndex, setBlanksMap])

    React.useEffect(() => {
      if (correctAnswerId === reservedId) {
        return setIsCorrectAnswer(true)
      }

      setIsCorrectAnswer(false)
    }, [isSubmitted, correctAnswerId, reservedId])

    return (
      <BlankLayout
        isSubmitted={isSubmitted}
        isReserved={isReserved}
        isNextBlankToFill={isNextBlankToFill}
        onClick={handleBlankClick}
        isCorrectAnswer={isCorrectAnswer}
        ref={ref}
      >
        {reservedValue}
      </BlankLayout>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
)

AnswerBlank.displayName = 'AnswerBlank'

const BlankLayout = styled(Text)`
  border-radius: 8px;
  border: 2px solid ${localPalette.lightPurple};
  min-width: 70px;
  min-height: 32px;
  cursor: pointer;
  transition: all 200ms ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${p => css`
    border-color: ${p.isReserved && localPalette.gray};
    border-color: ${p.isNextBlankToFill && !p.isSubmitted && '#fee13d'};
    border-color: ${p.isCorrectAnswer && p.isSubmitted && localPalette.rightAnswer};
    border-color: ${!p.isCorrectAnswer && p.isSubmitted && localPalette.wrongAnswer};
  `}

  &:hover {
    border-color: #6ea4eb;
  }
`
