'use strict'

import types from './lib/types'

export default class {
    // Static primitives:
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

    static init = () => { return new this() }

    constructor() {
        this.fields = []
        this.errors = []
        this.currentPath = ``
    }

    field = (fieldName, checkNextObjectIfExist = false) => {
        if (!this.fields.length) {
            this.currentPath = fieldName
        } else if (this.fields.at(-1).rules.length && !this.fields.at(-1).checkNextObjectIfExist) {
            if (this.currentPath.includes(`.`)) {
                let path = this.currentPath.split(`.`)
                path.pop()
                this.currentPath = `${path.join(`.`)}.${fieldName}`
            } else {
                this.currentPath = fieldName
            }
        } else {
            this.fields.at(-1).isObject = true
            if (this.currentPath.length) {
                this.currentPath = `${this.currentPath}.${fieldName}`
            } else {
                this.currentPath = fieldName
            }
        }

        this.fields.push({ path: this.currentPath, rules: [], isObject: false, checkNextObjectIfExist, currentType: `` })
        if (checkNextObjectIfExist) this.isObject()
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
        if (this.fields.at(-1).path.includes(`.`)) {
            let path = this.fields.at(-1).path.split(`.`)
            path.pop()
            this.currentPath = path.join(`.`)
        } else {
            this.currentPath = ``
        }
        return this
    }

    check = (obj) => {
        let result = { data: true, errors: null }
        for (const field of this.fields) this.validateField(field, obj)
        if (this.errors.length) {
            result.data = false
            result.errors = [ ...this.errors ]
        }
        this.reset()
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
        return this
    }

