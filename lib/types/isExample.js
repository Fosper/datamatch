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
    return types.check(`Example`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            let result = `Field '${fieldPath}' is not '${requiredFieldValueType}'.`
            switch (fieldValueType) {
                case `BigInt`:
                    result = ``
                    break
                case `Number`:
                case `String`:
                    const numbersChars = [ `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` ]
                    const decimalAndCommaChars = [ `.`, `,` ]
                    if (fieldValueType !== `String`) fieldValue = fieldValue.toString()
                    let chars = fieldValue.split(``)
                    let i = 0
                    let incorrectFound = false
                    for (let char of chars) {
                        if (!i && char === `-`) continue
                        i++
                        if (!numbersChars.includes(char)) {
                            if (i === 2 && decimalAndCommaChars.includes(char)) continue
                            incorrectFound = true
                            break
                        }
                    }
                    if (!incorrectFound) result = ``
                    break
                default:
                    break
            }
            return result
        }
    )
}