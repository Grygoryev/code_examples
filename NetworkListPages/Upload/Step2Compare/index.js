import React from 'react'

import ActionButtons from 'components/NetworkLists/UploadActionButtons'
import Box from 'components/Box'
import LoadIndicator from 'components/NetworkLists/LoadIndicator'
import NetworkList from 'components/NetworkLists/DifferencesList'
import SectionHead from 'components/SectionHead'
import ToggleViewBox from 'components/NetworkLists/ToggleViewBox'

import { UploadNetworkListContext } from 'containers/NetworkListPages/Upload/context'

import {
  LISTS_COMPARE_VIEW_PARAMS,
  LISTS_COMPARE_RADIO_OPTIONS
} from 'constants/networkLists'

import { getComparedLists } from 'actions/networkList'

import { createNetworksListsForCompare } from 'lib/networksList'

import useStyles from './styles'

import NetworkListsCompareContext from './context'

function NetworkListUploadStepTwo () {
  const { handleSetNewListInPageContext } = React.useContext(UploadNetworkListContext)
  const [comparedList, setComparedList] = React.useState(null)
  const [newList, setNewList] = React.useState(null)
  const [currentList, setCurrentList] = React.useState(null)
  const [openedRegions, setOpenedRegions] = React.useState([])
  const [showParams, setShowParams] = React.useState(LISTS_COMPARE_VIEW_PARAMS.SHOW_ALL)

  const contextState = {
    openedRegions,
    setOpenedRegions,
    showParams
  }

  const classes = useStyles()

  const handleShowParamsToggle = event => {
    setShowParams(event.target.value)
  }

  React.useEffect(
    () => {
      try {
        getComparedLists()
          .then(result => {
            setComparedList(result)
          })
      } catch (e) {
        console.log(e)
      }
    }, [])

  React.useEffect(async () => {
    if (comparedList) {
      const {
        newList: _newList,
        currentList: current
      } = await createNetworksListsForCompare(comparedList)

      setNewList(_newList)
      setCurrentList(current)
      handleSetNewListInPageContext(_newList)
    }
  }, [comparedList])

  return (
    <>
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Box mb={0}>
          <SectionHead
            subtitle='Review the two network lists'
            description='Review and compare the newly uploaded network list with the current list'
          />
        </Box>
        <ActionButtons
          currentStep={2}
        />
      </Box>
      <LoadIndicator />
      <ToggleViewBox
        value={showParams}
        onChange={handleShowParamsToggle}
        options={LISTS_COMPARE_RADIO_OPTIONS}
      />
      <Box className={classes.lists}>
        <NetworkListsCompareContext.Provider value={contextState}>
          {!!newList?.networksRegions?.length &&
            <NetworkList
              isNewNetworkList
              list={newList}
            />}
          {!!currentList?.networksRegions?.length &&
            <NetworkList
              list={currentList}
            />}
        </NetworkListsCompareContext.Provider>
      </Box>
    </>
  )
}

export default NetworkListUploadStepTwo
