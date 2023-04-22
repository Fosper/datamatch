export default class {
    static availableValueTypes = [ `Number` ]

    static fn = (fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType) => {
        let result = ``
        let fieldValueLength = fieldValue.length
        if (fieldValueLength < fieldOptionValue) {
            result = `Field '${fieldPath}' length must be less than '${fieldOptionValue}'. '${fieldValueLength}' given.`
        }

        return result
    }
}