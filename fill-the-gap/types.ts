import { CommonObjectType } from '~/types/common'

export type InteractiveProps = {
  answersFromServer: CommonObjectType
  content: string
  onNext?: () => void
  hintSuccessMessage?: string
  hintFailMessage?: string
}

export type AnswerId = string | number
type AnswerValue = string | number

export type AnswerType = {
  id: AnswerId
  value: AnswerValue
  isChoosen: boolean
}

export type AnswerProps = {
  id: AnswerId
  value: AnswerValue
  onAnswerClick: (id: AnswerId) => void
  isChoosen: boolean
}

export type AnswerBlankProps = {
  correctAnswerId: AnswerId
  blankIndex: number
  isReserved?: boolean
  reservedValue?: string | number | null
}

export type AnswersPanelProps = {
  answersMap: any
  handleAnswerClick: (answer: any) => void
}

export type BlanksMapItemProps = {
  index: number
  isReserved?: boolean
  reservedValue?: string | number | null
  reservedId?: number | string | null
  correctAnswerId?: number | string
}
