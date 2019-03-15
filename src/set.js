/**
 * Define Fuzzy sets via membership functions, can also graph them on the command line for fun.
 */

class Set{
    constructor(...points){
        if (points.length < 3 || points.length > 4){
            throw new RangeError('A set requires between 3 and 4 points.');
        }
        this.array = points;
        this.type = points.length 
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