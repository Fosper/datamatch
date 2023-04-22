import isNull from './lib/types/isNull'
import isNumber from './lib/types/isNumber'
import isString from './lib/types/isString'

export default class {
    static isNull = isNull
    static isNumber = isNumber
    static isString = isString

    static init() {
        return new this()
    }

    constructor() {
        this.fields = []
        this.errors = []
        this.currentPath = ``
    }
  
    field(fieldName) {
        if (this.currentPath === ``) {
            this.currentPath = fieldName
        } else {
            this.currentPath = `${this.currentPath}.${fieldName}`
        }
    
        this.fields.push({
            path: this.currentPath,
            rules: []
        })
    
        return this
    }

    end() {
        const parentName = this.fields.at(-1).path.split(`.`).slice(0, -1).join(`.`)
        const parentIndex = this.fields.findIndex(element => element.path === parentName)
        if (parentIndex === -1) return this
        const parentElement = this.fields.splice(parentIndex, 1)[0]
        this.fields.push(parentElement)
        return this
    }

    isNull(opt = {}) { this.fields.at(-1).rules.push([`Null`, opt]); return this.resetCurrentPath() }
    isNumber(opt = {}) { this.fields.at(-1).rules.push([`Number`, opt]); return this.resetCurrentPath() }
    isString(opt = {}) { this.fields.at(-1).rules.push([`String`, opt]); return this.resetCurrentPath() }
  
    check(obj) {
        let result = { data: true, errors: null }
        for (const field of this.fields) this.validateField(field, obj)
        if (this.errors.length) { result.data = false; result.errors = [ ...this.errors ] }
        return result
    }

    reset() {
        this.fields = []
        this.errors = []
        this.currentPath = ``
    }

    resetCurrentPath() {
        this.currentPath = ``
        return this
    }
  
    validateField(field, obj) {
        const fieldValue = this.getValueByPath(obj, field.path)
        const allErrors = []
        let noErrors = false

        for (const [ruleName, fieldOptions] of field.rules) {
            let errors = this.checkType(ruleName, fieldValue, fieldOptions, field.path)
            if (errors.length) {
                if (Array.isArray(errors)) { allErrors.push(...errors); continue }
                allErrors.push(errors)
            } else {
                noErrors = true
            }
        }
      
        if (!noErrors && allErrors.length > 0) this.errors.push(...allErrors)
    }
  
    getValueByPath(obj, path) {
        return path.split(`.`).reduce((o, key) => (o && o[key] !== `undefined` ? o[key] : undefined), obj)
    }
  
    checkType(ruleName, fieldValue, fieldOptions, fieldPath) {
        return this.constructor[`is${ruleName}`](fieldValue, fieldOptions, true, fieldPath)
    }
}