'use strict'

import { URL } from 'url'

export default (optionName, optionValue, optionValueType, path, type, value, inArray) => {
    const availableValueTypes = [ `String` ]
    if (!availableValueTypes.includes(type)) return `Internal field error '${path}'. Unsupported option '${optionName}'.`

    const availableOptionTypes = [ `Boolean` ]
    if (!availableOptionTypes.includes(optionValueType)) return `Internal field error '${path}'. Unsupported option type for option '${optionName}'.`

    let result = ``
    let isUrl = false
    try {
        const parsedUrl = new URL(value)
        if (parsedUrl.protocol === `ws:` && parsedUrl.hostname.length) isUrl = true
        if (isUrl !== optionValue) {
            result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} ws url.`
        }
        return result
    } catch (error) {
        if (isUrl !== optionValue) {
            result = `${inArray ? `Array element in field` : `Field`} '${path}' must be${!optionValue ? ` not` : ``} ws url.`
        }
        return result
    }
}