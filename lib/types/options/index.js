"use strict"

import isDomain from './isDomain'
import isFloat from './isFloat'
import isHTTPSUrl from './isHTTPSUrl'
import isHTTPUrl from './isHTTPUrl'
import isInt from './isInt'
import isIP from './isIP'
import isIPv4 from './isIPv4'
import isIPv6 from './isIPv6'
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
    static isDomain = isDomain
    static isFloat = isFloat
    static isHTTPSUrl = isHTTPSUrl
    static isHTTPUrl = isHTTPUrl
    static isInt = isInt
    static isIP = isIP
    static isIPv4 = isIPv4
    static isIPv6 = isIPv6
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

    /**
     * Checks if the provided field meets the conditions specified by the field option.
     * @param {string} fieldPath - The path of the field.
     * @param {*} fieldValue - The value of the field.
     * @param {string} fieldValueType - The type of the field value.
     * @param {string} fieldOptionName - The name of the field option.
     * @param {*} fieldOptionValue - The value of the field option.
     * @returns {string} - A message indicating whether the field meets the conditions, or an error message.
     */
    static check = (fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue) => {
        // Get the field option value type
        const fieldOptionValueType = Object.prototype.toString.call(fieldOptionValue).slice(8, -1)
        
        // Get the available option value types for the specified field option name
        const availableOptionValueTypes = this[fieldOptionName].availableValueTypes

        // Check if the field option value type is in the list of available option value types
        if (!availableOptionValueTypes.includes(fieldOptionValueType)) {
            return `Field '${fieldPath}' option '${fieldOptionName}' value can be '${availableOptionValueTypes.join(`', '`)}'. '${fieldOptionValueType}' given.`
        }

        // Call the corresponding validation function for the field option and return the result
        return this[fieldOptionName].fn(fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType)
    }
}