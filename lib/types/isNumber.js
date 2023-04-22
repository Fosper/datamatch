import check from './index'

export default function (fieldValue, fieldOptions = {}, detail = false, fieldPath = ``) {
    const availableOptions = [ `min` ]
    return check(`Number`, availableOptions, fieldValue, fieldOptions, detail, fieldPath,
        (requiredFieldValueType, fieldPath, fieldValue, fieldValueType) => {
            if (requiredFieldValueType !== fieldValueType) return false
            return true
        }
    )
}