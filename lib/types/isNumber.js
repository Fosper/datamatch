import check from './index'

export default function (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) {
    const availableTypeOptions = [ `min` ]
    return check(`Number`, availableTypeOptions, fieldPath, fieldValue, fieldOptions, detail,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            if (requiredFieldValueType !== fieldValueType) return false
            return true
        }
    )
}