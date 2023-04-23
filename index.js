'use strict'

import types from './lib/types'
import isInteger from './lib/types/isInteger'
import isNumeric from './lib/types/isNumeric'

export default class {
    // Default static types:
    static isUndefined = (...opt) => types.default(`Undefined`, opt)
    static isNull = (...opt) => types.default(`Null`, opt)
    static isBoolean = (...opt) => types.default(`Boolean`, opt)
    static isNumber = (...opt) => types.default(`Number`, opt)
    static isBigInt = (...opt) => types.default(`BigInt`, opt)
    static isString = (...opt) => types.default(`String`, opt)
    static isArray = (...opt) => types.default(`Array`, opt)
    static isObject = (...opt) => types.default(`Object`, opt)
    static isFunction = (...opt) => types.default(`Function`, opt)
    static isAsyncFunction = (...opt) => types.default(`AsyncFunction`, opt)
    static isPromise = (...opt) => types.default(`Promise`, opt)
    static isSymbol = (...opt) => types.default(`Symbol`, opt)
    static isArrayBuffer = (...opt) => types.default(`ArrayBuffer`, opt)
    static isSet = (...opt) => types.default(`Set`, opt)
    static isMap = (...opt) => types.default(`Map`, opt)
    static isDate = (...opt) => types.default(`Date`, opt)
    static isRegExp = (...opt) => types.default(`RegExp`, opt)
    static isDataView = (...opt) => types.default(`DataView`, opt)
    static isInt8Array = (...opt) => types.default(`Int8Array`, opt)
    static isInt16Array = (...opt) => types.default(`Int16Array`, opt)
    static isInt32Array = (...opt) => types.default(`Int32Array`, opt)
    static isUint8Array = (...opt) => types.default(`Uint8Array`, opt)
    static isUint16Array = (...opt) => types.default(`Uint16Array`, opt)
    static isUint32Array = (...opt) => types.default(`Uint32Array`, opt)
    static isFloat32Array = (...opt) => types.default(`Float32Array`, opt)
    static isFloat64Array = (...opt) => types.default(`Float64Array`, opt)
    static isUint8ClampedArray = (...opt) => types.default(`Uint8ClampedArray`, opt)
    static isSharedArrayBuffer = (...opt) => types.default(`SharedArrayBuffer`, opt)

    // Custom static types:
    static isInteger = isInteger
    static isNumeric = isNumeric

    static init = () => { return new this() }

    constructor() {
        this.fields = []
        this.errors = []
        this.currentPath = ``
    }

    field = (fieldName) => {
        this.currentPath = this.currentPath === `` ? fieldName : `${this.currentPath}.${fieldName}`
        this.fields.push({ path: this.currentPath, rules: [] })
        return this
    }

    end = () => {
        const splitPath = this.fields.at(-1).path.split(`.`)
        splitPath.pop()
        const parentName = splitPath.join(`.`)
        const parentIndex = this.fields.findIndex(element => element.path === parentName)
        if (parentIndex !== -1) {
            const parentElement = this.fields.splice(parentIndex, 1)[0]
            this.fields.push(parentElement)
        }
        return this
    }

    check = (obj) => {
        let result = { data: true, errors: null }
        for (const field of this.fields) this.validateField(field, obj)
        if (this.errors.length) {
            result.data = false
            result.errors = [...this.errors]
        }
        return result
    }

    reset = () => {
        this.fields = []
        this.errors = []
        this.currentPath = ``
        return this
    }

    addRule = (ruleName, opt) => {
        this.fields.at(-1).rules.push([ruleName, opt])
    }

    resetCurrentPath = () => {
        this.currentPath = ``
        return this
    }

    validateField = (field, obj) => {
        const fieldValue = this.getValueByPath(obj, field.path)
        const allErrors = []
        let noErrors = false

        for (const [ruleName, fieldOptions] of field.rules) {
            let errors = this.checkType(ruleName, fieldValue, fieldOptions, field.path)
            if (errors.length) {
                if (Array.isArray(errors)) {
                    allErrors.push(...errors)
                    continue
                }
                allErrors.push(errors)
            } else {
                noErrors = true
            }
        }

        if (!noErrors && allErrors.length > 0) this.errors.push(...allErrors)
    }

