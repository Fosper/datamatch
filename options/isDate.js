'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}) => {
        const options = { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
        return options
    }

    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` })

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` })

    let result = ``
    let is = false
    const date = new Date(value)

    if ((date instanceof Date) && !isNaN(date)) is = true

    if (is !== optionValue) {
        result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} date.`
    }

    return end({ given: is, message: result })
}