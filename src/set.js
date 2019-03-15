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
        return this.array[0][0]
    }

    max(){
        return this.array[this.array.length-1][0]
    }

    balance(){
        if(this.type===3){
            return this._balance_triangle()
        } else {
            return this._balance_trapezoid()
        }
    }

    _balance_triangle(){
        const xs = this.array.map(x=>x[0])
        return xs.reduce((p,c)=>c+p)/3
    }

    _balance_trapezoid(){
        const top = this.array[2][0] - this.array[1][0]
        const c = this.array[1][0] - this.array[0][0]
        const base = this.array[3][0] - this.array[0][0]

        const num = 2*top*c + top**2 + c*base + top*base + base**2
        const denom = 3*(top+base)
        return num/denom + this.array[0][0]

    }

}


module.exports = Set