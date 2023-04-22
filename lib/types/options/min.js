export default class {
    static availableValueTypes = [ `Number` ]

    static fn = (fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType) => {
        let result = ``
        if (fieldValue < fieldOptionValue) {
            result = `Field '${fieldPath}' must be less than '${fieldOptionValue}'. '${fieldValue}' given.`
        }

        return result
    }
}