    validateField = (field, obj) => {
        const fieldValue = this.getValueByPath(obj, field.path)
        field.currentType = Object.prototype.toString.call(fieldValue).split(` `)[1].replace(`]`, ``)

        const allErrors = []
        let noErrors = false

        let errors = []
        if (field.isObject && !field.checkNextObjectIfExist) errors = this.checkType(`Object`, fieldValue, {}, field.path)
        if (errors.length) {
            if (Array.isArray(errors)) {
                allErrors.push(...errors)
            } else {
                allErrors.push(errors)
            }
        }
        
        let check = true
        const parentField = this.getParentField(field.path)
        if (parentField && parentField.checkNextObjectIfExist && parentField.currentPath !== `Object`) {
            check = false
        }

        if (check) {
            for (const [ruleName, fieldOptions] of field.rules) {
                errors = this.checkType(ruleName, fieldValue, fieldOptions, field.path)
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
        }

        if (!noErrors && allErrors.length > 0) this.errors.push(...allErrors)
    }

    getParentField = (path) => {
        let result = null

        if (!path.includes(`.`)) return result
        path = path.slice(0, path.lastIndexOf(`.`))
        for (const field of this.fields) {
            if (field.path === path) return field
        }

        return result
    }

    getValueByPath = (obj, path) => {
        return path.split(`.`).reduce((o, key) => (o && o[key] !== `undefined` ? o[key] : undefined), obj)
    }

    checkType = (ruleName, fieldValue, fieldOptions, fieldPath) => {
        return this.constructor[`is${ruleName}`](fieldValue, fieldOptions, true, fieldPath)
    }

    // Primitives:
    isUndefined = (opt = {}) => { return this.addRule(`Undefined`, opt) }
    isNull = (opt = {}) => { return this.addRule(`Null`, opt) }
    isBoolean = (opt = {}) => { return this.addRule(`Boolean`, opt) }
    isNumber = (opt = {}) => { return this.addRule(`Number`, opt) }
    isBigInt = (opt = {}) => { return this.addRule(`BigInt`, opt) }
    isString = (opt = {}) => { return this.addRule(`String`, opt) }
    isArray = (opt = {}) => { return this.addRule(`Array`, opt) }
    isObject = (opt = {}) => { return this.addRule(`Object`, opt) }
    isFunction = (opt = {}) => { return this.addRule(`Function`, opt) }
    isAsyncFunction = (opt = {}) => { return this.addRule(`AsyncFunction`, opt) }
    isPromise = (opt = {}) => { return this.addRule(`Promise`, opt) }
    isSymbol = (opt = {}) => { return this.addRule(`Symbol`, opt) }
    isArrayBuffer = (opt = {}) => { return this.addRule(`ArrayBuffer`, opt) }
    isSet = (opt = {}) => { return this.addRule(`Set`, opt) }
    isMap = (opt = {}) => { return this.addRule(`Map`, opt) }
    isDate = (opt = {}) => { return this.addRule(`Date`, opt) }
    isRegExp = (opt = {}) => { return this.addRule(`RegExp`, opt) }
    isDataView = (opt = {}) => { return this.addRule(`DataView`, opt) }
    isInt8Array = (opt = {}) => { return this.addRule(`Int8Array`, opt) }
    isInt16Array = (opt = {}) => { return this.addRule(`Int16Array`, opt) }
    isInt32Array = (opt = {}) => { return this.addRule(`Int32Array`, opt) }
    isUint8Array = (opt = {}) => { return this.addRule(`Uint8Array`, opt) }
    isUint16Array = (opt = {}) => { return this.addRule(`Uint16Array`, opt) }
    isUint32Array = (opt = {}) => { return this.addRule(`Uint32Array`, opt) }
    isFloat32Array = (opt = {}) => { return this.addRule(`Float32Array`, opt) }
    isFloat64Array = (opt = {}) => { return this.addRule(`Float64Array`, opt) }
    isUint8ClampedArray = (opt = {}) => { return this.addRule(`Uint8ClampedArray`, opt) }
    isSharedArrayBuffer = (opt = {}) => { return this.addRule(`SharedArrayBuffer`, opt) }

    // Options:
    isDate = () => { return this.fields.at(-1).rules.at(-1)[1]['isDate'] = true, this }
    isDomain = () => { return this.fields.at(-1).rules.at(-1)[1]['isDomain'] = true, this }
    isFloat = () => { return this.fields.at(-1).rules.at(-1)[1]['isFloat'] = true, this }
    isHTTPSUrl = () => { return this.fields.at(-1).rules.at(-1)[1]['isHTTPSUrl'] = true, this }
    isHTTPUrl = () => { return this.fields.at(-1).rules.at(-1)[1]['isHTTPUrl'] = true, this }
    isInt = () => { return this.fields.at(-1).rules.at(-1)[1]['isInt'] = true, this }
    isIP = () => { return this.fields.at(-1).rules.at(-1)[1]['isIP'] = true, this }
    isIPv4 = () => { return this.fields.at(-1).rules.at(-1)[1]['isIPv4'] = true, this }
    isIPv6 = () => { return this.fields.at(-1).rules.at(-1)[1]['isIPv6'] = true, this }
    isNumeric = () => { return this.fields.at(-1).rules.at(-1)[1]['isNumeric'] = true, this }
    isUrl = () => { return this.fields.at(-1).rules.at(-1)[1]['isUrl'] = true, this }
    isWSSUrl = () => { return this.fields.at(-1).rules.at(-1)[1]['isWSSUrl'] = true, this }
    isWSUrl = () => { return this.fields.at(-1).rules.at(-1)[1]['isWSUrl'] = true, this }
    length = () => { return this.fields.at(-1).rules.at(-1)[1]['length'] = number, this }
    max = () => { return this.fields.at(-1).rules.at(-1)[1]['max'] = number, this }
    maxLength = () => { return this.fields.at(-1).rules.at(-1)[1]['maxLength'] = number, this }
    min = () => { return this.fields.at(-1).rules.at(-1)[1]['min'] = number, this }
    minLength = () => { return this.fields.at(-1).rules.at(-1)[1]['minLength'] = number, this }
    values = () => { return this.fields.at(-1).rules.at(-1)[1]['values'] = array, this }
}