import options from './options'

export default function(requiredFieldValueType, availableOptions, fieldValue, fieldOptions, detail, fieldPath, func) {
    const fieldValueType = Object.prototype.toString.call(fieldValue).split(` `)[1].replace(`]`, ``)

    if (!func(requiredFieldValueType, fieldPath, fieldValue, fieldValueType)) {
        if (detail) return `Field '${fieldPath}' must be '${requiredFieldValueType}'. '${fieldValueType}' given.`
        return false
    }

    const allErrors = []
    for (const fieldOptionName in fieldOptions) {
        if (!availableOptions.includes(fieldOptionName)) {
            if (detail) { allErrors.push(`Field '${fieldPath}' contain incorrect option '${fieldOptionName}'.`); continue }
            return false
        }

        let fieldOptionValue = fieldOptions[fieldOptionName]
        let error = options.check(fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue)
        if (error.length) {
            if (detail) { allErrors.push(error); continue }
            return false
        }
    }

    if (detail) return allErrors
    return true
}