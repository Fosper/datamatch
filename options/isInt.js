'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `Number`, `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    if (optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be integer.`
    } else {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be not integer.`
    }
    const numbersChars = [ `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` ]
    if (type !== `String`) value = value.toString()
    let chars = value.split(``)
    let i = 0
    let incorrectFound = false
    for (let char of chars) {
        if (!i && char === `-`) continue
        i++
        if (!numbersChars.includes(char)) {
            incorrectFound = true
            break
        }
    }
    if (!incorrectFound && optionValue) result = ``
    if (incorrectFound && !optionValue) result = ``

    return result
}