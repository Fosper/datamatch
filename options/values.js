'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}) => {
        const options = { code: `OPTION`, field: path, name: optionName, expect: `values`, given: null, message: null, ...customOptions }
        return options
    }

    const availableOptionTypes = [ `Array` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` })


    let result = ``
    if (!optionValue.includes(value)) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' didn't contain required values.`
    }

    return end({  given: value.length, message: result })
}