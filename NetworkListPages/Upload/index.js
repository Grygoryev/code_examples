import React from 'react'

import Box from 'components/Box'
import Breadcrumbs from 'components/Breadcrumbs'
import Container from 'components/Container'
import SectionHead from 'components/SectionHead'
import Toolbar from 'components/Toolbar'

import StepWrapper from './StepWrapper'

// import {
//   pushRouteParams
// } from 'actions/router'

import * as routes from 'constants/routes'

// import useDispatch from 'hooks/useDispatch'
import useRouter from 'hooks/useRouter'

import { UploadNetworkListContext } from './context'

const breadcrumbs = [
  {
    label: 'Management',
    path: routes.ADMIN_SIM_CARDS_ROUTE
  },
  {
    label: 'Network list',
    path: routes.ADMIN_NETWORK_LISTS
  },
  {
    label: 'Upload Network List'
  }
]

function NetworkListUpoadPage (props) {
  // const dispatch = useDispatch()

  const initialPageContext = React.useMemo(() => ({
    companiesToNotify: [],
    scheduleOptions: {},
    newList: {}
  }), [])

  const [pageContext, setPageContext] = React.useState(initialPageContext)

  const { location } = useRouter()
  const { step } = location.params

  //  below are handlers that are going to set new data
  // for upload network list page (all steps), which finally will be sent to backend
  const handleAddCompaniesToNotify = React.useCallback(payload =>
    setPageContext({
      ...pageContext,
      companiesToNotify: payload
    })
  , [pageContext])

  const handleSetSchedule = React.useCallback(payload =>
    setPageContext({
      ...pageContext,
      scheduleOptions: payload
    })
  , [pageContext])

  const handleSetNewListInPageContext = React.useCallback(payload =>
    setPageContext({
      ...pageContext,
      newList: payload
    })
  , [pageContext])

  const getNewNetworkList = React.useCallback(() => pageContext.newList, [pageContext])

  const pageContextValues = React.useMemo(() => ({
    handleAddCompaniesToNotify,
    handleSetSchedule,
    handleSetNewListInPageContext,
    getNewNetworkList
  }), [
    handleAddCompaniesToNotify,
    handleSetSchedule,
    handleSetNewListInPageContext,
    getNewNetworkList
  ])

  return (
    <>
      <Toolbar>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Toolbar>

      <Container fullWidth>
        <Box>
          <SectionHead
            title='Network list'
            subtitle='Update network list'
            description='Create and schedule a network list update'
          />

          <UploadNetworkListContext.Provider value={pageContextValues}>
            <StepWrapper step={step} />
          </UploadNetworkListContext.Provider>

        </Box>
      </Container>
    </>
  )
}

export default NetworkListUpoadPage
