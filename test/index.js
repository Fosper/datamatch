import datamatch from './../index'

/**
 * Example-1 for 'npm run test':
 */

let penCount = 5 // Replace '5' to 'null' to get 'false'.
datamatch.isNumber(penCount, { min: 5 }) ? console.log(true) : console.log(false)

/**
 * Example-2 for 'npm run test':
 */

let firends = [ `John`, `Katrin`, `Tom` ] // Replace '[ `John`, `Katrin`, `Tom` ]' to '123' to get 'false'.
datamatch.isArray(firends) ? console.log(true) : console.log(false)


/**
 * Example-3 for 'npm run test':
 */

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