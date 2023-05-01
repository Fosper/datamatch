# Datamatch - Simple and Fast Data Validation for Node.js
Datamatch is a user-friendly and easy-to-use JavaScript library for data validation without any dependencies. It allows you to validate input values against specific criteria and returns the validation result. This library is designed for use in Node.js projects and is perfect for developers who need a fast and reliable way to validate data.

IMPORTANT: Data types and check options are updated every week. Contact issues to add custom data types and options.

## Table of Contents

- [Installation](#installation)
- [Import](#import)
- [Usage](#usage)
    - [Example 1: Number validation](#example-1-number-validation)
    - [Example 2: Array validation](#example-2-array-validation)
    - [Example 3: Nested field validation](#example-3-nested-field-validation)
- [Default NodeJS types](#default-nodejs-types)
    - [isUndefined](#isundefined)
    - [isNull](#isnull)
    - [isBoolean](#isboolean)
    - [isNumber](#isnumber)
    - [isBigInt](#isbigint)
    - [isString](#isstring)
    - [isArray](#isarray)
    - [isObject](#isobject)
    - [isFunction](#isfunction)
    - [isAsyncFunction](#isasyncfunction)
    - [isPromise](#ispromise)
    - [isSymbol](#issymbol)
    - [isArrayBuffer](#isarraybuffer)
    - [isSet](#isset)
    - [isMap](#ismap)
    - [isDate](#isdate)
    - [isRegExp](#isregexp)
    - [isDataView](#isdataview)
    - [isInt8Array](#isint8array)
    - [isInt16Array](#isint16array)
    - [isInt32Array](#isint32array)
    - [isUint8Array](#isuint8array)
    - [isUint16Array](#isuint16array)
    - [isUint32Array](#isuint32array)
    - [isFloat32Array](#isfloat32array)
    - [isFloat64Array](#isfloat64array)
    - [isUint8ClampedArray](#isuint8clampedarray)
    - [isSharedArrayBuffer](#issharedarraybuffer)
<!-- - [Custom library types](#custom-library-types)
    - [isFloat](#isfloat) -->
- [Options](#options)
    - [min](#min)
    - [max](#max)
    - [minLength](#minlength)
    - [maxLength](#maxlength)
    - [values](#values)
    - [isDomain](#isdomain)
    - [isUrl](#isurl)
    - [isHTTPUrl](#ishttpUrl)
    - [isHTTPSUrl](#ishttpsUrl)
    - [isWSUrl](#iswsUrl)
    - [isWSSUrl](#iswssUrl)
    - [isIP](#isip)
    - [isIPv4](#isipv4)
    - [isIPv6](#isipv6)
    - [isFloat](#isfloat)
    - [isInt](#isint)
    - [isNumeric](#isnumeric)
- [License](#license)

# Installation

Install Datamatch using npm:

```bash
npm i datamatch
```

[back to top](#table-of-contents)

# Import

```js
import datamatch from 'datamatch';
```
OR
```js
const datamatch = require('datamatch');
```

[back to top](#table-of-contents)

# Usage

## Example 1: Number validation

```js
const penCount = 5
console.log(datamatch.isNumber(penCount, { min: 5 })) // true
```

Returns:
```js
true
```

[back to top](#table-of-contents)

## Example 2: Array validation

```js
const firends = [ `John`, `Katrin`, `Tom` ]
console.log(datamatch.isArray(firends)) // true
```

Returns:
```js
true
```

[back to top](#table-of-contents)

## Example 3: Nested field validation

```js
let obj = {
    one: null,
    two: 55,
    three: { four: 'Hello' },
    five: { six: [ 'John', 'Katrin' ] }
}

const dm = datamatch.init()
    .field('one').isNull()
    .field('two').isNumber({ min: 55 })
    .field('three').field('four').isString({ minLength: 5 }).end()
    .field('five').field('six').isArray()
    .check(obj)

if (dm.errors) {
    console.log(dm.errors) // Shows all fields path and whats wrong.
    console.log(false)
} else {
    console.log(true)
}
```

Returns:
```js
true
```

[back to top](#table-of-contents)

# Default NodeJS types

## isUndefined
Available options: todo.

[back to top](#table-of-contents)

## isNull
Available options: todo.

[back to top](#table-of-contents)

## isBoolean
Available options: todo.

[back to top](#table-of-contents)

## isNumber
Available options:  
[min](#min)
[max](#max)
[minLength](#minlength)
[maxLength](#maxlength)
[values](#values)
[isFloat](#isfloat)
[isInt](#isint)
[isNumeric](#isnumeric)

[back to top](#table-of-contents)

## isBigInt
Available options:  
[min](#min)  
[max](#max)  
[minLength](#minlength)  
[maxLength](#maxlength)  
[values](#values)  
[isInt](#isint)  
[isNumeric](#isnumeric)  

[back to top](#table-of-contents)

## isString
Available options:  
[minLength](#minlength)  
[maxLength](#maxlength)  
[values](#values)  
[isDomain](#isdomain)  
[isUrl](#isurl)  
[isHTTPUrl](#ishttpUrl)  
[isHTTPSUrl](#ishttpsUrl)  
[isWSUrl](#iswsUrl)  
[isWSSUrl](#iswssUrl)  
[isIP](#isip)  
[isIPv4](#isipv4)  
[isIPv6](#isipv6)  
[isFloat](#isfloat)  
[isInt](#isint)  
[isNumeric](#isnumeric)  

[back to top](#table-of-contents)

## isArray
Available options:  
[minLength](#minlength)  
[maxLength](#maxlength)  

[back to top](#table-of-contents)

## isObject
Available options: todo.

[back to top](#table-of-contents)

## isFunction
Available options: todo.

[back to top](#table-of-contents)

## isAsyncFunction
Available options: todo.

[back to top](#table-of-contents)

## isPromise
Available options: todo.

[back to top](#table-of-contents)

## isSymbol
Available options: todo.

[back to top](#table-of-contents)

## isArrayBuffer
Available options: todo.

[back to top](#table-of-contents)

## isSet
Available options: todo.

[back to top](#table-of-contents)

## isMap
Available options: todo.

[back to top](#table-of-contents)

## isDate
Available options: todo.

[back to top](#table-of-contents)

## isRegExp
Available options: todo.

[back to top](#table-of-contents)

## isDataView
Available options: todo.

[back to top](#table-of-contents)

## isInt8Array
Available options: todo.

[back to top](#table-of-contents)

## isInt16Array
Available options: todo.

[back to top](#table-of-contents)

## isInt32Array
Available options: todo.

[back to top](#table-of-contents)

## isUint8Array
Available options: todo.

[back to top](#table-of-contents)

## isUint16Array
Available options: todo.

[back to top](#table-of-contents)

## isUint32Array
Available options: todo.

[back to top](#table-of-contents)

## isFloat32Array
Available options: todo.

[back to top](#table-of-contents)

## isFloat64Array
Available options: todo.

[back to top](#table-of-contents)

## isUint8ClampedArray
Available options: todo.

[back to top](#table-of-contents)

## isSharedArrayBuffer
Available options: todo.

[back to top](#table-of-contents)

# Custom library types

## isFloat
Available options: todo.

[back to top](#table-of-contents)

## isInt
Available options: todo.

[back to top](#table-of-contents)

## isNumeric
Available options: todo.

[back to top](#table-of-contents)

# Options

## min
```js
console.log(datamatch.isNumber(5, { min: 5 })) // true
console.log(datamatch.isNumber(5, { min: 6 })) // false

const ants = BigInt('1000000000000000000000000000000')
console.log(datamatch.isBigInt(big, { min: '1000000000000000000000000000000' })) // true
console.log(datamatch.isBigInt(big, { min: '1000000000000000000000000000001' })) // false
```

[back to top](#table-of-contents)

## max
```js
console.log(datamatch.isNumber(5, { max: 5 })) // true
console.log(datamatch.isNumber(5, { max: 4 })) // false

const atoms = BigInt('3200000000000000000000000000000')
console.log(datamatch.isBigInt(bigCount, { max: '3200000000000000000000000000000' })) // true
console.log(datamatch.isBigInt(bigCount, { max: '3199999999999999999999999999999' })) // false
```

[back to top](#table-of-contents)

## minLength
```js
console.log(datamatch.isNumber(9, { minLength: 1 })) // true
console.log(datamatch.isNumber(9, { minLength: 2 })) // false

console.log(datamatch.isBigIng(BigInt('12345'), { minLength: 5 })) // true
console.log(datamatch.isBigIng(BigInt('12345'), { minLength: 6 })) // false

console.log(datamatch.isString('Hello', { minLength: 5 })) // true
console.log(datamatch.isString('Hello', { minLength: 6 })) // false

console.log(datamatch.isArray([ 1, 2, 3, 4, 5 ], { minLength: 5 })) // true
console.log(datamatch.isArray([ 1, 2, 3, 4, 5 ], { minLength: 6 })) // false
```

[back to top](#table-of-contents)

## maxLength
```js
console.log(datamatch.isNumber(9, { maxLength: 1 })) // true
console.log(datamatch.isNumber(9, { maxLength: 0 })) // false

console.log(datamatch.isBigIng(BigInt('12345'), { maxLength: 5 })) // true
console.log(datamatch.isBigIng(BigInt('12345'), { maxLength: 4 })) // false

console.log(datamatch.isString('Hello', { maxLength: 5 })) // true
console.log(datamatch.isString('Hello', { maxLength: 4 })) // false

console.log(datamatch.isArray([ 1, 2, 3, 4, 5 ], { maxLength: 5 })) // true
console.log(datamatch.isArray([ 1, 2, 3, 4, 5 ], { maxLength: 4 })) // false
```

[back to top](#table-of-contents)

## values
```js
console.log(datamatch.isNumber(77, { values: [ 53, 77, 99 ] })) // true
console.log(datamatch.isNumber(77, { values: [ 53, 99 ] })) // false

console.log(datamatch.isBigIng(BigInt('77'), { values: [ BigInt('77'), BigInt('99') ] })) // true
console.log(datamatch.isBigIng(BigInt('77'), { values: [ BigInt('99') ] })) // false

console.log(datamatch.isString('Hello', { values: [ 'Hello', 'Bye' ] })) // true
console.log(datamatch.isString('Hello', { values: [ 'Bye' ] })) // false
```

[back to top](#table-of-contents)

## isDomain
```js
console.log(datamatch.isString('www.example.com', { isDomain: true })) // true
console.log(datamatch.isString('example.com', { isDomain: true })) // true
console.log(datamatch.isString('example@.com', { isDomain: true })) // false
```

[back to top](#table-of-contents)

## isUrl
```js
console.log(datamatch.isString('https://www.example.com', { isUrl: true })) // true
console.log(datamatch.isString('https://example.com', { isUrl: true })) // true
console.log(datamatch.isString('example.com', { isUrl: true })) // false
```

[back to top](#table-of-contents)

## isHTTPUrl
```js
console.log(datamatch.isString('http://www.example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('http://example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('https://example.com', { isHTTPUrl: true })) // false
```

[back to top](#table-of-contents)

## isHTTPSUrl
```js
console.log(datamatch.isString('https://www.example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('https://example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('http://example.com', { isHTTPUrl: true })) // false
```

[back to top](#table-of-contents)

## isWSUrl
```js
console.log(datamatch.isString('ws://www.example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('ws://example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('wss://example.com', { isHTTPUrl: true })) // false
```

[back to top](#table-of-contents)

## isWSSUrl
```js
console.log(datamatch.isString('wss://www.example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('wss://example.com', { isHTTPUrl: true })) // true
console.log(datamatch.isString('ws://example.com', { isHTTPUrl: true })) // false
```

[back to top](#table-of-contents)

## isIP
```js
console.log(datamatch.isString('192.168.0.1', { isIP: true })) // true
console.log(datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIP: true })) // true
console.log(datamatch.isString('192.168.0.256', { isIP: true })) // false
```

[back to top](#table-of-contents)

## isIPv4
```js
console.log(datamatch.isString('192.168.0.1', { isIPv4: true })) // true
console.log(datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIPv4: true })) // false
console.log(datamatch.isString('192.168.0.256', { isIPv4: true })) // false
```

[back to top](#table-of-contents)

## isIPv6
```js
console.log(datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIPv6: true })) // true
console.log(datamatch.isString('192.168.0.1', { isIPv6: true })) // false
console.log(datamatch.isString('192.168.0.256', { isIPv6: true })) // false
```

[back to top](#table-of-contents)

## isFloat
```js
console.log(datamatch.isNumber(0.34, { isFloat: true })) // true
console.log(datamatch.isNumber(2, { isFloat: true })) // false

// If string value is float, you can safely use 'parseFloat(value)' without fear of errors.
console.log(datamatch.isString('0.34', { isFloat: true })) // true
console.log(datamatch.isString('00.34', { isFloat: true })) // false
console.log(datamatch.isString('0,34', { isFloat: true })) // false
console.log(datamatch.isString('2', { isFloat: true })) // false
```

[back to top](#table-of-contents)

## isInt
```js
console.log(datamatch.isNumber(2, { isInt: true })) // true
console.log(datamatch.isNumber(0.34, { isInt: true })) // false

// If string value is int, you can safely use 'parseInt(value)' without fear of errors.
console.log(datamatch.isString('2', { isInt: true })) // true
console.log(datamatch.isString('02', { isInt: true })) // true
console.log(datamatch.isString('0.34', { isInt: true })) // false
console.log(datamatch.isString('0,34', { isInt: true })) // false
console.log(datamatch.isString('00.34', { isInt: true })) // false
```

[back to top](#table-of-contents)

## isNumeric
Contains 'isFloat' + 'isInt' logic.
```js
console.log(datamatch.isNumber(2, { isNumeric: true })) // true
console.log(datamatch.isNumber(0.34, { isNumeric: true })) // true
console.log(datamatch.isNumber(NaN, { isNumeric: true })) // false

console.log(datamatch.isString('2', { isNumeric: true })) // true
console.log(datamatch.isString('02', { isInt: true })) // true
console.log(datamatch.isString('0.34', { isInt: true })) // true
console.log(datamatch.isString('0,34', { isInt: true })) // false
console.log(datamatch.isString('00.34', { isInt: true })) // false
console.log(datamatch.isString('NaN', { isInt: true })) // false
```

[back to top](#table-of-contents)

# License

Datamatch is released under the [MIT License](https://github.com/fosper/datamatch/blob/main/LICENSE).

[back to top](#table-of-contents)