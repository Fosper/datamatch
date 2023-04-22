'use strict'

import check from './index'

/**
 * This function checks if the value of a field is null.
 * @param {any} fieldValue - The value of the field to check.
 * @param {Object} [fieldOptions={}] - Options for the field.
 * @param {boolean} [detail=false] - Whether to return detailed information.
 * @param {string} [fieldPath=``] - The path of the field.
 * @returns {boolean} - Whether the value of the field is null.
 */
export default function (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) {
    const availableTypeOptions = [ `min` ]
    return check(`Number`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            if (requiredFieldValueType !== fieldValueType) return false
            return true
        }
    )
}