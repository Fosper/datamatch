'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableOptionTypes = [ `Array` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`


    let result = ``
    if (!optionValue.includes(value)) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' didn't contain required values.`
    }

    return result
}