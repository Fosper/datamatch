import options from './options'

export default function(requiredFieldValueType, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail, func) {
    const fieldValueType = Object.prototype.toString.call(fieldValue).split(` `)[1].replace(`]`, ``)

    if (!func(requiredFieldValueType, fieldPath, fieldValue, fieldValueType)) {
        return detail ? `Field '${fieldPath}' must be '${requiredFieldValueType}'. '${fieldValueType}' given.` : false
    }

    const allErrors = []
    for (const [fieldOptionName, fieldOptionValue] of Object.entries(fieldOptions)) {
        if (!availableTypeOptions.includes(fieldOptionName)) {
            if (detail) {
                allErrors.push(`Field '${fieldPath}' contain incorrect option '${fieldOptionName}'.`)
                continue
            }
            return false
        }

        let error = options.check(fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue)
        if (error.length) {
            if (detail) {
                allErrors.push(error)
                continue
            }
            return false
        }
    }

    return detail ? allErrors : true
}