'use strict'

import options from './options'

class Datamatch {
    constructor() {
        this.currentPath = ``
        this.fields = []
        this.errors = null
        this.constructor.types.forEach(type => {
            this[`is${type}`] = (opt = {}) => this.sysAddRule(type, opt)
        })
    }

    static types = [ `Undefined`, `Null`, `Boolean`, `Number`, `BigInt`, `String`, `Array`, `Object`, `Function`, `AsyncFunction`, `Promise`, `Symbol`, `ArrayBuffer`, `Set`, `WeakSet`, `Map`, `WeakMap`, `WeakRef`, `Date`, `RegExp`, `DataView`, `Int8Array`, `Int16Array`, `Int32Array`, `Uint8Array`, `Uint16Array`, `Uint32Array`, `Float32Array`, `Float64Array`, `Uint8ClampedArray`, `SharedArrayBuffer`, `FinalizationRegistry`, `AbortController` ]

    static init = () => new this()

    field = (fieldName) => {
        if (this.currentPath) {
            const lastIndex = this.currentPath.lastIndexOf(`.`)
            if (lastIndex !== -1) {
                this.currentPath = `${this.currentPath.substring(0, lastIndex + 1)}${fieldName}`
            } else {
                this.currentPath = fieldName
            }
        } else {
            this.currentPath = fieldName
        }
        this.sysAddRule(`Any`)
        return this
    }

    end = () => {
        const pathParts = this.currentPath.split(`.`)
        if (this.currentPath.at(-1) !== `.`) {
            if (!this.fields.at(-1).takeRule) {
                this.currentPath = pathParts.slice(0, -1).join(`.`)
            } else {
                this.fields.at(-1).takeRule = false
            }
        } else {
            this.currentPath = pathParts.slice(0, -1).join(`.`)
            // if (this.currentPath.includes(`.`)) this.sysAddRule(`Object`)
        }
        return this
    }

    check = (obj, strict = false) => {
        this.errors = []
    
        const objType = this.constructor.sysGetType(obj)
        if (objType !== `Object`) {
            this.errors.push({ code: `UNEXPECTED_DATA`, field: elem.path, message: `Data must be type of 'Object'. '${objType}' given.` })
            return this
        }
    
        const arr = this.sysObjectToArray(obj)
        const canBeSkipped = new Set()
        const checked = new Set()
    
        for (let i = 0, length = this.fields.length; i < length; i++) {
            const field = this.fields[i]
            if (field.rules[0].type === `Undefined`) canBeSkipped.add(field.path)
        }
    
        for (let i = 0, length = this.fields.length; i < length; i++) {
            const field = this.fields[i]
            if (checked.has(field.path)) continue
            checked.add(field.path)
    
            let isSet = arr.some(elem => elem.path.startsWith(field.path))
            let parentCanNotSet = this.sysIsParentCanNotSet(field.path)

            if (!isSet && !canBeSkipped.has(field.path) && !parentCanNotSet && this.sysIsParentObjectOnly(field.path)) {
                let error = { code: `UNEXPECTED_FIELD`, field: field.path, message: `Field '${field.path}' must be set. 'Undefined' given.` }

                let isHave = false
                for (const err of this.errors) {
                    if (err.message === error.message) {
                        isHave = true
                        break
                    }
                }

                if (!isHave) this.errors.push(error)
            }
        }
    
        if (strict) {
            arr.forEach(elem => {
                const fields = this.sysGetFieldsByPath(elem.path)
                if (!fields.length) this.errors.push({ code: `UNEXPECTED_FIELD`, field: elem.path, message: `Unexpected field '${elem.path}'.` })
                else this.sysValidate(elem, fields)
            })
        } else {
            arr.forEach(elem => {
                const fields = this.sysGetFieldsByPath(elem.path)
                if (fields.length) this.sysValidate(elem, fields)
            })
        }
    
        if (!this.errors.length) this.errors = null
        this.fields = []
        this.currentPath = ``
        return this
    }

    /**
     * System, not for use:
    */

    static sysGetType = (value) => Object.prototype.toString.call(value).replace(`[object `, ``).replace(`]`, ``)

    static sysCheck = (type, opt) => {
        const valueType = this.sysGetType(opt[0])
        if (type !== valueType) return false
    
        if (opt[1]) {
            const secondArgType = this.sysGetType(opt[1])
            if (secondArgType === `Object`) {
                for (const [optionName, optionValue] of Object.entries(opt[1])) {
                    const optionValueType = this.sysGetType(optionValue)
                    if (options.check(optionName, optionValue, optionValueType, `root`, valueType, opt[0]).message) {
                        return false
                    }
                }
            }
        }
    
        return true
    }

    sysGetFieldsByPath = (path) => this.fields.filter(field => field.path === path)

