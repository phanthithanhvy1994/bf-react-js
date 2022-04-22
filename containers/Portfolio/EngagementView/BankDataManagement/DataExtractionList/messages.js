import { defineMessages } from 'react-intl'

export const scope = 'ScheduleTask'

export default defineMessages({
    createTask: {
        id: `${scope}.CreateTask`,
        defaultMessage: 'Create task'
    },
    cancelTask: {
        id: `${scope}.CancelTask`,
        defaultMessage: 'Cancel task'
    },
    scheduled: {
        id: `${scope}.Scheduled`,
        defaultMessage: 'Scheduled'
    },
    inProgress: {
        id: `${scope}.InProgress`,
        defaultMessage: 'In-progress'
    },
    completed: {
        id: `${scope}.Completed`,
        defaultMessage: 'Completed'
    },
    failed: {
        id: `${scope}.Failed`,
        defaultMessage: 'Failed'
    },
    cancelled: {
        id: `${scope}.Cancelled`,
        defaultMessage: 'Cancelled'
    },
})