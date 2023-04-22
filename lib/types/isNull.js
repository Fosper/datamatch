import check from './index'

export default function (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) {
    const availableTypeOptions = []
    return check(`Null`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            if (requiredFieldValueType !== fieldValueType) return false
            return true
        }
    )
}