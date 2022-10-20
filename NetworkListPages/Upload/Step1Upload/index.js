import React from 'react'

import Box from 'components/Box'
import SectionHead from 'components/SectionHead'
import LastUploadBadge from 'components/NetworkLists/LastUpload'
import UpdateCards from 'components/NetworkLists/UpdateCards'

import { NETWORK_LIST_CARD_MENU_ITEM_TYPE } from 'constants/networkLists'

import {
  fetchScheduledNetworkLists,
  fetchDraftNetworkLists,
  deleteNetworkList,
  fetchLastNetworkListUploadDate
} from 'actions/networkList'
import {
  pushRouteParams
} from 'actions/router'

import NetworkListUploadForm from 'forms/NetworkLists/upload'

import { NetworkUploadStepOneContext } from './context'

const SCHEDULE_CARD_MENU_OPTIONS = [
  {
    label: 'Pause and edit',
    menuItemType: NETWORK_LIST_CARD_MENU_ITEM_TYPE.EDIT,
    onClick: (networkListId) => {
      pushRouteParams({ step: 5, listId: networkListId })
    }
  },
  {
    label: 'Delete schedule',
    menuItemType: NETWORK_LIST_CARD_MENU_ITEM_TYPE.DELETE,
    onClick: (networkListId) => {
      deleteNetworkList(networkListId)
    }
  }
]

const DRAFT_CARD_MENU_OPTIONS = [
  {
    label: 'Edit draft',
    menuItemType: NETWORK_LIST_CARD_MENU_ITEM_TYPE.EDIT,
    onClick: (networkListId) => {
      pushRouteParams({ step: 5, listId: networkListId })
    }
  },
  {
    label: 'Delete draft',
    menuItemType: NETWORK_LIST_CARD_MENU_ITEM_TYPE.DELETE,
    onClick: (networkListId) => {
      deleteNetworkList(networkListId)
    }
  }
]

function NetworkListUploadStepOne () {
  const [scheduledUpdates, setScheduledUpdates] = React.useState(null)
  const [draftUpdates, setDraftUpdates] = React.useState(null)

  const contextMenuBtnOptions = {
    draft: DRAFT_CARD_MENU_OPTIONS,
    schedule: SCHEDULE_CARD_MENU_OPTIONS
  }

  const contextValues = {
    scheduledUpdates,
    setScheduledUpdates,
    draftUpdates,
    setDraftUpdates,
    contextMenuBtnOptions
  }

  const lastUploadDate = React.useMemo(() =>
    fetchLastNetworkListUploadDate(),
  [])

  React.useEffect(() => {
    try {
      fetchScheduledNetworkLists()
        .then(result => {
          setScheduledUpdates(result.payload)
        })

      fetchDraftNetworkLists()
        .then(result => {
          setDraftUpdates(result.payload)
        })
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <NetworkUploadStepOneContext.Provider value={contextValues}>
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Box width={385} mb={0}>
          <SectionHead
            subtitle='Upload network list'
            description='Import a new network list file as .csv'
          />
          <NetworkListUploadForm />
        </Box>
        <LastUploadBadge lastUploadDate={lastUploadDate} />
      </Box>
      <Box>
        {!!scheduledUpdates?.length &&
          <UpdateCards
            // TODO: make subtitle prop be "title"
            subtitle='Scheduled network list update'
            description='List of your scheduled network list updates'
            networkLists={scheduledUpdates}

          />}
        {!!draftUpdates?.length &&
          <UpdateCards
            subtitle='Draft network list update'
            description='List of your scheduled network list updates'
            networkLists={draftUpdates}
          />}
      </Box>
    </NetworkUploadStepOneContext.Provider>
  )
}

export default NetworkListUploadStepOne
