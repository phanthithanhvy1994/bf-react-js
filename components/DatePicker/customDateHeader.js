import React from 'react'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const CustomDateHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  increaseYear,
  decreaseYear
}) => {

  return (
    <div>
      {!prevYearButtonDisabled && 
      <button onClick={decreaseYear} type='button' className='react-datepicker__navigation react-datepicker__navigation--previous-year' aria-label='Previous Year'>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'></span>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'></span>
      </button>}
      {!prevMonthButtonDisabled &&
      <button onClick={decreaseMonth} type='button' className='react-datepicker__navigation react-datepicker__navigation--previous-month' aria-label='Previous Month'>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'></span>
      </button>}
      <div className='react-datepicker__current-month'>{months[date.getMonth()]} {date.getFullYear()}</div>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type='button' className='react-datepicker__navigation react-datepicker__navigation--next-month' aria-label='Next Month'>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'></span>
      </button>
      <button onClick={increaseYear} disabled={nextYearButtonDisabled} type='button' className='react-datepicker__navigation react-datepicker__navigation--next-year' aria-label='Next Year'>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'></span>
        <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'></span>
      </button>
    </div>
  )
}

export default CustomDateHeader