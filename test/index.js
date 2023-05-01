import datamatch from './../index'

/**
 * Example-1 for 'npm run test':
 */

const penCount = 5
console.log(datamatch.isNumber(penCount, { min: 5 })) // true


/**
 * Example-2 for 'npm run test':
 */

const firends = [ `John`, `Katrin`, `Tom` ]
console.log(datamatch.isArray(firends)) // true


/**
 * Example-3 for 'npm run test':
 */

const obj = {
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