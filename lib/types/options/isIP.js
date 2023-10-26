'use strict'

import net from 'net'

export default class {
    static availableValueTypes = [ `Boolean` ]

    /**
     * @param {string} fieldPath - The path of the field in the data object
     * @param {number} fieldValue - The value of the field
     * @param {string} fieldValueType - The type of the field value
     * @param {number} fieldOptionValue - The option value to compare with
     * @param {string} fieldOptionValueType - The type of the option value
     * @returns {string} - The error message or an empty string if no error
     */
    static fn = (fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType) => {
        let result = ``

        if (net.isIP(fieldValue) !== fieldOptionValue) {
            result = `Field '${fieldPath}' must be${!fieldOptionValue ? ` not` : ``} IP. '${fieldValue.toString()}' given.`
        }
        return result
    }
}