    getValueByPath = (obj, path) => {
        return path.split(`.`).reduce((o, key) => (o && o[key] !== `undefined` ? o[key] : undefined), obj)
    }

    checkType = (ruleName, fieldValue, fieldOptions, fieldPath) => {
        return this.constructor[`is${ruleName}`](fieldValue, fieldOptions, true, fieldPath)
    }

    // Default types:
    isUndefined = (opt = {}) => { this.addRule(`Undefined`, opt); return this.resetCurrentPath() }
    isNull = (opt = {}) => { this.addRule(`Null`, opt); return this.resetCurrentPath() }
    isBoolean = (opt = {}) => { this.addRule(`Boolean`, opt); return this.resetCurrentPath() }
    isNumber = (opt = {}) => { this.addRule(`Number`, opt); return this.resetCurrentPath() }
    isBigInt = (opt = {}) => { this.addRule(`BigInt`, opt); return this.resetCurrentPath() }
    isString = (opt = {}) => { this.addRule(`String`, opt); return this.resetCurrentPath() }
    isArray = (opt = {}) => { this.addRule(`Array`, opt); return this.resetCurrentPath() }
    isObject = (opt = {}) => { this.addRule(`Object`, opt); return this.resetCurrentPath() }
    isFunction = (opt = {}) => { this.addRule(`Function`, opt); return this.resetCurrentPath() }
    isAsyncFunction = (opt = {}) => { this.addRule(`AsyncFunction`, opt); return this.resetCurrentPath() }
    isPromise = (opt = {}) => { this.addRule(`Promise`, opt); return this.resetCurrentPath() }
    isSymbol = (opt = {}) => { this.addRule(`Symbol`, opt); return this.resetCurrentPath() }
    isArrayBuffer = (opt = {}) => { this.addRule(`ArrayBuffer`, opt); return this.resetCurrentPath() }
    isSet = (opt = {}) => { this.addRule(`Set`, opt); return this.resetCurrentPath() }
    isMap = (opt = {}) => { this.addRule(`Map`, opt); return this.resetCurrentPath() }
    isDate = (opt = {}) => { this.addRule(`Date`, opt); return this.resetCurrentPath() }
    isRegExp = (opt = {}) => { this.addRule(`RegExp`, opt); return this.resetCurrentPath() }
    isDataView = (opt = {}) => { this.addRule(`DataView`, opt); return this.resetCurrentPath() }
    isInt8Array = (opt = {}) => { this.addRule(`Int8Array`, opt); return this.resetCurrentPath() }
    isInt16Array = (opt = {}) => { this.addRule(`Int16Array`, opt); return this.resetCurrentPath() }
    isInt32Array = (opt = {}) => { this.addRule(`Int32Array`, opt); return this.resetCurrentPath() }
    isUint8Array = (opt = {}) => { this.addRule(`Uint8Array`, opt); return this.resetCurrentPath() }
    isUint16Array = (opt = {}) => { this.addRule(`Uint16Array`, opt); return this.resetCurrentPath() }
    isUint32Array = (opt = {}) => { this.addRule(`Uint32Array`, opt); return this.resetCurrentPath() }
    isFloat32Array = (opt = {}) => { this.addRule(`Float32Array`, opt); return this.resetCurrentPath() }
    isFloat64Array = (opt = {}) => { this.addRule(`Float64Array`, opt); return this.resetCurrentPath() }
    isUint8ClampedArray = (opt = {}) => { this.addRule(`Uint8ClampedArray`, opt); return this.resetCurrentPath() }
    isSharedArrayBuffer = (opt = {}) => { this.addRule(`SharedArrayBuffer`, opt); return this.resetCurrentPath() }

    // Custom types:
    isInteger = (opt = {}) => { this.addRule(`Integer`, opt); return this.resetCurrentPath() }
    isNumeric = (opt = {}) => { this.addRule(`Numeric`, opt); return this.resetCurrentPath() }
}