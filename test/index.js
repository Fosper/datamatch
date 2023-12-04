import datamatch from './../index'

/**
 * Example-1 for 'npm run test':
 */

const penCount = 5;
console.log(datamatch.isNumber(penCount, { min: 5 })); // true


/**
 * Example-2 for 'npm run test':
 */

const firends = [ 'John', 'Katrin', 'Tom' ];
console.log(datamatch.isArray(firends)); // true


/**
 * Example-3 for 'npm run test':
 */

const obj = {
    one: null,
    two: 55,
    three: { four: 'Hello' },
    five: { six: [ 'John', 'Katrin' ] }
};

const dm = datamatch.init()
    .field('one').isNull()
    .field('two').isNumber({ min: 55 })
    .field('three').field('four').isString({ minLength: 5 }).end()
    .field('five').field('six').isArray()
    .check(obj);

if (dm.errors) {
    console.log(dm.errors); // Shows all fields path and whats wrong.
    console.log(false);
} else {
    console.log(true);
}

// Returns: true


/**
 * Example-4 for 'npm run test':
 */

 const getTrueOrFalse = () => { return Math.random() >= 0.5 };
 const getMD5 = () => { return '191c7d10892d7377d0ca306bc8a96c8b' };
 const getSHA256 = () => { return 'd1af65ff329128e24de02418050fc8afca2a626f9f417424aecc5890a6a8f0f5' };
 
 const obj2 = {
     hash: getTrueOrFalse() ? getMD5() : getSHA256()
 };
 
 const dm2 = datamatch.init()
     .field('hash').isString({ length: 32, isDomain: false }).isString({ length: 64 })
     .check(obj2);
 
 if (dm2.errors) {
     console.log(dm2.errors); // Shows all fields path and whats wrong.
     console.log(false);
 } else {
     console.log(true);
 }
 
 // Returns: true


 /**
 * Example-5 for 'npm run test':
 */

const obj3 = {
    one: '192.168.1.1',
};

const dm3 = datamatch.init()
    .field('one').isString().isIP()
    .check(obj3);

if (dm3.errors) {
    console.log(dm3.errors);
    console.log(false);
} else {
    console.log(true);
}