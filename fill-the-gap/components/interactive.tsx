import { isEqual } from 'lodash'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import styled, { css } from 'styled-components/macro'
import { Box } from '~/primitives/box'
import { RestartArrowIcon } from '~/primitives/icon/variants/restart-arrow'
import { CommonObjectType } from '~/types/common'

import { ButtonWrap, Footer, ResetButton } from '../../common'
import { localPalette } from '../../common/localPalette'
import { FillTheGapContext } from '../context'
import { getAnswerData, handleFillTheGapBlock } from '../helpers'
import { InteractiveProps, AnswerId, BlanksMapItemProps } from '../types'
import { AnswersPanel } from './answers-panel'

const makeAnswersMapFromOptions = (answersFromServer: CommonObjectType) => {
  const preparedAnswers: any = {}

  /**
   * answersFromServer is object, which has view
   * { answerValue: answerId, answerValue2: answerId2 }
   *
   * Object.entries(answerFromServer) has view:
   * [[answerValue, answerId], [answerValue2, answerId2]]
   *
   * simply iterate through entries and extract data
   */
  for (const [value, id] of Object.entries(answersFromServer)) {
    if (!preparedAnswers[id]) {
      preparedAnswers[id] = {
        id,
        value,
        isChoosen: false,
      }
    }
  }
  return preparedAnswers
}

/**
 * answersMap - holds info about possible answers
 * { id, value, isChoosen }
 * blanksMap - holds info about blanks
 * { index, isReserved, reservedId, reservedValue, correctAnswerId  }
 */
