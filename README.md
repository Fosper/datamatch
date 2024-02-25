# Datamatch - Simple and Fast Data Validation for Node.js

MAJOR UPDATE v2

Datamatch is a user-friendly and easy-to-use JavaScript library for data validation without any dependencies. It allows you to validate input values against specific criteria and returns the validation result. This library is designed for use in Node.js projects. It is perfect for developers who need a fast and reliable way to validate data.

IMPORTANT: Data types and check options are updated every week. Contact issues to add custom data TYPES and OPTIONS.

## Table of Contents

- [Installation](#installation)
- [Update](#update)
- [Import](#import)
- [Usage](#usage)
    - [Example 1: Number validation](#example-1-number-validation)
    - [Example 2: Number validation with options](#example-2-number-validation-with-options)
    - [Example 3: Array validation](#example-3-array-validation)
    - [Example 4: Array validation with options](#example-4-array-validation-with-options)
    - [Example 5: Nested field validation](#example-5-nested-field-validation)
    - [Example 6: Nested field validation with options](#example-6-nested-field-validation-with-options)
    - [Example 7: AND logic](#example-7-and-logic)
    - [Example 8: OR logic](#example-8-or-logic)
- [Default NodeJS TYPES](#default-nodejs-types)
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
- [OPTIONS](#options)
    - [min](#min)
    - [max](#max)
    - [length](#length)
    - [minLength](#minlength)
    - [maxLength](#maxlength)
    - [values](#values)
    - [isDate](#isdate-option)
    - [isDomain](#isdomain)
    - [isUrl](#isurl)
    - [isHTTPUrl](#ishttpUrl)
    - [isHTTPSUrl](#ishttpsUrl)
    - [isWSUrl](#iswsUrl)
    - [isWSSUrl](#iswssUrl)
    - [isIP](#isip)
    - [isIPv4](#isipv4)
    - [isIPv6](#isipv6)
    - [isJSON](#isjson)
    - [isBase64](#isbase64)
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

# Update

Update Datamatch using npm:

```bash
npm install datamatch@latest
```

[back to top](#table-of-contents)

# Import

```js
import Datamatch from 'datamatch';
```
OR
```js
const Datamatch = require('datamatch');
```

[back to top](#table-of-contents)

# Usage

## Example 1: Number validation

```js
const penCount = 5;
console.log(Datamatch.isNumber(penCount)); // true
```

[back to top](#table-of-contents)

## Example 2: Number validation with options

```js
const penCount = 5;
console.log(Datamatch.isNumber(penCount, { max: 4 })); // false
```

[back to top](#table-of-contents)

## Example 3: Array validation

```js
const firends = [ `John`, `Katrin`, `Tom` ];
console.log(Datamatch.isArray(firends)); // true
```

[back to top](#table-of-contents)

## Example 4: Array validation with options

```js
const firends = [ `John`, `Katrin`, `Tom` ];
console.log(Datamatch.isArray(firends, { maxLength: 2 })); // false
```

[back to top](#table-of-contents)

## Example 5: Nested field validation

```js
const obj = {
    one: null,
    two: 55,
    three: { four: 'Hello' },
    five: { six: [ 'John', 'Katrin', 123 ] }
};

const run = Datamatch.init()
    .field('one').isNull()
    .field('two').isNumber()
    .field('three').isObject()
        .field('four').isString()
        .end()
    .field('five').isObject()
        .field('six').isArray().isString().isNumber().end()
        .end()
    .check(obj);

if (run.errors) {
    console.log(run.errors); // Shows all fields path and whats wrong.
} else {
    console.log(true);
}

// Returns: true
```

IMPORTANT: Always use '.end()' to close .isObject() and .isArray() constructions.

[back to top](#table-of-contents)

## Example 6: Nested field validation with options

```js
const obj = {
    one: null,
    two: 55,
    three: { four: 'Hello' },
    five: { six: [ 'John', 'Katrin', 123 ] }
};

const run = Datamatch.init()
    .field('one').isNull()
    .field('two').isNumber()
    .field('three').isObject()
        .field('four').isString()
        .end()
    .field('five').isObject()
        .field('six').isArray().isString().isNumber({ max: 122 }).end()
        .end()
    .check(obj);

if (run.errors) {
    console.log(run.errors); // Shows all fields path and whats wrong.
} else {
    console.log(true);
}

// Returns: [ "Array element in field 'five.six' must be less or equal than '122'. '123' given." ]
```

IMPORTANT: Always use '.end()' to close .isObject() and .isArray() constructions.

[back to top](#table-of-contents)

## Example 7: AND logic

OPTIONS always means AND logic

For example:

```js
const obj = {
    login: 'john',
};

const run = Datamatch.init()
    .field('login').isString({ minLength: 4, values: ['john', `alex`]})
    .check(obj);

if (run.errors) {
    console.log(run.errors); // Shows all fields path and whats wrong.
} else {
    console.log(true);
}

// Returns: true
```

Field 'login' must have minimum length 4, AND contain one of values 'john' / 'alex'.

[back to top](#table-of-contents)

## Example 8: OR logic

TYPES always means OR logic

For example:

```js
const obj = {
    login: 'john',
};

const run = Datamatch.init()
    .field('login').isString()
    .field('password').isUndefined().isString()
    .check(obj);

if (run.errors) {
    console.log(run.errors); // Shows all fields path and whats wrong.
} else {
    console.log(true);
}

// Returns: true
```

Field 'password' can be do not set, OR set as string.

[back to top](#table-of-contents)

# Default NodeJS types

## isUndefined
Available options: no.

[back to top](#table-of-contents)

## isNull
Available options: no.

[back to top](#table-of-contents)

## isBoolean
Available options: no.

[back to top](#table-of-contents)

## isNumber
Available options:  
[min](#min)  
[max](#max)  
[length](#length)  
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
[length](#length)  
[minLength](#minlength)  
[maxLength](#maxlength)  
[values](#values)  

[back to top](#table-of-contents)

## isString
Available options:  
[minLength](#length)  
[minLength](#minlength)  
[maxLength](#maxlength)  
[values](#values)  
[isDate](#isdate-option)  
[isDomain](#isdomain)  
[isUrl](#isurl)  
[isHTTPUrl](#ishttpUrl)  
[isHTTPSUrl](#ishttpsUrl)  
[isWSUrl](#iswsUrl)  
[isWSSUrl](#iswssUrl)  
[isIP](#isip)  
[isIPv4](#isipv4)  
[isIPv6](#isipv6)  
[isJSON](#isjson)  
[isBase64](#isbase64)  
[isFloat](#isfloat)  
[isInt](#isint)  
[isNumeric](#isnumeric)  

[back to top](#table-of-contents)

## isArray
Available options:  
[length](#length)  
[minLength](#minlength)  
[maxLength](#maxlength)  

[back to top](#table-of-contents)

## isObject
Available options: no.

[back to top](#table-of-contents)

## isFunction
Available options: no.

[back to top](#table-of-contents)

## isAsyncFunction
Available options: no.

[back to top](#table-of-contents)

## isPromise
Available options: no.

[back to top](#table-of-contents)

## isSymbol
Available options: no.

[back to top](#table-of-contents)

## isArrayBuffer
Available options: no.

[back to top](#table-of-contents)

## isSet
Available options: no.

[back to top](#table-of-contents)

## isMap
Available options: no.

[back to top](#table-of-contents)

## isDate
Available options: no.

[back to top](#table-of-contents)

## isRegExp
Available options: no.

[back to top](#table-of-contents)

## isDataView
Available options: no.

[back to top](#table-of-contents)

## isInt8Array
Available options: no.

[back to top](#table-of-contents)

## isInt16Array
Available options: no.

[back to top](#table-of-contents)

## isInt32Array
Available options: no.

[back to top](#table-of-contents)

## isUint8Array
Available options: no.

[back to top](#table-of-contents)

## isUint16Array
Available options: no.

[back to top](#table-of-contents)

## isUint32Array
Available options: no.

[back to top](#table-of-contents)

## isFloat32Array
Available options: no.

[back to top](#table-of-contents)

## isFloat64Array
Available options: no.

[back to top](#table-of-contents)

## isUint8ClampedArray
Available options: no.

[back to top](#table-of-contents)

## isSharedArrayBuffer
Available options: no.

[back to top](#table-of-contents)

# Options

## min
```js
console.log(Datamatch.isNumber(5, { min: 5 })); // true
console.log(Datamatch.isNumber(5, { min: 6 })); // false

const ants = BigInt('1000000000000000000000000000000');
console.log(Datamatch.isBigInt(big, { min: '1000000000000000000000000000000' })); // true
console.log(Datamatch.isBigInt(big, { min: '1000000000000000000000000000001' })); // false
```

[back to top](#table-of-contents)

## max
```js
console.log(Datamatch.isNumber(5, { max: 5 })); // true
console.log(Datamatch.isNumber(5, { max: 4 })); // false

const atoms = BigInt('3200000000000000000000000000000')
console.log(Datamatch.isBigInt(bigCount, { max: '3200000000000000000000000000000' })); // true
console.log(Datamatch.isBigInt(bigCount, { max: '3199999999999999999999999999999' })); // false
```

[back to top](#table-of-contents)

## length
```js
console.log(Datamatch.isNumber(9, { length: 1 })); // true
console.log(Datamatch.isNumber(9, { length: 2 })); // false

console.log(Datamatch.isBigInt(BigInt('12345'), { length: 5 })); // true
console.log(Datamatch.isBigInt(BigInt('12345'), { length: 4 })); // false

console.log(Datamatch.isString('Hello', { length: 5 })); // true
console.log(Datamatch.isString('Hello', { length: 4 })); // false
console.log(Datamatch.isString('Hello', { length: 6 })); // false

console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { length: 5 })); // true
console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { length: 4 })); // false
console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { length: 6 })); // false
```

## minLength
```js
console.log(Datamatch.isNumber(9, { minLength: 1 })); // true
console.log(Datamatch.isNumber(9, { minLength: 2 })); // false

console.log(Datamatch.isBigInt(BigInt('12345'), { minLength: 5 })); // true
console.log(Datamatch.isBigInt(BigInt('12345'), { minLength: 6 })); // false

console.log(Datamatch.isString('Hello', { minLength: 5 })); // true
console.log(Datamatch.isString('Hello', { minLength: 6 })); // false

console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { minLength: 5 })); // true
console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { minLength: 6 })); // false
```

[back to top](#table-of-contents)

## maxLength
```js
console.log(Datamatch.isNumber(9, { maxLength: 1 })); // true
console.log(Datamatch.isNumber(9, { maxLength: 0 })); // false

console.log(Datamatch.isBigInt(BigInt('12345'), { maxLength: 5 })); // true
console.log(Datamatch.isBigInt(BigInt('12345'), { maxLength: 4 })); // false

console.log(Datamatch.isString('Hello', { maxLength: 5 })); // true
console.log(Datamatch.isString('Hello', { maxLength: 4 })); // false

console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { maxLength: 5 })); // true
console.log(Datamatch.isArray([ 1, 2, 3, 4, 5 ], { maxLength: 4 })); // false
```

[back to top](#table-of-contents)

## values
```js
console.log(Datamatch.isNumber(77, { values: [ 53, 77, 99 ] })); // true
console.log(Datamatch.isNumber(77, { values: [ 53, 99 ] })); // false

console.log(Datamatch.isBigInt(BigInt('77'), { values: [ BigInt('77'), BigInt('99') ] })); // true
console.log(Datamatch.isBigInt(BigInt('77'), { values: [ BigInt('99') ] })); // false

console.log(Datamatch.isString('Hello', { values: [ 'Hello', 'Bye' ] })); // true
console.log(Datamatch.isString('Hello', { values: [ 'Bye' ] })); // false
```

[back to top](#table-of-contents)

## isDate (option)
If string value is date (true), you can safely use 'new Date(value)' without fear of errors.
```js
console.log(Datamatch.isString('Thu, 31 Oct 2024 07:28:00 GMT', { isDate: true })); // true
console.log(Datamatch.isString('Thu, 32 Oct 2024 07:28:00 GMT', { isDate: true })); // false
```

[back to top](#table-of-contents)

## isDomain
```js
console.log(Datamatch.isString('www.example.com', { isDomain: true })); // true
console.log(Datamatch.isString('example.com', { isDomain: true })); // true
console.log(Datamatch.isString('example@.com', { isDomain: true })); // false
```

[back to top](#table-of-contents)

## isUrl
If string value is url (true), you can safely use '...new URL(value)...' without fear of errors.
```js
console.log(Datamatch.isString('https://www.example.com', { isUrl: true })); // true
console.log(Datamatch.isString('https://example.com', { isUrl: true })); // true
console.log(Datamatch.isString('example.com', { isUrl: true })); // false
```

[back to top](#table-of-contents)

## isHTTPUrl
If string value is HTTP url (true), you can safely use '...new URL(value)...' without fear of errors.
```js
console.log(Datamatch.isString('http://www.example.com', { isHTTPUrl: true })); // true
console.log(Datamatch.isString('http://example.com', { isHTTPUrl: true })); // true
console.log(Datamatch.isString('https://example.com', { isHTTPUrl: true })); // false
```

[back to top](#table-of-contents)

## isHTTPSUrl
If string value is HTTPS url (true), you can safely use '...new URL(value)...' without fear of errors.
```js
console.log(Datamatch.isString('https://www.example.com', { isHTTPSUrl: true })); // true
console.log(Datamatch.isString('https://example.com', { isHTTPSUrl: true })); // true
console.log(Datamatch.isString('http://example.com', { isHTTPSUrl: true })); // false
```

[back to top](#table-of-contents)

## isWSUrl
If string value is WS url (true), you can safely use '...new URL(value)...' without fear of errors.
```js
console.log(Datamatch.isString('ws://www.example.com', { isWSUrl: true })); // true
console.log(Datamatch.isString('ws://example.com', { isWSUrl: true })); // true
console.log(Datamatch.isString('wss://example.com', { isWSUrl: true })); // false
```

[back to top](#table-of-contents)

## isWSSUrl
If string value is WSS url (true), you can safely use '...new URL(value)...' without fear of errors.
```js
console.log(Datamatch.isString('wss://www.example.com', { isWSSUrl: true })); // true
console.log(Datamatch.isString('wss://example.com', { isWSSUrl: true })); // true
console.log(Datamatch.isString('ws://example.com', { isWSSUrl: true })); // false
```

[back to top](#table-of-contents)

## isIP
```js
console.log(Datamatch.isString('192.168.0.1', { isIP: true })); // true
console.log(Datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIP: true })); // true
console.log(Datamatch.isString('192.168.0.256', { isIP: true })); // false
```

[back to top](#table-of-contents)

## isIPv4
```js
console.log(Datamatch.isString('192.168.0.1', { isIPv4: true })); // true
console.log(Datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIPv4: true })); // false
console.log(Datamatch.isString('192.168.0.256', { isIPv4: true })); // false
```

[back to top](#table-of-contents)

## isIPv6
```js
console.log(Datamatch.isString('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { isIPv6: true })); // true
console.log(Datamatch.isString('192.168.0.1', { isIPv6: true })); // false
console.log(Datamatch.isString('192.168.0.256', { isIPv6: true })); // false
```

[back to top](#table-of-contents)

## isJSON
```js
console.log(Datamatch.isString('{"login":"john"}', { isJSON: true })); // true
console.log(Datamatch.isString('{"login":"john', { isJSON: true })); // false
```

[back to top](#table-of-contents)

## isBase64
```js
console.log(Datamatch.isString('SGVsbG8=', { isBase64: true })); // true
console.log(Datamatch.isString('SGVs', { isBase64: true })); // false
```

[back to top](#table-of-contents)

## isFloat
If string value is float (true), you can safely use 'parseFloat(value)' without fear of errors.
```js
console.log(Datamatch.isNumber(0.34, { isFloat: true })); // true
console.log(Datamatch.isNumber(2, { isFloat: true })); // false

console.log(Datamatch.isString('0.34', { isFloat: true })); // true
console.log(Datamatch.isString('00.34', { isFloat: true })); // false
console.log(Datamatch.isString('0,34', { isFloat: true })); // false
console.log(Datamatch.isString('2', { isFloat: true })); // false
```

[back to top](#table-of-contents)

## isInt
If string value is int (true), you can safely use 'parseInt(value)' without fear of errors.
```js
console.log(Datamatch.isNumber(2, { isInt: true })); // true
console.log(Datamatch.isNumber(0.34, { isInt: true })); // false

console.log(Datamatch.isString('2', { isInt: true })); // true
console.log(Datamatch.isString('02', { isInt: true })); // true
console.log(Datamatch.isString('0.34', { isInt: true })); // false
console.log(Datamatch.isString('0,34', { isInt: true })); // false
console.log(Datamatch.isString('00.34', { isInt: true })); // false
```

[back to top](#table-of-contents)

## isNumeric
Contains 'isFloat' + 'isInt' logic.
```js
console.log(Datamatch.isNumber(2, { isNumeric: true })); // true
console.log(Datamatch.isNumber(0.34, { isNumeric: true })); // true
console.log(Datamatch.isNumber(NaN, { isNumeric: true })); // false

console.log(Datamatch.isString('2', { isNumeric: true })); // true
console.log(Datamatch.isString('02', { isNumeric: true })); // true
console.log(Datamatch.isString('0.34', { isNumeric: true })); // true
console.log(Datamatch.isString('0,34', { isNumeric: true })); // false
console.log(Datamatch.isString('00.34', { isNumeric: true })); // false
console.log(Datamatch.isString('NaN', { isNumeric: true })); // false
```

[back to top](#table-of-contents)

# License

Datamatch is released under the [MIT License](https://github.com/fosper/datamatch/blob/main/LICENSE).

[back to top](#table-of-contents)