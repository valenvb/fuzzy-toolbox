/**
 * Define Fuzzy sets via membership functions, can also graph them on the command line for fun.
 */

class Set{
    /**
     * 
     * @param  {...number} points 
     */
    constructor(...points){
        if(points.length === 1){
            if(points[0].length >= 3){
                points = points[0]
            }
        }
        if (points.length < 3 || points.length > 4){
            throw new RangeError('A set requires between 3 and 4 points.');
        }
        this.array = points;
        this.type = points.length 
        return true;
    }

    /**
     * The x value of the left leg
     * @returns {number}
     */
    min(){
        return this.array[0][0]
    }

    /**
     * The x value of the right leg
     * @returns {number}
     */
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

    } //end _balance_trapezoid

    /**
     * Returns the membership in the fuzzy set of a given point
     * @param {number} point
     * @returns {number}
     */
    valueAt(point){
        if (point < this.min() || point > this.max()){
            return 0;
        }

        let atPoint = this.array.filter(e=>e[0]===point).map(e=>e[1])
        console.log(this.array)
        console.log(atPoint)

        if(atPoint.length > 0){
            let maxAtPoint = atPoint.reduce((p,c)=>(c > p ? c : p))
            return maxAtPoint;
        }
 
        if(this.type === 3){
            //Triangle
            if(point === this.array[1][0]) return this.array[1][1];


            let m;

            if(point < this.array[1][0]){
                //calc for left leg
                m = (this.array[1][1] - this.array[0][1])/(this.array[1][0] - this.array[0][0])
                
                

            } else {
                //calc for right leg
                m = (this.array[2][1] - this.array[1][1])/(this.array[2][0] - this.array[1][0])
            }

            let y = m*(point - this.array[1][0])+this.array[1][1]

            return y

        } else if (this.type===4){
            if(point >= this.array[1][0] && point <= this.array[2][0]) { return this.array[1][1] }

            if(point < this.array[1][0]){
                //left leg

                let m = (this.array[1][1] - this.array[0][1])/(this.array[1][0] - this.array[0][0])

                let y = m*(point - this.array[1][0])+this.array[1][1]

                return y

            } else if(point > this.array[2][0]){
                // right leg
                let m = (this.array[3][1] - this.array[2][1])/(this.array[3][0] - this.array[2][0])

                let y = m*(point - this.array[3][0])+this.array[3][1]

                return y

            }

        }
    } //end valueAt

    /**
     * Copy this set to a new set where the maximum membership is capped at newMax
     * @param {number} newMax 
     * @returns {Set} A new Set that maxes out at the desired value
     */
    capAt(newMax){
        if(newMax >= this.array[1][1]) {
            return new Set(this.array)
        }

        let newPoints = [ this.array[0] ]

        //calculate new left leg top

        //is it vertical?
        if(this.array[0][0] === this.array[1][0]){
            newPoints.push( [ this.array[1][0], newMax ] )
        } else {
            let y = newMax
            let leftSlope = (this.array[1][1] - this.array[0][1]) / (this.array[1][0] - this.array[0][0])
            let x = ( (y-this.array[0][1]) / leftSlope ) + this.array[0][0] 
            newPoints.push([x,y])
        }

        //calculate new right leg top
        
        //is is vertical?
        if(this.array[this.type-1][0] === this.array[this.type-2][0]){
            newPoints.push( [ this.array[this.type-2][0] , newMax] )
        } else {
            let y = newMax
            let rightSlope = (this.array[this.type-1][1] - this.array[this.type-2][1]) / (this.array[this.type-1][0] - this.array[this.type-2][0])
            let x = ( (y-this.array[this.type-2][1]) / rightSlope ) + this.array[this.type-2][0] 
            newPoints.push([x,y])
        }
        newPoints.push( this.array[this.type -1] )

        return new Set(newPoints)
    }
}


module.exports = Set