import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generatePath } from 'react-router'
import { Grid } from 'semantic-ui-react'

import { Container } from 'src/components'
import { REQUEST_MODEL } from 'src/config/constants'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { getInfoMatchingThunk, infoDataMatchingSelector } from './Redux'
import { FormView, ProcessStatusView } from './View'
import { postStartMatchingProcess } from './services'
import { getCurrentEngagementByIdThunk, currentEngagementSelector } from 'src/containers/Portfolio/Redux'
import { openModal, closeModal, showLoading, hideLoading } from 'src/containers/Common/actions'
import { routes } from 'src/config'
import { engagementSettingsMessages } from 'src/containers/Setting/EngagementSettings/constants'
import './styles.scss'

const Matching = () => {
  const dispatch = useDispatch()
  const formViewRef = useRef()
  const currentEngagement = useSelector(currentEngagementSelector)
  const infoDataMatching = useSelector(infoDataMatchingSelector)
  const [isGroupNameData, setIsGroupNameDataStatus] = useState(false)
  const [isTransactionData, setIsTransactionDataStatus] = useState(false)
  const [engagementUserMatchingRes, setEngagementUserMatchingRes] = useState(null)
  const [isMatchingProcessing, setIsMatchingProcessing] = useState(false)
  const [isEnableMatching, setIsEnableMatching] = useState(true)
  const { engagementId, geoCode, containerCode } = useParams()
  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  useEffect(() => {
    dispatch(getCurrentEngagementByIdThunk(model))
    dispatch(getInfoMatchingThunk(model))
  }, [])

  useEffect(() => {
    if (!_.isEmpty(infoDataMatching) && !_.isEmpty(currentEngagement)) {
      const isEnableMatching = _.has(infoDataMatching, 'isEnableMatching') ? _.get(infoDataMatching, 'isEnableMatching') : _.get(currentEngagement, 'isEnableMatching')

      setIsEnableMatching(isEnableMatching)
    }
  }, [infoDataMatching, currentEngagement])

  useEffect(() => {
    const { matchingPrepareInfoRes, isMatchingProcessing, engagementUserMatchingRes } = infoDataMatching
    setIsGroupNameDataStatus(_.get(matchingPrepareInfoRes, 'isGroupNameDataSuccess', false))
    setIsTransactionDataStatus(_.get(matchingPrepareInfoRes, 'isTransactionalDataSuccess', false))
    setEngagementUserMatchingRes(engagementUserMatchingRes)
    setIsMatchingProcessing(isMatchingProcessing)
  }, [infoDataMatching])

  const handleRefreshView = async () => {
    dispatch(showLoading())
    await dispatch(getInfoMatchingThunk(model))
    dispatch(hideLoading())
  }

  const startMatchingProcess = async (data) => {
    dispatch(showLoading())
    const payload = { dateDifference: data }
    model.payload = payload
    const res = await postStartMatchingProcess(model)
    const statusCode = _.get(res, 'result.statusCode')

    if (statusCode === 200) {
      setEngagementUserMatchingRes(_.get(res.result.data, 'engagementUserMatchingRes', null))
      setIsMatchingProcessing(_.get(res.result.data, 'isMatchingProcessing', false))
    }

    if (statusCode === 405) {
      setIsEnableMatching(false)
    }

    dispatch(hideLoading())
  }

  const restartMatching = () => {
    formViewRef?.current?.startMatchingProcess()
  }

  const showWarningPopup = () => {
    dispatch(openModal({
      className: 'off-matching-warning-modal',
      header: {
        content: engagementSettingsMessages.offMatchingHeaderWarning
      },
      body: {
        content: engagementSettingsMessages.offMatchingContentWarning
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: engagementSettingsMessages.close,
          onClick: () => {
            window.location.href = generatePath(routes.portfolio.engagementView.GroupNameDataAuthorization, {
              geoCode,
              containerCode,
              engagementId
            })
            dispatch(closeModal())
          }
        }]
      }
    }))
  }

  return (
    <>
      {!isEnableMatching ? showWarningPopup() : !_.isEmpty(infoDataMatching) &&
        (
          <>
            <EngagementViewNav />
            <div className='matching-page detail'>
              <Container className='detail__container'>
                <Grid columns='equal'>
                  <Grid.Column>
                    <div className='matching'>
                      <Container className='main__container'>
                        <FormView
                          ref={formViewRef}
                          isGroupNameDataStatus={isGroupNameData}
                          isTransactionDataStatus={isTransactionData}
                          onRefreshView={handleRefreshView}
                          restartMatchingProcess={restartMatching}
                          startMatchingProcess={startMatchingProcess}
                          isMatchingProcessing={isMatchingProcessing}
                        />
                        {isGroupNameData && isTransactionData &&
                          <ProcessStatusView
                            engagementUserMatchingRes={engagementUserMatchingRes}
                            onRefreshView={handleRefreshView}
                            restartMatchingProcess={restartMatching}
                          />
                        }
                      </Container>
                    </div>
                  </Grid.Column>
                </Grid>
              </Container>
            </div>
          </>
        )
      }
    </>
  )
}

export default Matching