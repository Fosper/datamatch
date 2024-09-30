'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    const regex = /^[a-fA-F0-9]{32}$/
    const is = regex.test(value)

    if (is && !optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not MD5 hash.`
    } else if (!is && optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be MD5 hash.`
    }

    return result
}