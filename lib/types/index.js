'use strict'

import options from './options'

export default class {
    static availableTypeOptions = {
        isUndefined: [],
        isNull: [],
        isBoolean: [],
        isNumber: [ `isFloat`, `isInt`, `isNumeric`, `length`, `max`, `maxLength`, `min`, `minLength`, `values` ],
        isBigInt: [ `length`, `max`, `maxLength`, `min`, `minLength`, `values` ],
        isString: [ `isDate`, `isDomain`, `isFloat`, `isHTTPSUrl`, `isHTTPUrl`, `isInt`, `isIP`, `isIPv4`, `isIPv6`, `isNumeric`, `isUrl`, `isWSSUrl`, `isWSUrl`, `length`, `maxLength`, `minLength`, `values` ],
        isArray: [ `length`, `maxLength`, `minLength` ],
        isObject: [],
        isFunction: [],
        isAsyncFunction: [],
        isPromise: [],
        isSymbol: [],
        isArrayBuffer: [],
        isSet: [],
        isMap: [],
        isDate: [],
        isRegExp: [],
        isDataView: [],
        isInt8Array: [],
        isInt16Array: [],
        isInt32Array: [],
        isUint8Array: [],
        isUint16Array: [],
        isUint32Array: [],
        isFloat32Array: [],
        isFloat64Array: [],
        isUint8ClampedArray: [],
        isSharedArrayBuffer: [],
    }

    static default = (requiredFieldValueType, opt) => {
        let fieldValue = opt[0]
        let fieldOptions = Object.prototype.toString.call(opt[1]) === `[object Object]` ? opt[1] : {}
        let detail = Object.prototype.toString.call(opt[2]) === `[object Boolean]` ? opt[2] : false
        let fieldPath = Object.prototype.toString.call(opt[3]) === `[object String]` ? opt[3] : ``

        return this.check(requiredFieldValueType, this.availableTypeOptions[`is${requiredFieldValueType}`], fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            let result = ``
            if (requiredFieldValueType !== fieldValueType) {
                result = `Field '${fieldPath}' can be '${requiredFieldValueType}'. '${fieldValueType}' given.`
            }
            return result
        })
    }

    /**
     * Checks the type and options of a field value
     * @param {string} requiredFieldValueType - The required type of the field value
     * @param {string[]} availableTypeOptions - The available options for the field type
     * @param {string} fieldPath - The path of the field in the object
     * @param {*} fieldValue - The value of the field
     * @param {object} fieldOptions - The options for the field
     * @param {boolean} detail - Whether to return detailed error messages or boolean values
     * @param {function} func - A custom function to validate the field type
     * @returns {(string[]|boolean)} An array of error messages or a boolean value indicating validity
     */
    static check = (
        requiredFieldValueType,
        availableTypeOptions,
        fieldPath,
        fieldValue,
        fieldOptions,
        detail,
        func
    ) => {
        // Get the field value type
        const fieldValueType = Object.prototype.toString.call(fieldValue).slice(8, -1)

        // If the field value type does not match the required type, return an error or false
        let error = func(requiredFieldValueType, fieldPath, fieldValue, fieldValueType)
        if (error.length) return detail ? error : false

        // Create an array to store all errors
        const allErrors = []

        // Iterate over all field options
        for (const [fieldOptionName, fieldOptionValue] of Object.entries(fieldOptions)) {
            // If the field option is not in the available options for the field type, add an error or return false
            if (!availableTypeOptions.includes(fieldOptionName)) {
                if (detail) {
                    allErrors.push(`Field '${fieldPath}' contains incorrect option '${fieldOptionName}'.`)
                    continue
                }
                return false
            }

            // Check the field value against the option using the options module
            error = options.check(fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue)
            // If there is an error, add it to the array or return false
            if (error.length) {
                if (detail) {
                    allErrors.push(error)
                    continue
                }
                return false
            }
        }

        // Return the array of errors or true depending on the detail parameter
        return detail ? allErrors : true
    }
}