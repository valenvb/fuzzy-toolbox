let Set = require('../src/set.js');

describe('A set', ()=>{
    it('exists', ()=>{
        expect(Set)
    })

    it('is a function', ()=>{
        expect(typeof Set).toBe("function")
    })

    it('requires at least 2 parameters',()=>{
        expect(()=>{new Set()}).toThrowError(); //no params

        const oneParam = ()=>{
            new Set(1)
        } 
        expect(oneParam).toThrowError();

        const twoParam = ()=>{
            new Set(1,2)
        }
        expect(twoParam).not.toThrowError()
    })

    it('takes at most 4 parameters',()=>{
        const threeParam = ()=>{
            new Set(1,2,3)
        }
        expect(threeParam).not.toThrowError()

        const fourParam = ()=>{
            new Set(1,2,3,4)
        }
        expect(fourParam).not.toThrowError()

        const fiveParam = ()=>{
            new Set(1,2,3,4,5)
        }
        expect(fiveParam).toThrowError()
    })

    it('has a minimum value', ()=>{
        //setup:
        s = new Set(1,2)
        expect(s.min()).toBe(1)
    })

    it('has a maximum value', ()=>{
        //setup:
        s = new Set(1,2)
        expect(s.max()).toBe(2)
    })


})