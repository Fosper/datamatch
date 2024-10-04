'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const is = regex.test(value)

    if (is && !optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not email address.`
    } else if (!is && optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be email address.`
    }

    return result
}