'use strict'

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
        let result = `Field '${fieldPath}' must be numeric. '${fieldValue.toString()}' given.`

        switch (fieldValueType) {
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
}