    sysAddRule = (type, options = {}) => {
        const newRule = { type, options }
        const takeRule = type === `Array`
    
        if (this.fields.length) {
            const lastField = this.fields.at(-1)
            if (lastField.takeRule) {
                lastField.rules.push(newRule)
            } else if (lastField.rules[0].type === `Any` && lastField.path === this.currentPath) {
                lastField.rules[0] = newRule
                lastField.takeRule = takeRule
            } else {
                this.fields.push({ path: this.currentPath, rules: [newRule], takeRule })
            }
        } else {
            this.fields.push({ path: this.currentPath, rules: [newRule], takeRule })
        }

        if (type === `Object`) this.currentPath += `.`
    
        return this
    }

    sysObjectToArray = (obj, parentPath = ``) => {
        let result = []
        for (const [key, value] of Object.entries(obj)) {
            const path = parentPath ? `${parentPath}.${key}` : key
            const type = this.constructor.sysGetType(value)
            if (type === `Object`) {
                result.push({ path, type, value: Object.keys(value).length ? undefined : {} })
                if (Object.keys(value).length) {
                    result = [...result, ...this.sysObjectToArray(value, path)]
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
        const errorMessages = []
        let validType = false
        let validOptions = false
        const availableTypes = fields.map(field => field.rules[0].type)

        for (const field of fields) {
            if (elem.type === field.rules[0].type) {
                validType = true
                const { type, options: fieldOptions } = field.rules[0]

                if (type === `Array` && elem.value.length) {
                    const rules = field.rules.slice(1)
                    const validArrayTypes = rules.map(rule => rule.type)
                    elem.value.forEach(value => {
                        const valueType = this.constructor.sysGetType(value)
                        if (validArrayTypes.length && !validArrayTypes.includes(valueType)) {
                            const error = {
                                code: `TYPE`, field: elem.path, name: `isArray`, value: true, given: valueType, message: `Field '${elem.path}' is array, and must contain '${validArrayTypes.join(`' or '`)}' types. '${valueType}' given.`
                            }
                            if (error.message && !errorMessages.includes(error.message)) {
                                errorMessages.push(error.message)
                                errors.push(error)
                            }
                        } else {
                            for (const rule of rules) {
                                if (rule.type !== valueType) continue
                                const optErrors = this.sysCheckOptions(rule.options, elem.path, valueType, value, true)
                                if (optErrors.length) {
                                    for (const error of optErrors) {
                                        if (error.message && !errorMessages.includes(error.message)) {
                                            errorMessages.push(error.message)
                                            errors.push(error)
                                        }
                                    }
                                } else {
                                    validOptions = true
                                }
                            }
                        }
                    })
                } else {
                    const optErrors = this.sysCheckOptions(fieldOptions, elem.path, elem.type, elem.value)
                    if (optErrors.length) {
                        for (const error of optErrors) {
                            if (error.message && !errorMessages.includes(error.message)) {
                                errorMessages.push(error.message)
                                errors.push(error)
                            }
                        }
                    } else {
                        validOptions = true
                    }
                }

                if (validType && validOptions) break
            }
        }

        if (!validType) {
            for (const availableType of availableTypes) {
                this.errors.push({
                    code: `TYPE`, field: elem.path, name: `is${availableType}`, value: true, given: elem.type, message: `Field '${elem.path}' must be type of '${availableTypes.join(`' OR '`)}'. '${elem.type}' given.`
                })
            }
        }
        if (!validOptions) this.errors.push(...errors)
    }

    sysCheckOptions = (incomeOptions, path, valueType, value, isArray = false) => {
        const errors = []
        for (const [optionName, optionValue] of Object.entries(incomeOptions)) {
            const result = options.check(optionName, optionValue, this.constructor.sysGetType(optionValue), path, valueType, value, isArray)
            if (result.message) errors.push(result)
            // if (checkResult.length) error += `${checkResult} (OR) `
        }
        // return error.slice(0, error.length - 6)
        return errors
    }

    sysIsParentCanNotSet = (path) => {
        if (!path.includes(`.`)) return false
        path = path.split(`.`).slice(0, -1).join(`.`)
        for (const field of this.fields) {
            if (field.path === path && field.rules[0].type === `Undefined`) {
                return true
            }
        }
        return false
    }

    sysGetRulesByPath = (path) => {
        const result = []
        for (const field of this.fields) {
            if (field.path === path) {
                for (const rule of field.rules) result.push(rule)
            }
        }
        return result
    }

    sysIsParentObjectOnly = (path) => {
        if (!path.includes(`.`)) return true
        path = path.split(`.`).slice(0, -1).join(`.`)
        const pathRules = this.sysGetRulesByPath(path)
        for (const rule of pathRules) {
            if (rule.type !== `Object`) return false
        }
        if (path.includes(`.`)) {
            return this.sysIsParentObjectOnly(path)
        } else {
            return true
        }
    }
}

Datamatch.types.forEach(type => {
    Datamatch[`is${type}`] = (...opt) => Datamatch.sysCheck(type, opt)
})

export default Datamatch