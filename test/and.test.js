let And = require('../src/and')
let Set = require('../src/set')
const set1 = new Set([-1,0], [0,1], [1,0])
const set2 = new Set([0,0], [1,1], [2,0])

describe('And', ()=>{
    it("exists", ()=>{
        expect(And)
    })

    it('requires two sets as input',()=>{
        expect(And).toThrowError()

        const f = ()=>{
            And(set1, set2)
        }
        expect(f).not.toThrowError()
    })


    it('returns a Set', ()=>{
        const r = And(set1, set2, And.T_NORMS.GODEL)
        expect(r).toBeInstanceOf(Set)
    })

})