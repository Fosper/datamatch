# Datamatch - Simple and Fast Data Validation for Node.js
Datamatch is a user-friendly and easy-to-use JavaScript library for data validation without any dependencies. It allows you to validate input values against specific criteria and returns the validation result. This library is designed for use in Node.js projects and is perfect for developers who need a fast and reliable way to validate data.

## Table of Contents

- [Installation](#installation)
- [Import](#import)
- [Usage](#usage)
    - [Example 1: Number validation](#example-1-number-validation)
    - [Example 2: Array validation](#example-2-array-validation)
    - [Example 3: Nested field validation](#example-3-nested-field-validation)
- [Default NodeJS types](#default-nodejs-types)
    - [isUndefined](#datamatchisundefined)
    - [isNull](#datamatchisnull)
    - [isBoolean](#datamatchisboolean)
    - [isNumber](#datamatchisnumber)
    - [isBigInt](#datamatchisbigint)
    - [isString](#datamatchisstring)
    - [isArray](#datamatchisarray)
    - [isObject](#datamatchisobject)
    - [isFunction](#datamatchisfunction)
    - [isAsyncFunction](#datamatchisasyncfunction)
    - [isPromise](#datamatchispromise)
    - [isSymbol](#datamatchissymbol)
    - [isArrayBuffer](#datamatchisarraybuffer)
    - [isSet](#datamatchisset)
    - [isMap](#datamatchismap)
    - [isDate](#datamatchisdate)
    - [isRegExp](#datamatchisregexp)
    - [isDataView](#datamatchisdataview)
    - [isInt8Array](#datamatchisint8array)
    - [isInt16Array](#datamatchisint16array)
    - [isInt32Array](#datamatchisint32array)
    - [isUint8Array](#datamatchisuint8array)
    - [isUint16Array](#datamatchisuint16array)
    - [isUint32Array](#datamatchisuint32array)
    - [isFloat32Array](#datamatchisfloat32array)
    - [isFloat64Array](#datamatchisfloat64array)
    - [isUint8ClampedArray](#datamatchisuint8clampedarray)
    - [isSharedArrayBuffer](#datamatchissharedarraybuffer)
- [Custom library types](#custom-library-types)
    - [isFloat](#datamatchisfloat)
    - [isInteger](#datamatchisinteger)
    - [isNumeric](#datamatchisnumeric)
- [Options](#options)
    - [min](#datamatchmin)
    - [minLength](#datamatchminlength)
- [License](#license)

## Installation

Install Datamatch using npm:

```bash
npm install --save datamatch
```

## Import

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

## License

Datamatch is released under the [MIT License](https://github.com/fosper/datamatch/blob/main/LICENSE).