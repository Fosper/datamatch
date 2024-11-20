'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}, internalError = false) => {
        return internalError
            ? { code: `OPTION`, field: path, name: optionName, message: null, ...customOptions }
            : { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
    }

    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` }, true)

    const availableOptionTypes = [ `String` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` }, true)

    if (!optionValue.length) {
        return end({ message: `Internal field error '${path}'. Unsupported option value (empty string) for option '${optionName}'.` }, true)
    }

    let result = ``

    if (!value.length) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' didn't contains required chars.`
    } else {
        let isContains = false
        const valueChars = value.split(``)
        for (const valueChar of valueChars) {
            if (optionValue.includes(valueChar)) {
                isContains = true
                break            
            }
        }
        if (!isContains) {
            result = `${inArray ? `Array element in field` : `Field`} '${path}' didn't contains required chars.`
        }
    }

    return end({ given: value, message: result })
}