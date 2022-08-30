import React from 'react'
import { MessageWithLayoutProps } from '~/components/course/message/types'
import { FillTheGapType } from '~/domain/course'
import { isEmptyObject } from '~/helpers/object'

import { Header, Title, Description, Container } from '../common'
import { MemoizedInteractive } from './components/interactive'

export type FillTheGapProps = MessageWithLayoutProps & {
  message: FillTheGapType
  onNext?: () => void
}

export const FillTheGap = ({ message, onNext }: FillTheGapProps) => {
  const showInteractive = React.useMemo(() => !isEmptyObject(message.options) && !!message?.content, [message])

  return (
    <Container>
      <Header>
        <Title>{message.title}</Title>
        <Description>{message.description}</Description>
      </Header>
      {showInteractive && (
        <MemoizedInteractive
          hintFailMessage={message.wrongAnswer}
          hintSuccessMessage={message.successAnswer}
          onNext={onNext}
          content={message.content}
          answersFromServer={message.options}
        />
      )}
    </Container>
  )
}
