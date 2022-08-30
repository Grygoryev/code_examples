import { Quiz } from '~/domain/course'

export function quizAnswerValidate(quiz: Quiz[], answers: Quiz[]) {
  const correctAnswers = quiz.filter(question => question.isCorrect)
  const userCorrectAnswers = answers.every(answer => answer.isCorrect)

  if (!userCorrectAnswers) return false
  if (correctAnswers.length !== answers.length) return false

  return true
}
