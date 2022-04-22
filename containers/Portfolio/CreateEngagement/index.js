import React from 'react'

import BeginModal from './BeginModal'
import EngagementInformation from './EngagementInformation'
import { steps } from '../constants'

const CreateEngagement = (props) => {
  const { currentStep, currentData, onBegin, onClose, onBack } = props

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case steps.stepOneEC:
        return <BeginModal currentData={currentData} onBegin={onBegin} onClose={onClose} />
      case steps.stepTwoEC:
        return <EngagementInformation currentData={currentData} onBack={onBack} onClose={onClose} />
      default:
        return null
    }
  }

  return renderStep(currentStep)
}

export default CreateEngagement