'use strict'

export default class {
    static availableValueTypes = [ `Number` ]

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

        let fieldValueLength
        if (fieldValueType !== `Array`) {
            fieldValueLength = fieldValue.toString().length
        } else {
            fieldValueLength = fieldValue.length
        }

        if (fieldValueLength !== fieldOptionValue) {
            result = `Field '${fieldPath}' length must be '${fieldOptionValue}'. '${fieldValueLength.toString()}' given.`
        }

        return result
    }
}