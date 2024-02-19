'use strict'

import options from './options'

export default class {
    constructor() {
        this.currentPath = ``
        this.fields = []
        this.errors = null
    }

    static isUndefined = (...opt) => this.sysCheck(`Undefined`, opt)
    static isNull = (...opt) => this.sysCheck(`Null`, opt)
    static isBoolean = (...opt) => this.sysCheck(`Boolean`, opt)
    static isNumber = (...opt) => this.sysCheck(`Number`, opt)
    static isBigInt = (...opt) => this.sysCheck(`BigInt`, opt)
    static isString = (...opt) => this.sysCheck(`String`, opt)
    static isArray = (...opt) => this.sysCheck(`Array`, opt)
    static isObject = (...opt) => this.sysCheck(`Object`, opt)
    static isFunction = (...opt) => this.sysCheck(`Function`, opt)
    static isAsyncFunction = (...opt) => this.sysCheck(`AsyncFunction`, opt)
    static isPromise = (...opt) => this.sysCheck(`Promise`, opt)
    static isSymbol = (...opt) => this.sysCheck(`Symbol`, opt)
    static isArrayBuffer = (...opt) => this.sysCheck(`ArrayBuffer`, opt)
    static isSet = (...opt) => this.sysCheck(`Set`, opt)
    static isMap = (...opt) => this.sysCheck(`Map`, opt)
    static isDate = (...opt) => this.sysCheck(`Date`, opt)
    static isRegExp = (...opt) => this.sysCheck(`RegExp`, opt)
    static isDataView = (...opt) => this.sysCheck(`DataView`, opt)
    static isInt8Array = (...opt) => this.sysCheck(`Int8Array`, opt)
    static isInt16Array = (...opt) => this.sysCheck(`Int16Array`, opt)
    static isInt32Array = (...opt) => this.sysCheck(`Int32Array`, opt)
    static isUint8Array = (...opt) => this.sysCheck(`Uint8Array`, opt)
    static isUint16Array = (...opt) => this.sysCheck(`Uint16Array`, opt)
    static isUint32Array = (...opt) => this.sysCheck(`Uint32Array`, opt)
    static isFloat32Array = (...opt) => this.sysCheck(`Float32Array`, opt)
    static isFloat64Array = (...opt) => this.sysCheck(`Float64Array`, opt)
    static isUint8ClampedArray = (...opt) => this.sysCheck(`Uint8ClampedArray`, opt)
    static isSharedArrayBuffer = (...opt) => this.sysCheck(`SharedArrayBuffer`, opt)

    static init = () => { return new this() }

    field = (fieldName) => {
        if (!this.currentPath.includes(`.`)) {
            this.currentPath = `${fieldName}`
        } else {
            this.currentPath = `${this.currentPath.split(`.`).slice(0, -1).join(`.`)}.${fieldName}`
        }
        this.sysAddRule(`Any`)
        return this
    }

    end = () => {
        if (this.currentPath.at(-1) !== `.`) {
            if (!this.fields.at(-1).takeRule) {
                this.currentPath = this.currentPath.split(`.`).slice(0, -1).join(`.`)
            } else {
                this.fields.at(-1).takeRule = false
            }
        } else {
            this.currentPath = this.currentPath.split(`.`).slice(0, -1).join(`.`)
            this.sysAddRule(`Object`)
        }
        return this
    }

    check = (obj, strict = false) => {
        this.errors = []

        const objType = this.constructor.sysGetType(obj)
        if (objType !== `Object`) {
            this.errors.push(`Data must be type of 'Object'. '${objType}' given.`)
            return this
        }

        const arr = this.sysObjectToArray(obj)

        const canBeSkipped = []
        for (const field of this.fields) {
            if (field.rules[0].type === `Undefined` && !canBeSkipped.includes(field.path)) {
                canBeSkipped.push(field.path)
            }
        }

        const checked = []
        for (const field of this.fields) {
            if (checked.includes(field)) continue
            checked.push(field.path)

            let isSet = false
            for (const elem of arr) {
                if (elem.path.slice(0, field.path.length) === field.path) {
                    isSet = true
                    break
                }
            }

            if (!isSet && !canBeSkipped.includes(field.path)) {
                let error = `Field '${field.path}' must be set. 'Undefined' given.`
                if (!this.errors.includes(error)) this.errors.push(error)
            }
        }

        for (const elem of arr) {
            const fields = this.sysGetFieldsByPath(elem.path)
            if (fields.length) {
                this.sysValidate(elem, fields)
            } else if (strict) {
                this.errors.push(`Unexpected field '${elem.path}'.`)
            }
        }

        if (!this.errors.length) this.errors = null
        this.fields = []
        this.currentPath = ``
        return this
    }

