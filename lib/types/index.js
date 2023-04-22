'use strict'

import options from './options'

/**
 * Checks the type and options of a field value
 * @param {string} requiredFieldValueType - The required type of the field value
 * @param {string[]} availableTypeOptions - The available options for the field type
 * @param {string} fieldPath - The path of the field in the object
 * @param {*} fieldValue - The value of the field
 * @param {object} fieldOptions - The options for the field
 * @param {boolean} detail - Whether to return detailed error messages or boolean values
 * @param {function} func - A custom function to validate the field type
 * @returns {(string[]|boolean)} An array of error messages or a boolean value indicating validity
 */
export default (
  requiredFieldValueType,
  availableTypeOptions,
  fieldPath,
  fieldValue,
  fieldOptions,
  detail,
  func
) => {
    // Get the field value type
    const fieldValueType = Object.prototype.toString.call(fieldValue).slice(8, -1)

    // If the field value type does not match the required type, return an error or false
    if (!func(requiredFieldValueType, fieldPath, fieldValue, fieldValueType)) {
        return detail ? `Field '${fieldPath}' must be '${requiredFieldValueType}'. '${fieldValueType}' given.` : false
    }

    // Create an array to store all errors
    const allErrors = []

    // Iterate over all field options
    for (const [fieldOptionName, fieldOptionValue] of Object.entries(fieldOptions)) {
        // If the field option is not in the available options for the field type, add an error or return false
        if (!availableTypeOptions.includes(fieldOptionName)) {
            if (detail) {
                allErrors.push(`Field '${fieldPath}' contains incorrect option '${fieldOptionName}'.`)
                continue
            }
            return false
        }

        // Check the field value against the option using the options module
        let error = options.check(fieldPath, fieldValue, fieldValueType, fieldOptionName, fieldOptionValue)
        // If there is an error, add it to the array or return false
        if (error.length) {
            if (detail) {
                allErrors.push(error)
                continue
            }
            return false
        }
    }

    // Return the array of errors or true depending on the detail parameter
    return detail ? allErrors : true
}