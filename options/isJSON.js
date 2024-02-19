'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    try {
        JSON.parse(value)
        if (!optionValue) {
            result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not JSON.`
        }
    } catch (error) {
        if (optionValue) {
            result = `${inArray ? `Array element in field` : `Field`} '${path}' must be JSON.`
        }
    }
    return result
}