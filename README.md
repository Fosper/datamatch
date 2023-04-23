# Datamatch - Simple and Fast Data Validation for Node.js
Datamatch is a user-friendly and easy-to-use JavaScript library for data validation without any dependencies. It allows you to validate input values against specific criteria and returns the validation result. This library is designed for use in Node.js projects and is perfect for developers who need a fast and reliable way to validate data.

Important: Data types and check options are updated every week. Contact issues to add custom data types and options.

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
- [Custom library types](#custom-library-types)
    - [isFloat](#isfloat)
    - [isInteger](#isinteger)
    - [isNumeric](#isnumeric)
- [Options](#options)
    - [min](#min)
    - [minLength](#minlength)
- [License](#license)

# Installation

Install Datamatch using npm:

```bash
npm install --save datamatch
```

# Import

```js
import datamatch from 'datamatch';
```
OR
```js
const datamatch = require('datamatch');
```

# Usage

## Example 1: Number validation

```js
let penCount = 5
datamatch.isNumber(penCount) ? console.log(true) : console.log(false)
```

Returns:
```js
true
```

## Example 2: Array validation

```js
let firends = [ `John`, `Katrin`, `Tom` ]
datamatch.isArray(firends) ? console.log(true) : console.log(false)
```

Returns:
```js
true
```

## Example 3: Nested field validation

```js
let obj = {
    one: null,
    two: 55,
    three: { four: `Hello` },
    five: { six: [ `John`, `Katrin` ] }
}

const dm = datamatch.init()
    .field(`one`).isNull()
    .field(`two`).isNumber({ min: 55 })
    .field(`three`).field(`four`).isString({ minLength: 5 }).end()
    .field(`five`).field(`six`).isArray()
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

# Default NodeJS types

## isUndefined
Available options: todo.

## isNull
Available options: todo.

## isBoolean
Available options: todo.

## isNumber
Available options:
[min](#min)

## isBigInt
Available options: todo.

## isString
Available options:
[minLength](#minlength)

## isArray
Available options: todo.

## isObject
Available options: todo.

## isFunction
Available options: todo.

## isAsyncFunction
Available options: todo.

## isPromise
Available options: todo.

## isSymbol
Available options: todo.

## isArrayBuffer
Available options: todo.

## isSet
Available options: todo.

## isMap
Available options: todo.

## isDate
Available options: todo.

## isRegExp
Available options: todo.

## isDataView
Available options: todo.

## isInt8Array
Available options: todo.

## isInt16Array
Available options: todo.

## isInt32Array
Available options: todo.

## isUint8Array
Available options: todo.

## isUint16Array
Available options: todo.

## isUint32Array
Available options: todo.

## isFloat32Array
Available options: todo.

## isFloat64Array
Available options: todo.

## isUint8ClampedArray
Available options: todo.

## isSharedArrayBuffer
Available options: todo.

# Custom library types

## isFloat
Available options: todo.

## isInteger
Available options: todo.

## isNumeric
Available options: todo.

# Options

## min
Value types:
Number - For Number comparison
String - For BigInt comparison (todo)

## minLength
Value types:
Number

# License

Datamatch is released under the [MIT License](https://github.com/fosper/datamatch/blob/main/LICENSE).