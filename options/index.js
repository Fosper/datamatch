'use strict'

import isBase64 from './isBase64'
import isDate from './isDate'
import isDomain from './isDomain'
import isE164 from './isE164'
import isEmail from './isEmail'
import isFloat from './isFloat'
import isHTTPSUrl from './isHTTPSUrl'
import isHTTPUrl from './isHTTPUrl'
import isInt from './isInt'
import isIP from './isIP'
import isIPv4 from './isIPv4'
import isIPv6 from './isIPv6'
import isJSON from './isJSON'
import isMd5 from './isMd5'
import isNumeric from './isNumeric'
import isSha256 from './isSha256'
import isUrl from './isUrl'
import isWSSUrl from './isWSSUrl'
import isWSUrl from './isWSUrl'
import length from './length'
import max from './max'
import maxLength from './maxLength'
import min from './min'
import minLength from './minLength'
import values from './values'

const validators = {
    isBase64,
    isDate,
    isDomain,
    isE164,
    isEmail,
    isFloat,
    isHTTPSUrl,
    isHTTPUrl,
    isInt,
    isIP,
    isIPv4,
    isIPv6,
    isJSON,
    isMd5,
    isNumeric,
    isSha256,
    isUrl,
    isWSSUrl,
    isWSUrl,
    length,
    max,
    maxLength,
    min,
    minLength,
    values
}

export default class {
    static check = (optionName, optionValue, optionValueType, path, type, value, inArray = false) => {
        const validator = validators[optionName]
        if (!validator) {
            return `Internal field error '${path}'. Unknown option '${optionName}'.`
        }

        return validator(optionName, optionValue, optionValueType, path, type, value, inArray)
    }
}