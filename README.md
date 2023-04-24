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
let penCount = 5
datamatch.isNumber(penCount, { min: 5 }) ? console.log(true) : console.log(false)
```

Returns:
```js
true
```

[back to top](#table-of-contents)

## Example 2: Array validation

```js
let firends = [ 'John', 'Katrin', 'Tom' ]
datamatch.isArray(firends) ? console.log(true) : console.log(false)
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

[back to top](#table-of-contents)

## isBigInt
Available options: todo.

[back to top](#table-of-contents)

## isString
Available options:  
[minLength](#minlength)

[back to top](#table-of-contents)

## isArray
Available options: todo.

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

## isInteger
Available options: todo.

[back to top](#table-of-contents)

## isNumeric
Available options: todo.

[back to top](#table-of-contents)

# Options

## min
Value types:  
Number - For Number comparison  
String - For BigInt comparison (todo)

[back to top](#table-of-contents)

## minLength
Value types:  
Number

[back to top](#table-of-contents)

# License

Datamatch is released under the [MIT License](https://github.com/fosper/datamatch/blob/main/LICENSE).

[back to top](#table-of-contents)