    isObject = () => { this.currentPath += `.`; return this }
    isUndefined = (opt = {}) => { return this.sysAddRule(`Undefined`, opt) }
    isNull = (opt = {}) => { return this.sysAddRule(`Null`, opt) }
    isBoolean = (opt = {}) => { return this.sysAddRule(`Boolean`, opt) }
    isNumber = (opt = {}) => { return this.sysAddRule(`Number`, opt) }
    isBigInt = (opt = {}) => { return this.sysAddRule(`BigInt`, opt) }
    isString = (opt = {}) => { return this.sysAddRule(`String`, opt) }
    isArray = (opt = {}) => { return this.sysAddRule(`Array`, opt) }
    isFunction = (opt = {}) => { return this.sysAddRule(`Function`, opt) }
    isAsyncFunction = (opt = {}) => { return this.sysAddRule(`AsyncFunction`, opt) }
    isPromise = (opt = {}) => { return this.sysAddRule(`Promise`, opt) }
    isSymbol = (opt = {}) => { return this.sysAddRule(`Symbol`, opt) }
    isArrayBuffer = (opt = {}) => { return this.sysAddRule(`ArrayBuffer`, opt) }
    isSet = (opt = {}) => { return this.sysAddRule(`Set`, opt) }
    isMap = (opt = {}) => { return this.sysAddRule(`Map`, opt) }
    isDate = (opt = {}) => { return this.sysAddRule(`Date`, opt) }
    isRegExp = (opt = {}) => { return this.sysAddRule(`RegExp`, opt) }
    isDataView = (opt = {}) => { return this.sysAddRule(`DataView`, opt) }
    isInt8Array = (opt = {}) => { return this.sysAddRule(`Int8Array`, opt) }
    isInt16Array = (opt = {}) => { return this.sysAddRule(`Int16Array`, opt) }
    isInt32Array = (opt = {}) => { return this.sysAddRule(`Int32Array`, opt) }
    isUint8Array = (opt = {}) => { return this.sysAddRule(`Uint8Array`, opt) }
    isUint16Array = (opt = {}) => { return this.sysAddRule(`Uint16Array`, opt) }
    isUint32Array = (opt = {}) => { return this.sysAddRule(`Uint32Array`, opt) }
    isFloat32Array = (opt = {}) => { return this.sysAddRule(`Float32Array`, opt) }
    isFloat64Array = (opt = {}) => { return this.sysAddRule(`Float64Array`, opt) }
    isUint8ClampedArray = (opt = {}) => { return this.sysAddRule(`Uint8ClampedArray`, opt) }
    isSharedArrayBuffer = (opt = {}) => { return this.sysAddRule(`SharedArrayBuffer`, opt) }

    /**
     * System, not for use:
    */

     static sysCheck = (type, opt) => {
        const valueType = this.sysGetType(opt[0])
        if (type !== valueType) return false
        if (opt[1] && this.sysGetType(opt[1]) === 'Object') {
            for (const [optionName, optionValue] of Object.entries(opt[1])) {
                if (options.check(optionName, optionValue, this.sysGetType(optionValue), 'root', valueType, opt[0]).length) return false
            }
        }

        return true
    }

    static sysGetType = (value) => Object.prototype.toString.call(value).replace(`[object `, ``).replace(`]`, ``)

    sysAddRule = (type, options = {}) => {
        if (this.fields.length) {
            let lastField = this.fields.at(-1)
            if (lastField.takeRule) {
                lastField.rules.push({ type, options })
            } else if (lastField.rules[0].type === `Any` && lastField.path === this.currentPath) {
                lastField.rules[0] = { type, options }
                lastField.takeRule = type === `Array`
            } else {
                this.fields.push({ path: `${this.currentPath}`, rules: [{ type, options }], takeRule: type === `Array` })
            }
        } else {
            this.fields.push({ path: `${this.currentPath}`, rules: [{ type, options }], takeRule: type === `Array` })
        }

        return this
    }

    sysGetFieldsByPath = (path) => {
        const result = []
        for (const field of this.fields) {
            if (field.path === path) result.push(field)
        }

        return result
    }

    sysObjectToArray = (obj, parentPath = ``) => {
        let result = []
        for (const [key, value] of Object.entries(obj)) {
            const path = parentPath ? `${parentPath}.${key}` : key
            const type = this.constructor.sysGetType(value)
            if (type === `Object`) {
                if (!Object.keys(value).length) {
                    result.push({ path, type, value: {} })
                } else {
                    result = result.concat(this.sysObjectToArray(value, path))
                }
            } else {
                result.push({ path, type, value })
            }
        }
        return result
    }

    sysValidate = (elem, fields) => {
        if (fields[0].rules[0].type === `Any`) return
        const errors = []
        let validType = false
        let validOptions = false
        const availableTypes = fields.map(field => field.rules[0].type)

        for (const field of fields) {
            if (elem.type === field.rules[0].type) {
                validType = true
                const { type, options: fieldOptions } = field.rules[0]
                const checkOptions = (incomeOptions, path, valueType, value, isArray = false) => {
                    let error = ``
                    for (const [optionName, optionValue] of Object.entries(incomeOptions)) {
                        const checkResult = options.check(optionName, optionValue, this.constructor.sysGetType(optionValue), path, valueType, value, isArray)
                        if (checkResult.length) error += `${checkResult} (OR) `
                    }
                    return error.slice(0, error.length - 6)
                }

                if (type === 'Array' && elem.value.length) {
                    const rules = field.rules.slice(1)
                    const validArrayTypes = rules.map(rule => rule.type)
                    elem.value.forEach(value => {
                        const valueType = this.constructor.sysGetType(value)
                        if (validArrayTypes.length && !validArrayTypes.includes(valueType)) {
                            const error = `Field '${elem.path}' is array, and must contain '${validArrayTypes.join(' or ')}' types. '${valueType}' given.`
                            if (!errors.includes(error)) errors.push(error)
                            validOptions = false
                        } else {
                            for (const rule of rules) {
                                if (rule.type !== valueType) continue
                                const error = checkOptions(rule.options, elem.path, valueType, value, true)
                                if (error) {
                                    if (!errors.includes(error)) errors.push(error)
                                    validOptions = false
                                }
                            }
                        }
                    })
                } else {
                    const error = checkOptions(fieldOptions, elem.path, elem.type, elem.value)
                    if (error) {
                        errors.push(error)
                        validOptions = false
                    }
                }

                if (validType && validOptions) break
            }
        }

        if (!validType) this.errors.push(`Field '${elem.path}' must be type of '${availableTypes.join(`' OR '`)}'. '${elem.type}' given.`)
        if (!validOptions) this.errors.push(...errors)
    }
}