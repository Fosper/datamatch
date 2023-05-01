'use strict'

export default class {
    static availableValueTypes = [ `Number`, `String` ]

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

        switch (fieldValueType) {
            case `Number`:
                if (fieldOptionValueType !== `Number`) {
                    result = `Field '${fieldPath}', 'isNumber' contains incorrect option 'max'. Value of 'max' must be type of 'Number'. '${fieldOptionValueType}' given.`
                }
                if (fieldValue > fieldOptionValue) {
                    result = `Field '${fieldPath}' must be more than '${fieldOptionValue.toString()}'. '${fieldValue.toString()}' given.`
                }
                break
            case `BigInt`:
                if (fieldOptionValueType !== `String`) {
                    result = `Field '${fieldPath}', 'isBigInt' contains incorrect option 'max'. Value of 'max' must be type of 'String' because this is 'BigInt'. '${fieldOptionValueType}' given.`
                }
                if (fieldValue > BigInt(fieldOptionValue)) {
                    result = `Field '${fieldPath}' must be more than '${fieldOptionValue.toString()}'. '${fieldValue.toString()}' given.`
                }
                break
            default:
                result = `Field '${fieldPath}' contains incorrect option 'max'.`
                break
        }

        return result
    }
}