'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    const regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
    const is = regex.test(value)
    if (is && !optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not Base64.`
    } else if (!is && optionName) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be Base64.`
    }

    return result
}