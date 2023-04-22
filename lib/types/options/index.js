"use strict"

import min from "./min"
import minLength from "./minLength"

export default class {
    static min = min
    static minLength = minLength

    /**
     * Checks if the provided field meets the conditions specified by the field option.
     * @param {string} fieldPath - The path of the field.
     * @param {*} fieldValue - The value of the field.
     * @param {string} fieldValueType - The type of the field value.
     * @param {string} fieldOptionName - The name of the field option.
     * @param {*} fieldOptionValue - The value of the field option.
     * @returns {string} - A message indicating whether the field meets the conditions, or an error message.
     */
    static check = (fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue) => {
        // Get the field option value type
        const fieldOptionValueType = Object.prototype.toString.call(fieldOptionValue).slice(8, -1)
        
        // Get the available option value types for the specified field option name
        const availableOptionValueTypes = this[fieldOptionName].availableValueTypes

        // Check if the field option value type is in the list of available option value types
        if (!availableOptionValueTypes.includes(fieldOptionValueType)) {
            return `Field '${fieldPath}' option '${fieldOptionName}' value can be '${availableOptionValueTypes.join(`', '`)}'. '${fieldOptionValueType}' given.`
        }

        // Call the corresponding validation function for the field option and return the result
        return this[fieldOptionName].fn(fieldPath, fieldValue, fieldValueType, fieldOptionValue, fieldOptionValueType)
    }
}