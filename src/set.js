/**
 * Define Fuzzy sets via membership functions, can also graph them on the command line for fun.
 */

class Set{
    constructor(...points){
        if (points.length < 2 || points.length > 4){
            throw new RangeError('A set requires between 2 and 4 ');
        }
        this.array = points;
        return true;
    }

    min(){
        return this.array[0]
    }

    max(){
        return this.array[this.array.length-1]
    }
}


module.exports = Set