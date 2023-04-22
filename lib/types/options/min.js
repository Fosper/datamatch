'use strict'

export default class {
    static availableValueTypes = [ `Number` ]

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
        if (fieldValue < fieldOptionValue) {
            result = `Field '${fieldPath}' must be less than '${fieldOptionValue}'. '${fieldValue}' given.`
        }

        return result
    }
}

/*
    [object String] = String
    [object Object] = Object
    [object Number] = Number
    [object Boolean] = Boolean
    [object Array] = Array
    [object Function] = Function
    [object Date] = Date
    [object RegExp] = RegExp
    [object Null] = null
    [object Undefined] = undefined
    [object Map] = Map
    [object Set] = Set
    [object Promise] = Promise
    [object Symbol] = Symbol
    [object ArrayBuffer] = ArrayBuffer
    [object DataView] = DataView
    [object Int8Array] = Int8Array
    [object Uint8Array] = Uint8Array
    [object Uint8ClampedArray] = Uint8ClampedArray
    [object Int16Array] = Int16Array
    [object Uint16Array] = Uint16Array
    [object Int32Array] = Int32Array
    [object Uint32Array] = Uint32Array
    [object Float32Array] = Float32Array
    [object Float64Array] = Float64Array
    [object SharedArrayBuffer] = SharedArrayBuffer
    [object BigInt] = BigInt
*/