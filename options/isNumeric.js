'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = `${inArray ? `Array element in field` : `Field`} '${path}' must be numeric.`
    switch (type) {
        case `Number`:
        case `String`:
            const numbersChars = [ `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` ]
            const decimalAndCommaChars = [ `.`, `,` ]
            if (valueType !== `String`) value = value.toString()
            let chars = value.split(``)
            let i = 0
            let incorrectFound = false
            let cursor = value.split(`.`)[0].length + 1
            for (let char of chars) {
                if (!i && char === `-`) continue
                i++
                if (!numbersChars.includes(char)) {
                    if (i === cursor && decimalAndCommaChars.includes(char)) continue
                    incorrectFound = true
                    break
                }
            }
            if (!incorrectFound) result = ``
            break
        default:
            break
    }

    return result
}