import styled from 'styled-components/macro'
import { Box } from '~/primitives/box'
import { css } from '~/theming/styled'
import { DukeTheme } from '~/theming/types'

import { localPalette } from '../../common/localPalette'

export const CardWrapper = styled(Box)<{ isInsideDialog?: boolean }>`
  position: relative;
  background-color: transparent;
  width: ${p => (p.isImageQuiz ? '340px' : 'auto')};
  ${({ isInsideDialog }) => (isInsideDialog ? 'background-color: transparent;' : '')}
  font-size: 16px;
  font-weight: 500;
  margin-bottom: ${p => calculateCardWrapperMargin(p.isInsideDialog, p.isImageQuiz, p.theme)};

  * {
    box-sizing: border-box;
  }
`

export const CardLayout = styled(Box)`
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 20px 18px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;

  ${p => css`
    border-color: ${p.isChecked && !p.isSubmitted && localPalette.lightPurple};
    border-color: ${!p.isCorrect && p.isChecked && p.isSubmitted && localPalette.wrongAnswer};
    border-color: ${p.isCorrect && p.isSubmitted && p.isChecked && localPalette.rightAnswer};
  `}

  &:hover {
    cursor: pointer;
    background-color: ${localPalette.lightGray};
  }
`

export const CheckboxAndTitleBox = styled(Box)`
  flex-direction: row;
  align-items: center;

  ${p => css`
    margin-bottom: ${p.isHintVisible && '12px'};
  `}
`

export const Checkbox = styled(Box)`
  position: relative;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;

  //background handling
  ${p => css`
    background-color: ${p.theme.colors.white};
    background-color: ${p.isSubmitted && p.isCorrect && p.isChecked && localPalette.rightAnswer};
    background-color: ${p.isSubmitted && !p.isCorrect && p.isChecked && localPalette.wrongAnswer};
    background-color: ${p.isChecked && !p.isRadioQuiz && localPalette.lightPurple};
    background-color: ${p.isChecked && !p.isRadioQuiz && p.isCorrect && p.isSubmitted && localPalette.rightAnswer};
  `}

  //border handling
  ${p => css`
    border-radius: ${p.isBordered ? '50%' : '4px'};

    // base state of checkbox
    border: ${p.isUntouched && `2px solid ${localPalette.checkBoxStaticBorder}`};

    border: ${p.isHovering && p.isRadioQuiz && `2px solid ${localPalette.gray}`};
    border: ${p.isChecked && p.isRadioQuiz && `6px solid ${localPalette.lightPurple}`};
    border: ${!p.isChecked && p.isHovering && !p.isRadioQuiz && `2px solid ${localPalette.gray}`};

    // answer is correct and checked
    border: ${p.isChecked && p.isCorrect && p.isSubmitted && `2px solid ${localPalette.rightAnswer}`};

    // answer is correct, but user has not checked it
    border: ${p.isCorrect && !p.isChecked && p.isSubmitted && `2px solid ${localPalette.rightAnswer}`};

    // answer is not correct and user has not checked it
    border: ${!p.isCorrect && p.isSubmitted && !p.isChecked && `2px solid ${localPalette.textNotCheckedWhenSubmit}`};

    // wrong checked answer
    border: ${!p.isCorrect && p.isChecked && p.isSubmitted && `2px solid ${localPalette.wrongAnswer}`};
  `}

  ${({ isImageQuiz }) =>
    isImageQuiz
      ? css`
          position: absolute;
          top: 20px;
          left: 20px;
        `
      : ''}
`

export const Arrow = styled(Box)`
  position: relative;
  pointer-events: none;

  &::before,
  &::after {
    position: absolute;
    content: '';
  }

  &::after {
    height: 6px;
    width: 10px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    color: ${p => p.theme.colors.white};
    transform: translate(-50%, -50%) rotate(-45deg);
    top: -2px;

    ${p => {
      const isRightCheckedSubmitted = p.isChecked && p.isCorrect && p.isSubmitted

      return css`
        border-color: ${isRightCheckedSubmitted && p.theme.colors.white};
        height: ${isRightCheckedSubmitted && '4px'};
        width: ${isRightCheckedSubmitted && '8px'};
      `
    }}
  }
`

export const IncorrectCheckedAnswerIcon = styled('div')`
  position: relative;
  pointer-events: none;
  background: ${localPalette.wrongAnswer};
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &.quadro {
    border-radius: 4px;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    background: #ffffff;
  }

  &::after {
    height: 10px;
    width: 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::before {
    height: 10px;
    width: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`

export const Title = styled(Box)`
  flex-grow: 2;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  padding-left: 6px;
  padding-right: 16px;
  color: ${localPalette.textStandard};

  ${p => css`
    color: ${!p.isCorrect && p.isSubmitted && !p.isChecked && localPalette.textNotCheckedWhenSubmit};
  `}

  // turning off selecting cursor on text
  & > div > * {
    cursor: pointer;
    user-select: none;
  }
`

export const Hint = styled(Title)`
  width: 100%;
  font-weight: 500;

  ${p => css`
    color: ${p.isCorrect && p.isSubmitted && localPalette.rightAnswer};
  `};

  ${p => css`
    color: ${!p.isCorrect && p.isSubmitted && p.isChecked && localPalette.wrongAnswer};
  `};
`

export const ImageLayout = styled(Box)`
  width: 100%;
  height: 280px;
  background-image: url(${p => p.src}});
  background-color: ${p => p.theme.colors.light5};
  background-size: cover;
  background-position: center;
`

export const Circle = styled(Box)`
  width: 8px;
  height: 8px;
  background-color: ${p => p.theme.colors.white};
  border-radius: 50%;
  pointer-events: none;
`

export const LineIcon = styled(Box)`
  width: 12px;
  height: 1px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green1};
`

const calculateCardWrapperMargin = (isInsideDialog: boolean, isImageQuiz: boolean, theme: DukeTheme) => {
  if (!isImageQuiz) {
    return isInsideDialog ? '0' : `${theme.margins.quizLine.md}`
  }

  if (isInsideDialog) {
    return '0'
  }

  return `${theme.margins.quizLine.md}`
}
