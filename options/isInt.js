'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `Number`, `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let is = false
    if (type !== `String`) value = value.toString()
    if (value.length) {
        if (value.at(0) === `-`) value = value.slice(1)
        if (value.length) {
            is = true
            const numbersChars = [ `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` ]
            const valueChars = value.split(``)
            for (const char of valueChars) {
                if (!numbersChars.includes(char)) {
                    is = false
                    break
                }
            }
        }
    }

    let result = ``
    if (is !== optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} integer.`
    }

    return result
}