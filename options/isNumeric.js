'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}, internalError = false) => {
        return internalError
            ? { code: `OPTION`, field: path, name: optionName, message: null, ...customOptions }
            : { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
    }

    const availableValueTypes = [ `Number`, `String` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` }, true)

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` }, true)

    let result = ``
    let is = false

    if (type !== `String`) value = value.toString()
    if (value.length) {
        if (value.at(0) === `-`) value = value.slice(1)
        if (value.length) {
            is = true
            const numbersChars = [ `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `.` ]
            const valueChars = value.split(``)
            for (const char of valueChars) {
                if (!numbersChars.includes(char)) {
                    is = false
                    break
                }
            }
            if (is && value.includes(`.`)) {
                if ((value.split(`.`).length - 1) !== 1 || value.startsWith(`00`)) is = false
            }
        }
    }

    if (is !== optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} integer.`
    }

    return end({ given: is, message: result })
}