import { Quiz } from '~/domain/course'

import { quizAnswerValidate } from './quiz-validate'

const mockQuestions: Quiz[] = [
  {
    id: '0',
    content: 'Python — это язык программирования, он нужен, чтобы человек мог объяснить компьютеру, что делать.',
    hint: 'Correct! Python is an extremely versatile language.',
    isCorrect: true,
  },
  {
    id: '1',
    content: 'Змея с Амазонки, она нужна для того чтобы о ней снимали страшные фильмы или показывали в зоопарке.',
    hint: 'Correct! Python is an extremely versatile language.',
    isCorrect: false,
  },
  {
    id: '2',
    content: 'Программа, которая заказывает такси',
    hint: 'Correct! Python is an extremely versatile language.',
    isCorrect: false,
  },
  {
    id: '3',
    content: 'Программа, которая заказывает такси',
    hint: 'Correct! Python is an extremely versatile language.',
    isCorrect: true,
  },
]

describe('quiz component: validate answers', () => {
  it('should be false, if the answers are empty', () => {
    const result = quizAnswerValidate(mockQuestions, [])

    expect(result).toBeFalsy()
  })
  it('should be true, when all answers are correct', () => {
    const result = quizAnswerValidate(mockQuestions, [
      {
        isCorrect: true,
      } as Quiz,
      {
        isCorrect: true,
      } as Quiz,
    ])

    expect(result).toBeTruthy()
  })
  it('should be false, if the answers are not correct', () => {
    expect(
      quizAnswerValidate(mockQuestions, [
        {
          isCorrect: false,
        } as Quiz,
        { isCorrect: true } as Quiz,
      ]),
    ).toBeFalsy()
    expect(
      quizAnswerValidate(mockQuestions, [
        {
          isCorrect: true,
        } as Quiz,
        { isCorrect: false } as Quiz,
      ]),
    ).toBeFalsy()
  })
})
