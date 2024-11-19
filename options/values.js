'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}, internalError = false) => {
        return internalError
            ? { code: `OPTION`, field: path, name: optionName, message: null, ...customOptions }
            : { code: `OPTION`, field: path, name: optionName, expect: `values`, given: null, message: null, ...customOptions }
    }

    const availableOptionTypes = [ `Array` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` }, true)


    let result = ``
    if (!optionValue.includes(value)) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' didn't contain required values.`
    }

    return end({  given: value.length, message: result })
}