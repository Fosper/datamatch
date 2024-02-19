'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = `${inArray ? `Array element in field` : `Field`} '${path}' must be float.`
    switch (type) {
        case `Number`:
        case `String`:
            const decimalAndCommaChars = [ `.` ]
            if (valueType !== `String`) value = value.toString()
            if (value.length >= 3) {
                if (decimalAndCommaChars.includes(value.slice(1, 2))) result = ``
            }
            break
        default:
            break
    }

    return result
}