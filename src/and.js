'use strict';
let Set = require('./set')

/**
 * 
 * @param {Set} a 
 * @param {Set} b 
 * @param {And.T_NORMS} tnorm 
 */
function And(a, b, tnorm){
    if(!(a instanceof Set) || !(b instanceof Set)){
        throw Error("Inputs must both be Fuzzy Sets")
    }

    return a   
}


And.T_NORMS = {
    GODEL : 0,
    // goguen  : 1,
    // lukachevicz : 2,
    // hamacles : 3,
    // eintstein : 4,
    // nilpotent : 5,
    // drastic : 6,
}


module.exports = And