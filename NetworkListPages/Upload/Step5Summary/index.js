import React from 'react'

import Box from 'components/Box'
import SectionHead from 'components/SectionHead'

function NetworkListUploadStepFive () {
  return (
    <Box
      display='flex'
      alignItems='flex-start'
      justifyContent='space-between'
    >
      <Box width={385} mb={0}>
        <SectionHead
          subtitle='Review and submit'
          description='Review the following '
        />
      </Box>
    </Box>
  )
}

export default NetworkListUploadStepFive
