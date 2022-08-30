import React from 'react'
import { Quiz } from '~/domain/course'

export type QuizContextType = {
  answers: Quiz[]
  checkWasCalled: boolean
  toggleAnswers: (question: Quiz) => void
  isSubmitted?: boolean
}

export const QuizContext = React.createContext<QuizContextType | null>(null)
