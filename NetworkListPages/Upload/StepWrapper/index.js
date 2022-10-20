import React from 'react'

import NetworkListUploadStepOne from 'containers/NetworkListPages/Upload/Step1Upload'
import NetworkListUploadStepTwo from 'containers/NetworkListPages/Upload/Step2Compare'
import NetworkListUploadStepThree from 'containers/NetworkListPages/Upload/Step3AffectedCompanies'
import NetworkListUploadStepFive from 'containers/NetworkListPages/Upload/Step5Summary'

export default function StepWrapper ({ step }) {
  return (
    (() => {
      switch (step) {
        case '1':
          return <NetworkListUploadStepOne />
        case '2':
          return <NetworkListUploadStepTwo />
        case '3':
          return <NetworkListUploadStepThree />
        case '4':
          return <NetworkListUploadStepOne />
        case '5':
          return <NetworkListUploadStepFive />
        default:
          return <NetworkListUploadStepOne />
      }
    })()
  )
}
