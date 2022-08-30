import React from 'react'
import { flatArrayRecursively } from '~/helpers/array'
import { hljs } from '~/lib/highlight'
import { CommonObjectType } from '~/types/common'

import { AnswerBlank } from './components/answer-blank'
import { BashCode, CodeLine } from './components/code'

type CodeBlockProps = {
  children: any
}

const OPEN_ANSWER_ID_TAG = '<answerId>'
const CLOSE_ANSWER_ID_TAG = '</answerId>'

// simply extract id of <answerId>${id}</answerId>
const extractAnswerIdFromTag = (tag: string) => {
  const start = tag.indexOf(OPEN_ANSWER_ID_TAG) + OPEN_ANSWER_ID_TAG.length
  const end = tag.indexOf(CLOSE_ANSWER_ID_TAG)

  return tag.slice(start, end).trim()
}

/**
 * expected result = array
 * ['Some text before', { id: 3 }, 'some text after.']
 */
const replaceAnswersBlanks = (text: string): any[] => {
  const start = text.indexOf(OPEN_ANSWER_ID_TAG)
  const end = text.indexOf(CLOSE_ANSWER_ID_TAG) + CLOSE_ANSWER_ID_TAG.length

  const result: any[] = []

  const answerBlankObject: CommonObjectType = {}

  let restText = ''

  if (start === 0) {
    // as extractAnswerIdFromTag will always take 1st enter, we can just pass it whole text
    answerBlankObject.id = extractAnswerIdFromTag(text)
    result.push(answerBlankObject)
    restText = text.slice(end)
    return [result.flat(), ...replaceAnswersBlanks(restText)]
  }

  // if tag is not at beginning, it means, that we have text before tag
  // so we should save it to result before we extract tag
  const textBeforeTag = text.slice(0, start)
  result.push(textBeforeTag)
  answerBlankObject.id = extractAnswerIdFromTag(text)
  result.push(answerBlankObject)
  restText = text.slice(end)

  // that means no more answerId tag in text
  // so we simply return rest
  if (restText.indexOf(OPEN_ANSWER_ID_TAG) === -1) {
    result.push(restText)
    return result
  }

  return [result.flat(), ...replaceAnswersBlanks(restText)]
}

export const handleFillTheGapBlock = ({ children }: CodeBlockProps) => {
  let preparedResult: any = []

  const splittedByNewLineText = children
    .map((child: any) => (typeof child === 'string' ? child?.split('\n') : child))
    .flat()
    .filter((item: string) => !!item)

  // extracting all <answerId>${id}</answerId>
  splittedByNewLineText.forEach((textPiece: any, index: number) => {
    if (textPiece.indexOf('<answerId>') === -1) {
      preparedResult.push(textPiece)
    } else {
      preparedResult.push(replaceAnswersBlanks(textPiece))
    }
  })

  // to detect a new line in code block,
  // we have to store every line in sub array, but every sub of sub array
  // has to be lifted up to root sub array
  preparedResult = preparedResult.map((subElement: any) => {
    if (Array.isArray(subElement)) {
      return flatArrayRecursively(subElement)
    }

    return subElement
  })

  // TODO: well, it's strange to init it with -1
  // but how we can make index of first blank to 0 otherway?
  let answerBlankIndex = -1

  return (
    <BashCode>
      {preparedResult?.map((subElement: any) => {
        return (
          <CodeLine key={subElement[0].toString()}>
            {Array.isArray(subElement) && (
              <>
                {subElement.map((code: any, index: number) => {
                  if (code.id) {
                    answerBlankIndex += 1
                    return <AnswerBlank key={index} blankIndex={answerBlankIndex} correctAnswerId={code.id} />
                  }

                  const highlighted = hljs.highlightAuto(code).value

                  return (
                    <React.Fragment key={index}>
                      <p dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </React.Fragment>
                  )
                })}
              </>
            )}
            {!Array.isArray(subElement) && (
              <p dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(subElement).value }} />
            )}
          </CodeLine>
        )
      })}
    </BashCode>
  )
}

export const getAnswerData = ({ answersMap, answerId }: any) => answersMap[answerId]
