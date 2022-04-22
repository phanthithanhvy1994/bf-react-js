import { DATE, TIME } from 'src/config/constants'
import GC from '@grapecity/spread-sheets'

/**
 * @param {String} locale locale name (ex: en-US)
 */
export const getLocale = () => {
  return window.localize.getLocale()
}

export const getSpreadJsCultureInfo = (cultureInfo = null) => {
  const userCultureInfo = cultureInfo || window.localize.getCultureInfo()
  if (!userCultureInfo) {
    return null
  }

  const locale = userCultureInfo.locale
  const spreadJsCultureInfo = new GC.Spread.Common.CultureInfo()

  spreadJsCultureInfo.name = function () {
    return locale
  }

  spreadJsCultureInfo.locale = locale

  if (!userCultureInfo.numberFormat || !userCultureInfo.dateTimeFormat) return spreadJsCultureInfo

  spreadJsCultureInfo.NumberFormat.currencySymbol = userCultureInfo.numberFormat.currencySymbol
  spreadJsCultureInfo.NumberFormat.numberDecimalSeparator = userCultureInfo.numberFormat.numberDecimalSeparator
  spreadJsCultureInfo.NumberFormat.numberGroupSeparator = userCultureInfo.numberFormat.numberGroupSeparator
  spreadJsCultureInfo.NumberFormat.arrayGroupSeparator = userCultureInfo.numberFormat.arrayGroupSeparator
  spreadJsCultureInfo.NumberFormat.arrayListSeparator = userCultureInfo.numberFormat.arrayListSeparator
  spreadJsCultureInfo.NumberFormat.listSeparator = userCultureInfo.numberFormat.listSeparator
  spreadJsCultureInfo.NumberFormat.numberGroupSizes = userCultureInfo.numberFormat.numberGroupSizes
  spreadJsCultureInfo.DateTimeFormat.amDesignator = userCultureInfo.dateTimeFormat.amDesignator ? userCultureInfo.dateTimeFormat.amDesignator : 'am'
  spreadJsCultureInfo.DateTimeFormat.pmDesignator = userCultureInfo.dateTimeFormat.pmDesignator ? userCultureInfo.dateTimeFormat.pmDesignator : 'pm'
  spreadJsCultureInfo.DateTimeFormat.abbreviatedMonthNames = userCultureInfo.dateTimeFormat.abbreviatedMonthNames
  spreadJsCultureInfo.DateTimeFormat.abbreviatedDayNames = userCultureInfo.dateTimeFormat.abbreviatedDayNames
  spreadJsCultureInfo.DateTimeFormat.abbreviatedMonthGenitiveNames = userCultureInfo.dateTimeFormat.abbreviatedMonthGenitiveNames
  spreadJsCultureInfo.DateTimeFormat.dayNames = userCultureInfo.dateTimeFormat.dayNames
  spreadJsCultureInfo.DateTimeFormat.monthDayPattern = userCultureInfo.dateTimeFormat.monthDayPattern
  spreadJsCultureInfo.DateTimeFormat.monthNames = userCultureInfo.dateTimeFormat.monthNames
  spreadJsCultureInfo.DateTimeFormat.monthGenitiveNames = userCultureInfo.dateTimeFormat.monthGenitiveNames
  spreadJsCultureInfo.DateTimeFormat.shortDatePattern = userCultureInfo.dateTimeFormat.shortDatePattern
  spreadJsCultureInfo.DateTimeFormat.shortTimePattern = userCultureInfo.dateTimeFormat.shortTimePattern
  spreadJsCultureInfo.DateTimeFormat.longDatePattern = userCultureInfo.dateTimeFormat.longDatePattern
  spreadJsCultureInfo.DateTimeFormat.longTimePattern = userCultureInfo.dateTimeFormat.longTimePattern
  spreadJsCultureInfo.DateTimeFormat.fullDateTimePattern = userCultureInfo.dateTimeFormat.fullDateTimePattern
  spreadJsCultureInfo.DateTimeFormat.yearMonthPattern = userCultureInfo.dateTimeFormat.yearMonthPattern
  spreadJsCultureInfo.DateTimeFormat.dateSeparator = userCultureInfo.dateTimeFormat.dateSeparator
  spreadJsCultureInfo.DateTimeFormat.calendarIsReadOnly = userCultureInfo.dateTimeFormat.calendarIsReadOnly

  return spreadJsCultureInfo
}

export const registerCurrentCulture = (cultureInfo) => {
  if (!cultureInfo) {
    return
  }
  addCultureInfo(cultureInfo)

  GC.Spread.Common.CultureManager.culture(cultureInfo.locale)
}

export const addCultureInfo = (cultureInfo) => {
  const spreadJsCultureInfo = getSpreadJsCultureInfo(cultureInfo)
  if (!spreadJsCultureInfo) {
    return
  }

  // It will overwrite the old language if existed.
  GC.Spread.Common.CultureManager.addCultureInfo(spreadJsCultureInfo.locale, spreadJsCultureInfo)
}

export const NumberNegativePattern = {
  // Negative is represented by enclosing parentheses ex: (1500) corresponds to -1500
  parenthesis: 0,
  // Negative is represented by leading "-"
  sign: 1
}

