'use strict'

import isDate from './isDate'
import isDomain from './isDomain'
import isFloat from './isFloat'
import isHTTPSUrl from './isHTTPSUrl'
import isHTTPUrl from './isHTTPUrl'
import isInt from './isInt'
import isIP from './isIP'
import isIPv4 from './isIPv4'
import isIPv6 from './isIPv6'
import isJSON from './isJSON'
import isNumeric from './isNumeric'
import isUrl from './isUrl'
import isWSSUrl from './isWSSUrl'
import isWSUrl from './isWSUrl'
import length from './length'
import max from './max'
import maxLength from './maxLength'
import min from './min'
import minLength from './minLength'
import values from './values'

export default class {
    static isDate = isDate
    static isDomain = isDomain
    static isFloat = isFloat
    static isHTTPSUrl = isHTTPSUrl
    static isHTTPUrl = isHTTPUrl
    static isInt = isInt
    static isIP = isIP
    static isIPv4 = isIPv4
    static isIPv6 = isIPv6
    static isJSON = isJSON
    static isNumeric = isNumeric
    static isUrl = isUrl
    static isWSSUrl = isWSSUrl
    static isWSUrl = isWSUrl
    static length = length
    static max = max
    static maxLength = maxLength
    static min = min
    static minLength = minLength
    static values = values

    static check = (optionName, optionValue, optionValueType, path, type, value, inArray = false) => {
        if (!this[optionName]) {
            return `Internal field error '${path}'. Unknown option '${optionName}'.`
        }

        return this[optionName](optionName, optionValue, optionValueType, path, type, value, inArray)
    }
}