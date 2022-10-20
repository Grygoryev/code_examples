import React from 'react'

import ActionButtons from 'components/NetworkLists/UploadActionButtons'
import Box from 'components/Box'
import LoadIndicator from 'components/NetworkLists/LoadIndicator'
import SectionHead from 'components/SectionHead'
import ToggleViewBox from 'components/NetworkLists/ToggleViewBox'

import { UploadNetworkListContext } from 'containers/NetworkListPages/Upload/context'

import { getAffectedCompaniesList } from 'actions/networkList'

import {
  AFFECTED_COMPANIES_VIEW_PARAMS,
  AFFECTED_COMPANIES_SHOW_RADIO_OPTIONS
} from 'constants/networkLists'

// import useStyles from './styles'

function NetworkListUploadStepThree () {
  const { getNewNetworkList } = React.useContext(UploadNetworkListContext)

  const newList = getNewNetworkList()

  const [showParams, setShowParams] = React.useState(AFFECTED_COMPANIES_VIEW_PARAMS.SHOW_ONLY_PARENT)
  const [companiesList, setCompaniesList] = React.useState([])

  // const classes = useStyles()

  const handleShowParamsToggle = event => {
    setShowParams(event.target.value)
  }

  React.useEffect(
    () => {
      try {
        getAffectedCompaniesList()
          .then(result => setCompaniesList(result))
      } catch (e) {
        console.log(e)
      }
    }, [])

  React.useEffect(async () => {

  }, [])

  return (
    <>
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Box mb={0}>
          <SectionHead
            subtitle='List of the companies affected by the changes'
            description='Select the companies to be notified'
          />
        </Box>
        <ActionButtons
          currentStep={3}
        />
      </Box>
      <LoadIndicator />
      <ToggleViewBox
        value={showParams}
        onChange={handleShowParamsToggle}
        options={AFFECTED_COMPANIES_SHOW_RADIO_OPTIONS}
      />
    </>
  )
}

export default NetworkListUploadStepThree