const getNumberDigitsLength = (number) => {
  // Handle exponent - Ex: 2.345E-6
  let match = ('' + number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  let digit = Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0)
    // Adjust for scientific notation.
    - (match[2] ? +match[2] : 0));

  return digit;
}

const getFormatNegativePattern = (formatNumberPattern, options) => {
  switch (options.negativePattern) {
    case NumberNegativePattern.parenthesis:
      return `${formatNumberPattern};(${formatNumberPattern})`
    case NumberNegativePattern.sign:
      return formatNumberPattern
    default:
      return formatNumberPattern
  }
}

const getFormatNumberPattern = (options, digitsLength) => {
  let formatNumberPattern = '###,###0'

  let formattedNumberDigitsLength = digitsLength
  if (digitsLength < options.minimumFractionDigits) formattedNumberDigitsLength = options.minimumFractionDigits
  if (digitsLength > options.maximumFractionDigits) formattedNumberDigitsLength = options.maximumFractionDigits

  if (formattedNumberDigitsLength > 0) formatNumberPattern += '.'

  for (let i = 0; i < formattedNumberDigitsLength; i++) {
    formatNumberPattern += '0'
  }

  return getFormatNegativePattern(formatNumberPattern, options)
}

const getFormatDateTimePattern = (options, locale = null) => {
  //For default time
  if(options === TIME.DEFAULT_TIME) {
    return window.localize.getDefaultShortTimePattern()
  }

  // For specific locale
  if (locale) {
    const specificCultureInfo = GC.Spread.Common.CultureManager.getCultureInfo(locale)
    if (specificCultureInfo) {
      switch (options) {
        case DATE.SHORT:
        case DATE.NO_LOCAL_TIME:
          return specificCultureInfo.DateTimeFormat.shortDatePattern
        case DATE.FULL:
        case DATE.LONG:
          return specificCultureInfo.DateTimeFormat.longDatePattern
        case TIME.TIME_NO_SECONDS:
          return specificCultureInfo.DateTimeFormat.shortTimePattern
        default: return specificCultureInfo.DateTimeFormat.shortDatePattern
      }
    }
  }

  // For current locale
  switch (options) {
    case DATE.SHORT:
      return window.localize.getShortDatePattern()
    case DATE.FULL:
    case DATE.LONG:
      return window.localize.getLongDatePattern()
    case TIME.TIME_NO_SECONDS:
      return window.localize.getShortTimePattern()
    default: return window.localize.getShortDatePattern()
  }
}

/**
  * Formats the number as a string with a formatted number.
  * @param {Number} number The number need format.
  * @param {Object} options The object with formatted data.
  * @param {Number} [options.minimumFractionDigits] - The minimum fraction digits.
  * @param {Number} [options.maximumFractionDigits] - The maximum fraction digits.
  * @param {Number} [options.negativePattern] - The negative pattern values from NumberNegativePattern ex: spreadJSLocaleHelper.NumberNegativePattern.parenthesis, spreadJSLocaleHelper.NumberNegativePattern.sign
  * @returns {string} The formatted string.
*/
export const formatNumberByLocaleSpreadJs = (number, options, locale = null) => {
  const currentLocale = getLocale()
  const digitsLength = getNumberDigitsLength(number)
  const formatNumberPattern = getFormatNumberPattern(options, digitsLength)
  const spreadJsFormatter = new GC.Spread.Formatter.GeneralFormatter(formatNumberPattern, locale || currentLocale)
  let formattedNumber = spreadJsFormatter.format(number)

  return formattedNumber
}

/**
 * Format DateTime by locale
 * @param {Date} date The date time need to format
 * @param {DATE} options DateTime pattern ex: DATE.SHORT
 * @param {string} locale Default it will format by current locale, if you want format by specific locale pass value here
 * @returns {string} The formatted date string.
 */
export const formatDateByLocaleSpreadJs = (date, options = DATE.SHORT, locale = null) => {
  const currentLocale = getLocale()
  locale = locale || currentLocale
  const dateTimeFormatPattern = getFormatDateTimePattern(options, locale)
  const spreadJsFormatter = new GC.Spread.Formatter.GeneralFormatter(dateTimeFormatPattern, locale)
  let formattedDateTime = spreadJsFormatter.format(date)

  return formattedDateTime
}

/**
 * Unformat DateTime string by locale
 * @param {Date} date The date time need to format
 * @param {DATE} options DateTime pattern ex: DATE.SHORT
 * @param {string} locale Default it will format by current locale, if you want format by specific locale pass value here
 * @returns {Date} Date unformatted.
 */
export const unFormatDateStringSpreadJs = (dateFormatted, options = DATE.SHORT, locale = null) => {
  const currentLocale = getLocale()
  locale = locale || currentLocale
  const dateTimeFormatPattern = getFormatDateTimePattern(options, locale)
  const spreadJsFormatter = new GC.Spread.Formatter.GeneralFormatter(dateTimeFormatPattern, locale)
  let unformattedDate = spreadJsFormatter.parse(dateFormatted)

  return unformattedDate
}
