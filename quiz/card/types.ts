import { Quiz, QuizType } from '~/domain/course'

export type CardProps = {
  isCorrect?: boolean
  question: Quiz
  isImageQuiz: boolean
  isInsideDialog?: boolean
} & Pick<QuizType, 'optionType'>

export type PrimaryCardProps = CardProps & {
  isChecked: boolean
}

export type ImageProps = {
  src?: string
}
