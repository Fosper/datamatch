'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}, internalError = false) => {
        return internalError
            ? { code: `OPTION`, field: path, name: optionName, message: null, ...customOptions }
            : { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
    }

    const availableValueTypes = [ `Number`, `BigInt`, `String`, `Array` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` }, true)

    const availableOptionTypes = [ `Number` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` }, true)

    let result = ``
    let valueLength
    if (type !== `Array`) {
        valueLength = value.toString().length
    } else {
        valueLength = value.length
    }
    if (valueLength > optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' maximum length must be '${optionValue}'. '${valueLength.toString()}' given.`
    }

    return end({ given: value.length, message: result })
}