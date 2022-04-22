import React from 'react'
import { Modal } from 'src/components'
import ManageTeam from './ManageTeam'

const ManageTeamModal = (props) => {
  const { isOpen, onClose } = props

  return (
    <React.Fragment>
      <Modal
        size='small'
        open={isOpen}
        onClose={onClose}
      >
        <Modal.Content >
          <ManageTeam {...props} />
        </Modal.Content>
      </Modal>
    </React.Fragment >
  )
}

export default ManageTeamModal