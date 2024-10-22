'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}) => {
        const options = { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
        return options
    }

    const availableValueTypes = [ `Number`, `BigInt`, `String`, `Array` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` })

    const availableOptionTypes = [ `Number` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` })

    let result = ``
    let valueLength
    if (type !== `Array`) {
        valueLength = value.toString().length
    } else {
        valueLength = value.length
    }

    if (valueLength < optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' minimum length must be '${optionValue}'. '${valueLength.toString()}' given.`
    }

    return end({ given: value.length, message: result })
}