import { DATE, NUMBER } from 'src/config/constants'
import * as spreadJSLocaleHelper from 'src/components/spreadJs/spreadJSLocaleHelper'

var self = module.exports = {
  defaultLocale: 'en-CA',
  defaultLanguage: 'en-US',
  defaultShortDatePattern: 'yyyy-MM-DD',
  defaultLongDatePattern: 'MMMM DD, yyyy',
  defaultLongTimePattern: 'HH:mm:ss',
  defaultShortTimePattern: 'HH:mm',
  defaultDateShortTimePattern: 'MMMM D YYYY, HH:MM',
  defaultDateLongTimePattern: 'MMMM D YYYY, HH:MM:SS',

  getBrowserLocale: function () {
    let userLang = window.navigator.language || window.navigator.userLanguage
    return userLang
  },

  getBrowserLanguage: function () {
    return window.navigator.language || window.navigator.userLanguage
  },

  getCultureInfo: function () {
    const cultureInfo = localStorage.getItem('cultureInfo')
    return cultureInfo && JSON.parse(cultureInfo)
  },

  setCultureInfo: function (cultureInfo) {
    localStorage.setItem('cultureInfo', JSON.stringify(cultureInfo))
    spreadJSLocaleHelper.registerCurrentCulture(cultureInfo)
  },

  addCultureInfo: function (cultureInfo) {
    if (cultureInfo) {
      spreadJSLocaleHelper.addCultureInfo(cultureInfo)
    }
  },

  getShortDatePattern: () => {
    const cultureInfo = self.getCultureInfo()
    return (
      cultureInfo && cultureInfo.dateTimeFormat && cultureInfo.dateTimeFormat.shortDatePattern ||
      self.defaultShortDatePattern
    )
  },

  getLongDatePattern: () => {
    const cultureInfo = self.getCultureInfo()
    return (
      cultureInfo && cultureInfo.dateTimeFormat && cultureInfo.dateTimeFormat.longDatePattern ||
      self.defaultLongDatePattern
    )
  },

  getShortTimePattern: () => {
    const cultureInfo = self.getCultureInfo()
    return (
      cultureInfo && cultureInfo.dateTimeFormat && cultureInfo.dateTimeFormat.shortTimePattern ||
      self.defaultShortTimePattern
    )
  },

  getDefaultShortTimePattern: () => {
    return self.defaultShortTimePattern
  },

  formatInputDate: (value, locale = null, options = DATE.SHORT) => {
    let localeDate
    let timestamp = Date.parse(value)
    if (!isNaN(timestamp)) {
      localeDate = new Date(timestamp)
    } else {
      localeDate = new Date(value)
    }

    return spreadJSLocaleHelper.formatDateByLocaleSpreadJs(localeDate, options, locale)
  },

  unFormatInputDate: (formattedStr, options = DATE.SHORT, locale = null) => {
    if (!formattedStr) return formattedStr
    return spreadJSLocaleHelper.unFormatDateStringSpreadJs(formattedStr, options, locale)
  },

  // Convert and Format Unix timestamp (Date) to locale format, browser time zone
  toLocalDate: (timestamp, options = DATE.SHORT) => {
    const localDate = self.getLocalDate(timestamp, options);
    const locale = self.getLocale()
    return self.formatInputDate(localDate, locale, options)
  },

  toLocaleDate: (timestamp, options = DATE.SHORT) => {
    const localDate = new Date(timestamp)
    const locale = self.getLocale()
    return self.formatInputDate(localDate, locale, options)
  },

  getLocalDate: (date) => {
    if (Number.isInteger(date)) {
      // date is UnixTimeStamp
      return new Date(date)
    } else {
      // date is timestamp without time zone string
      date = date && typeof date === 'string' && date.includes('Z') ? date : date + 'Z'
      return new Date(date)
    }
  },

  getLocale: () => {
    return localStorage.getItem('locale') || self.getBrowserLocale() || self.defaultLocale
  },

  getLanguage: () => {
    return localStorage.getItem('language') || self.getBrowserLanguage() || self.defaultLanguage
  },

  // Convert locale date to yyyy-mm-ddT00:00:00.0000000Z
  // isDateTime = true: get full time yyyy-mm-ddThh:mm:ss.sss
  toFullUtcDateString: (date, isDateTime = false) => {
    const _date = new Date(date)
    let result = new Date(_date.getTime())
    if (!isDateTime) {
      const offset = _date.getTimezoneOffset()
      _date.setHours(0, 0, 0, 0)
      result = new Date(_date.getTime() - (offset * 60 * 1000))
      result = result.toISOString()
    } else {
      result = result.toISOString()
      result = result.substr(0, result.length - 1)
    }
    return result
  },

  /**
    * Format number to locale format
    * @param {Number} number The number need format.
    * @param {string} locale - The locale code.
    * @param {Object} options The object with formatted data.
    * @param {Object} extendOptions - The extend options for number formatting.
    * @param {Number} [extendOptions.negativePattern] - The negative pattern valid in [spreadJSLocaleHelper.NumberNegativePattern.parenthesis, spreadJSLocaleHelper.NumberNegativePattern.sign]
    * @returns {string} The formatted string.
  */
  toLocalNumberString: (number, locale = null, options = NUMBER.BASE, extendOptions = null) => {
    if (number == null || number == undefined) return ''

    const formatOptions = Object.assign({}, options, extendOptions)

    return spreadJSLocaleHelper.formatNumberByLocaleSpreadJs(new Number(number), formatOptions, locale)
  },

  // Get locale string Separator
  getSeparator: function (type) {
    const currentCultureInfo = self.getCultureInfo()
    if (!currentCultureInfo) return ''

    switch (type) {
      case 'group':
        return currentCultureInfo.numberFormat.numberGroupSeparator
      case 'decimal':
        return currentCultureInfo.numberFormat.numberDecimalSeparator
    }
  },

  unFormatNumber: function (value = '') {
    if (!value || typeof value === 'number') return value

    // Convert percent string to string number
    value = value.toString().replace(/%/g, '')

    // Convert formatted negative number to unformat negative number (e.g (1 234.56) to -1 234.56)
    let regExp = /\((.*?)\)/
    let matches = regExp.exec(value)
    if (matches && matches.length > 1) {
      value = '-' + matches[1]
    }
    const numberDecimalSeparator = self.getSeparator('decimal')
    const numberGroupSeparator = self.getSeparator('group')

    if (numberGroupSeparator.charCodeAt(0) === 8217) value = value.toString().replaceAll('’', '')
    if (numberGroupSeparator.charCodeAt(0) === 160 || numberGroupSeparator.charCodeAt(0) === 8239) value = value.toString().replaceAll(' ', '')

    return value.toString().replaceAll(numberGroupSeparator, '').replaceAll(numberDecimalSeparator, '.').replace('−', '-')
  },

  // Convert Exponential to Number (bug javascript number)
  // Input: 1e-6
  // Output: 0.000001
  parseExponentialToNumber: function (value) {
    let [number, exponenetial] = value && (value.toString().split('e-'))
    if (exponenetial) {
      return Number(value).toFixed(number.length - 2 + Number(exponenetial))
    }
    return value
  }
}