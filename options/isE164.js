'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}, internalError = false) => {
        return internalError
            ? { code: `OPTION`, field: path, name: optionName, message: null, ...customOptions }
            : { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
    }

    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` }, true)

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` }, true)

    let result = ``
    let is = false
    const regex = /^\+[1-9]\d{1,14}$/

    if (regex.test(value)) is = true

    if (is !== optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} E164 phone number format.`
    }

    return end({ given: is, message: result })
}