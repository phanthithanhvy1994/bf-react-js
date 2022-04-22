import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import { Container, Header, Button, Image, SingleTable } from 'src/components'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { showLoading, hideLoading, openErrorModal } from 'src/containers/Common/actions'
import { getCurrentEngagementByIdThunk } from 'src/containers/Portfolio/Redux'
import illustPortfolioView from 'src/assets/icons/svgs/illustportfolioview.svg'
import updatedSuccess from 'src/assets/icons/svgs/updated_success.svg'
import { REQUEST_MODEL } from 'src/config/constants'

import { getAllRoleEngagement } from './ManageTeamModal/ManageTeam/services'
import { getTeamMgmtListService } from './services'
import { teamMemberMessages, headerTable, columnsDetail } from './constants'
import ManageTeamModal from './ManageTeamModal'
import './styles.scss'

function TeamManagement() {
  const dispatch = useDispatch()
  const [listTeamMgmt, setListTeamMgmt] = useState([])
  const [isShowData, setIsShowData] = useState(false)
  const { engagementId, geoCode, containerCode } = useParams()
  const [isOpenManageTeam, setIsOpenManageTeam] = useState(false)
  const [roleOptions, setRoleOptions] = useState([])
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
  const model = REQUEST_MODEL
  model.uri = { engagementId, containerCode }
  model.geoCode = geoCode

  useEffect(() => {
    dispatch(getCurrentEngagementByIdThunk(model))
    getTeamMgmtList(model)
    getAllRole()
  }, [])

  const getAllRole = async () => {
    const roleResult = await getAllRoleEngagement(model)
    const roleData = _.get(roleResult, 'result.data')

    if (!_.isEmpty(roleData)) {
      setRoleOptions(roleData)
    }
  }

  const getTeamMgmtList = async (model) => {
    dispatch(showLoading())
    const { result } = await getTeamMgmtListService(model)
    if (result.statusCode === 200) {
      setListTeamMgmt(result?.data?.teamMemberInfos)
      setIsShowData(true)
    } else if (result.statusCode === 403) {
      dispatch(openErrorModal({ content: teamMemberMessages.errorByEngagementDeleted }))
    } else {
      dispatch(openErrorModal({ content: teamMemberMessages.unsuccessfullyGetTeamMgmtList }))
    }
    dispatch(hideLoading())
  }

  const renderRowData = (record) => {
    return columnsDetail(record)
  }

  const updateMemberSuccess = () => {
    getTeamMgmtList(model)
    setIsUpdateSuccess(true)
  }

  const renderListOfTeamMember = useMemo(() => {
    if (listTeamMgmt.length > 0) {
      return (
        <SingleTable
          headerTable={headerTable}
          listData={listTeamMgmt}
          renderRowData={renderRowData}
          classes='primary-table'
        />
      )
    } else {
      return (
        <>
          <Image src={illustPortfolioView} alt='illustPortfolioView' centered />
          <div className='div--centered'>{teamMemberMessages.emptyRecords}</div>
        </>
      )
    }
  }, [listTeamMgmt])

  const renderTeamManagement = () => {
    return (
      <>
        <div className='team-member'>
          <Container className='team-member__container'>
            <Grid columns='equal'>
              <Grid.Row className='team-member__row'>
                <Grid.Column>
                  <Header as='h1'>{teamMemberMessages.teamManagement}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className='team-member__row btn'>
                <Grid.Column>
                  <Button className='primary-btn btn--manage-team' onClick={() => setIsOpenManageTeam(true)}>
                    {teamMemberMessages.manageTeamBtn}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        <div className='list-of-team-member'>
          <Container className='list-of-team-member__container'>
            <Grid columns='equal'>
              <Grid.Column>
                {isShowData && renderListOfTeamMember}
                {isUpdateSuccess && <div className='message-success'><Image src={updatedSuccess} centered />{teamMemberMessages.updatedSuccess}</div>}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
    )
  }
  return (
    <>
      <EngagementViewNav />
      <div className='team-member-page detail'>
        <Container classes='detail__container'>
          <Grid columns='equal'>
            <Grid.Column>
              {renderTeamManagement()}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <ManageTeamModal
        isOpen={isOpenManageTeam}
        memberList={listTeamMgmt}
        roleOptions={roleOptions}
        onClose={() => setIsOpenManageTeam(false)}
        updateMemberSuccess={updateMemberSuccess}
      />
    </>
  )
}

export default TeamManagement
