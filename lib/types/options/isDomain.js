'use strict'

import { URL } from 'url'

export default class {
    static availableValueTypes = [ `Boolean` ]

    /**
     * Checks if a field value is less than a given option value and returns an error message if not.
     * @param {string} fieldPath - The path of the field in the data object
     * @param {number} fieldValue - The value of the field
     * @param {string} fieldValueType - The type of the field value
     * @param {number} fieldOptionValue - The option value to compare with
     * @param {string} fieldOptionValueType - The type of the option value
     * @returns {string} - The error message or an empty string if no error
     */
    static fn = (fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType) => {
        let result = ``

        try {
            const url = new URL(`http://${fieldValue}`)
            if (url.hostname !== domain || domain.split(`.`).length < 2) {
                result = `Field '${fieldPath}' must be${!fieldOptionValue ? ` not` : ``} domain. '${fieldValue.toString()}' given.`
                return result
            }
            return result
        } catch (error) {
            result = `Field '${fieldPath}' must be${!fieldOptionValue ? ` not` : ``} domain. '${fieldValue.toString()}' given.`
            return false
        }
    }
}