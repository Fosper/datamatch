import check from './index'

export default function (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) {
    const availableTypeOptions = [ `minLength` ]
    return check(`String`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            if (requiredFieldValueType !== fieldValueType) return false
            return true
        }
    )
}