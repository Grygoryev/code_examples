import React from 'react'
import styled from 'styled-components/macro'
import { Box } from '~/primitives/box'
import { Text } from '~/primitives/text'

import { localPalette } from '../../common/localPalette'

export const BashCode = ({ children }: { children?: React.ReactNode | React.ReactNode[] | string }) => {
  return (
    <LayoutWapper>
      <Layout>{children}</Layout>
    </LayoutWapper>
  )
}
const LayoutWapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow-x: hidden;
`

const Layout = styled(Text)`
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  width: 100%;

  pre {
    background-color: ${localPalette.kindOfWhite};
    border: 1px solid ${localPalette.kindOfWhite2};
    width: 100%;
  }

  code {
    border-radius: 16px;
    font-size: 16px;
    line-height: 24px;
    font-family: 'Menlo', monospace;
    padding: 24px;
    color: ${localPalette.kindOfBlack};
    width: 100%;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 20px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;
  }
`
export const CodeLine = styled('p')`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`