const Interactive = ({ onNext, hintFailMessage, hintSuccessMessage, answersFromServer, content }: InteractiveProps) => {
  const [answersMap, setAnswersMap] = React.useState<any>({})
  const [blanksMap, setBlanksMap] = React.useState<any>([])
  const [indexCurrentBlankToFill, setIndexCurrentBlankToFill] = React.useState(0)

  const [isSubmitAllowed, setSubmitAllowed] = React.useState(true)
  const [isSubmitted, setSubmitted] = React.useState(false)

  const [isTestPassed, setTestPassed] = React.useState(false)
  const [hintMessage, setHintMessage] = React.useState<string | undefined>('')

  const resetAnswersMap = React.useCallback(() => {
    const resettedMap = { ...answersMap }

    for (let answer in answersMap) {
      resettedMap[answer].isChoosen = false
    }

    setAnswersMap(resettedMap)
  }, [answersMap, setAnswersMap])

  const resetBlanksMap = React.useCallback(() => {
    const resettedMap = blanksMap.map((blank: BlanksMapItemProps) => {
      return {
        ...blank,
        isReserved: false,
        reservedValue: null,
        reservedId: null,
      }
    })
    setBlanksMap(resettedMap)
  }, [blanksMap])

  const updateSubmitAllowance = React.useCallback(() => {
    const anyAnswer = blanksMap.find((blank: BlanksMapItemProps) => blank.isReserved)

    if (anyAnswer?.isReserved) {
      return setSubmitAllowed(true)
    }

    setSubmitAllowed(false)
  }, [blanksMap])

  const resetIndexCurrentBlankIfShould = React.useCallback(() => {
    const anyReservedBlank = blanksMap.find((blank: BlanksMapItemProps) => blank.isReserved)?.isReserved

    if (!anyReservedBlank) {
      setIndexCurrentBlankToFill(0)
    }
  }, [blanksMap])

  const upgradeIndexCurrentBlankToFill = React.useCallback(() => {
    const nextBlank = blanksMap.find((blank: BlanksMapItemProps) => blank.index === indexCurrentBlankToFill + 1)

    if (!nextBlank) return

    if (!nextBlank.isReserved) {
      setIndexCurrentBlankToFill(nextBlank.index)
    }
  }, [blanksMap, indexCurrentBlankToFill])

  const toggleAnswerInMap = React.useCallback(
    answerId => {
      const { isChoosen, ...rest } = answersMap[answerId]

      if (answersMap[answerId]) {
        setAnswersMap((prev: any) => ({
          ...prev,
          [answersMap[answerId].id]: {
            ...rest,
            isChoosen: !isChoosen,
          },
        }))
      }
    },
    [answersMap],
  )

  // handle- means this func is binded with UI
  const handleSubmitClick = React.useCallback(() => {
    setSubmitted(true)

    const correctAnswers = blanksMap.filter((blank: BlanksMapItemProps) => blank.correctAnswerId === blank.reservedId)
    const testPassed = correctAnswers.length === blanksMap.length

    if (testPassed) {
      setTestPassed(true)
      setHintMessage(hintSuccessMessage)
    }

    if (!testPassed) {
      setTestPassed(false)
      setHintMessage(hintFailMessage)
    }

    onNext && onNext()
  }, [blanksMap, onNext, hintFailMessage, hintSuccessMessage])

  const handleResetInteractive = React.useCallback(() => {
    setSubmitted(false)
    resetAnswersMap()
    resetBlanksMap()
    setIndexCurrentBlankToFill(0)
  }, [resetAnswersMap, resetBlanksMap])

  const handleAnswerClick = React.useCallback(
    (id: AnswerId) => {
      if (isSubmitted) return

      toggleAnswerInMap(id)

      const { value } = getAnswerData({ answersMap, answerId: id })
      const blanksOmitCurrentBlank = blanksMap.filter(
        (blank: BlanksMapItemProps) => blank.index !== indexCurrentBlankToFill,
      )
      const currentBlankToFill = blanksMap.find((blank: BlanksMapItemProps) => blank.index === indexCurrentBlankToFill)

      const isCurrentBlankReserved = currentBlankToFill?.isReserved

      if (isCurrentBlankReserved) {
        toggleAnswerInMap(currentBlankToFill?.reservedId)
      }

      setBlanksMap(
        [
          ...blanksOmitCurrentBlank,
          {
            ...currentBlankToFill,
            isReserved: true,
            reservedValue: value,
            reservedId: id,
          },
        ].sort((a: BlanksMapItemProps, b: BlanksMapItemProps) => a.index - b.index),
      )

      upgradeIndexCurrentBlankToFill()
    },
    [answersMap, blanksMap, isSubmitted, upgradeIndexCurrentBlankToFill, indexCurrentBlankToFill, toggleAnswerInMap],
  )

  React.useEffect(() => {
    const preparedAnswers = makeAnswersMapFromOptions(answersFromServer)
    setAnswersMap(preparedAnswers)
  }, [answersFromServer])

  React.useEffect(() => {
    updateSubmitAllowance()
    resetIndexCurrentBlankIfShould()
  }, [blanksMap, resetIndexCurrentBlankIfShould, updateSubmitAllowance])

  const contextValue = React.useMemo(
    () => ({
      handleAnswerClick,
      toggleAnswerInMap,
      answersMap,
      setAnswersMap,
      setSubmitAllowed,
      blanksMap,
      setBlanksMap,
      indexCurrentBlankToFill,
      setIndexCurrentBlankToFill,
      isSubmitted,
    }),
    [
      handleAnswerClick,
      toggleAnswerInMap,
      answersMap,
      setAnswersMap,
      setSubmitAllowed,
      blanksMap,
      setBlanksMap,
      indexCurrentBlankToFill,
      setIndexCurrentBlankToFill,
      isSubmitted,
    ],
  )

  return (
    <FillTheGapContext.Provider value={contextValue}>
      <Layout>
        <CodeBlock>
          <MemoizedMarkdown content={content} />
        </CodeBlock>
        <AnswersPanel answersMap={answersMap} handleAnswerClick={handleAnswerClick} />
        {!isSubmitted && (
          <Footer>
            <ButtonWrap disabled={!isSubmitAllowed} onClick={handleSubmitClick}>
              Submit
            </ButtonWrap>
            <ResetButton onClick={handleResetInteractive}>
              <RestartArrowIcon />
            </ResetButton>
          </Footer>
        )}
        {isSubmitted && <Hint isTestPassed={isTestPassed}>{hintMessage}</Hint>}
      </Layout>
    </FillTheGapContext.Provider>
  )
}

export const MemoizedInteractive = React.memo(Interactive)

const MemoizedMarkdown = React.memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ children }) => handleFillTheGapBlock({ children }),
        }}
      >
        {content}
      </ReactMarkdown>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
)

MemoizedMarkdown.displayName = 'MemoizedMarkdown'

const Layout = styled('div')`
  position: relative;
  width: 100%;
`

export const CodeBlock = styled(Box)`
  width: 100%;
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Menlo', monospace;
  color: ${localPalette.kindOfBlack};
  width: 100%;
  background-color: ${localPalette.kindOfWhite};
  border: 1px solid ${localPalette.kindOfWhite2};
  min-height: 160px;

  pre {
    width: 100%;
    background-color: ${localPalette.kindOfWhite};
  }
`
export const Hint = styled(Box)`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  // turning off selecting cursor on text
  & > div > * {
    cursor: pointer;
    user-select: none;
  }

  ${p => css`
    color: ${p.isTestPassed && localPalette.rightAnswer};
    color: ${!p.isTestPassed && localPalette.wrongAnswer};
  `};
`
