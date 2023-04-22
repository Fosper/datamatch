import datamatch from './../index'

/**
 * Example-1 for 'npm run test':
 */

let func1 = (penCount) => {
    let result = true
    if (!datamatch.isNumber(penCount, { min: 5 })) result = false
    console.log(result)
    return result
}

let penCount = 5 // Replace '5' to '4' for understanding how it works.

func1(penCount)


/**
 * Example-2 for 'npm run test':
 */

let func2 = (options = {}) => {
    let result = true
    let dm = datamatch.init()
        .field(`two`).isNumber({ min: 55 })
        .field(`three`).field(`four`).isString({ minLength: 5 }).end()
        .field(`five`).field(`six`).isNull()
        .check(options)
    if (!dm.data) { console.log(dm.errors); result = false }
    console.log(result)
    return result
}

let options2 = {
    one: null, // Replace 'null' to '123' for understanding how it works.
    two: 55,
    three: { four: `Hello` },
    five: { six: null }
}

func2(options2)