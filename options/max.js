'use strict'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const end = (customOptions = {}) => {
        const options = { code: `OPTION`, field: path, name: optionName, expect: optionValue, given: null, message: null, ...customOptions }
        return options
    }

    const availableValueTypes = [ `Number`, `BigInt` ]
    if (!availableValueTypes.includes(type)) return end({ message: `Internal field error '${path}'. Unsupported option '${optionName}'.` })

    const availableOptionTypes = [ `Number`, `String` ]
    if (!availableOptionTypes.includes(optionValueType)) return end({ message: `Internal field error '${path}'. Unsupported option type for option '${optionName}'.` })

    let result = ``
    switch (type) {
        case `Number`:
            if (optionValueType !== `Number`) {
                result = `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`
                break
            }
            if (value > optionValue) {
                result = `${inArray ? `Array element in field` : `Field`} '${path}' must be less or equal than '${optionValue.toString()}'. '${value.toString()}' given.`
            }
            break
        case `BigInt`:
            if (optionValueType !== `String`) {
                result = `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`
                break
            }
            if (value > BigInt(optionValue)) {
                result = `${inArray ? `Array element in field` : `Field`} '${path}' must be less or equal than '${optionValue.toString()}'.`
            }
            break
    }

    return end({ given: value.length, message: result })
}