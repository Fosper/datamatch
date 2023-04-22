import min from './min'
import minLength from './minLength'

export default class {
    static min = min
    static minLength = minLength

    static check = (fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue) => {
        const fieldOptionValueType = Object.prototype.toString.call(fieldOptionValue).split(` `)[1].replace(`]`, ``)
        const availableOptionValueTypes = this[fieldOptionName].availableValueTypes

        if (!availableOptionValueTypes.includes(fieldOptionValueType)) {
            return `Field '${fieldPath}' option '${fieldOptionName}' value can be '${availableOptionValueTypes.join(`', '`)}'. '${fieldOptionValueType}' given.`
        }

        return this[fieldOptionName].fn(fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType)
    }
}