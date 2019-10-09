
class Inference {
    constructor( antecedent, consequent, operator){
        this.antecedent = antecedent
        this.consequent = consequent
        this.op = operator || "cap"
    }

    /**
     * 
     * @param {string} newOp new implication operator function
     */
    setOperator(newOp){
        this.op = newOp
        return this
    }

    resolveInput(state){
        let top = this.antecedent.resolveState(state)
        if(this.op === "cap"){
            return this.consequent.capAt(top)
        } else if(this.op === "scale"){
            throw Error("Not Yet Implemented")
        }
    }
}

class Antecedent {
    /**
     * Create an Antecedent object
     * @param {Set[]|Antecedent[]} sets An array of either other Antecedents or Sets (or a mix)
     * @param {function} operator function by which the Antecedents are combined
     */
    constructor(sets, operator){
        this.op = operator || function(a){return a};
        if(!sets.hasOwnProperty("length")){
            sets = [sets]
        }
        this.sets = sets
    }

    /**
     * Change the operator for this antecedent, and optionally all sub-antecedents
     * @param {function} newOp 
     * @param {boolean} recursive
     * @returns {Antecedent}
     */
    setOperator(newOp, recursive){
        recursive = recursive || false
        this.op = newOp;
        this.sets = this.sets.map(set=>{
            if(typeof(set) == Antecedent){
                return set.setOperator(newOp, recursive)
            } else {
                return set
            }
        })

        return this
        
    }

    /**
     * Resolve the state of an Antecedent
     * @param {Object} inputState An object with name->value mappings of the system state to resolve the antecedent against
     * @returns {number}
     */
    resolveState(inputState){
        let resolvedSet = this.sets.map((set)=>{
            if(typeof(set) == Antecedent){
                return set.resolveState(inputState)
            } else {
                return set.valueAt(inputState[set.name])
            }
        })

        return resolvedSet.reduce((p,c)=>this.op(p,c))

    }

}

function defuzz(...sets){
    if(sets.length == 1 && sets[0].length >= 1){
        sets = sets[0]
    }

    let values = sets.map(set=>{
        //console.log(elm)
        return set.balance()
    })
        

    let weightedAvg = values.map(elm=>elm[0]*elm[1]).reduce((p,c)=>p+c)
    let weights = values.map(elm=>elm[1]).reduce((p,c)=>p+c)
    return weightedAvg / weights
}


module.exports = { Antecedent, Inference, defuzz };
