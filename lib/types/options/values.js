'use strict'

export default class {
    static availableValueTypes = [ `Array` ]

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
        if (!fieldOptionValue.includes(fieldValue)) {
            result = `Field '${fieldPath}' can contain '${fieldOptionValue.join(`', '`)}'. '${fieldValue}' given.`
        }

        return result
    }
}