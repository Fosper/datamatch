'use strict'

import types from './index'

/**
 * This function checks if the value of a field is numeric.
 * @param {any} fieldValue - The value of the field to check.
 * @param {Object} [fieldOptions={}] - Options for the field.
 * @param {boolean} [detail=false] - Whether to return detailed information.
 * @param {string} [fieldPath=``] - The path of the field.
 * @returns {boolean} - Whether the value of the field is null.
 */
export default (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) => {
    const availableTypeOptions = []
    return types.check(`Float`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            let result = `Field '${fieldPath}' is not '${requiredFieldValueType}'.`
            switch (fieldValueType) {
                case `Number`:
                case `String`:
                    const decimalAndCommaChars = [ `.`, `,` ]
                    if (fieldValueType !== `String`) fieldValue = fieldValue.toString()
                    if (fieldValue.length >= 3) {
                        if (decimalAndCommaChars.includes(fieldValue.slice(1, 2))) result = ``
                    }
                    break
                default:
                    break
            }
            return result
        }
    )
}