'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    const regex = /^\+[1-9]\d{1,14}$/
    const is = regex.test(value)

    if (is && !optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not E164 phone number format.`
    } else if (!is && optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be E164 phone number format.`
    }

    return result
}