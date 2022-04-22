const timeType = {
    hours: 'hours',
    minutes: 'minutes'
}

const timeConstraint = {
    hours: {
		min: 0,
		max: 23,
		step: 1
	},
	minutes: {
		min: 0,
		max: 59,
		step: 1
	}
}

const padValues = {
    hours: 2,
    minutes: 2
}

const timeCounterType = {
    increase: 'increase',
    decrease: 'decrease'
}

export {
    timeType,
    timeConstraint,
    padValues,
    timeCounterType
}