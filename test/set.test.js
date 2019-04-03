let Set = require('../src/set.js');

describe('A set', ()=>{
    it('exists', ()=>{
        expect(Set)
    })

    it('is a function', ()=>{
        expect(typeof Set).toBe("function")
    })

    it('requires at least 3 parameters',()=>{
        expect(()=>{new Set()}).toThrowError(); //no params

        const oneParam = ()=>{
            new Set("test",[0,1])
        } 
        expect(oneParam).toThrowError();

        const twoParam = ()=>{
            new Set("test",[0,-1], [1,0])
        }
        expect(twoParam).toThrowError()

        const threeParam = ()=>{
            new Set("test",[0,-1], [1,0], [0,1])
        }
        expect(threeParam).not.toThrowError()
   
    })

    it('takes at most 4 parameters',()=>{
        const threeParam = ()=>{
            new Set("test",[0,-1], [1,0], [0,1])
        }
        expect(threeParam).not.toThrowError()

        const fourParam = ()=>{
            new Set("test",[0,-1], [1,0], [1,1], [0,2])
        }
        expect(fourParam).not.toThrowError()

        const fiveParam = ()=>{
            new Set("test",[0,-1], [1,0], [1,1], [0,2],[0,5])
        }
        expect(fiveParam).toThrowError()
    })

    it('has a name',()=>{
        const s = new Set("test",[-1,0], [0,1], [1,0])
        expect(s.name).toBe("test")
    })

    it('has a minimum value', ()=>{
        //setup:
        const s = new Set("test",[-1,0], [0,1], [1,0])
        expect(s.min()).toBe(-1)
    })

    it('has a maximum value', ()=>{
        //setup:
        const s = new Set("test",[-1,0], [0,1], [1,0])
        expect(s.max()).toBe(1)
    })

    it('has a center of gravity', ()=>{
        //Setup:
        const s = new Set("test",[-1,0], [0,1], [1,0])
        expect(s.balance()[0]).toEqual(0)

        const s2 = new Set("test",[-1,0],[-1,1],[1,1],[1,0])
        expect(s2.balance()[0]).toEqual(0)
        
        const s3 = new Set("test",[-2,0],[-2,1],[2,1],[2,0])
        expect(s3.balance()[0]).toEqual(0)
        
        const s4 = new Set("test",[-3,0],[-2,1],[2,1],[3,0])
        expect(s4.balance()[0]).toEqual(0)
        
        const s5 = new Set("test",[-3,0],[-2,1],[2,1],[2,0])
        expect(s5.balance()[0]).toBeLessThan(0)
    })

    it('provides the y value for a given x', ()=>{
        expect(Set.valueAt)
        
        const s = new Set("test",[-1,0], [0,1], [1,0])
        expect(s.valueAt(-10)).toBe(0)
        expect(s.valueAt(-1)).toBe(0)
        expect(s.valueAt(-0.5)).toBeGreaterThan(0)
        expect(s.valueAt(-0.5)).toBeLessThan(1)
        expect(s.valueAt(0.5)).toBeGreaterThan(0)
        expect(s.valueAt(0.5)).toBeLessThan(1)
        expect(s.valueAt(0)).toBe(1)
        expect(s.valueAt(1)).toBe(0)
        expect(s.valueAt(10)).toBe(0)

        const s2 = new Set("test",[-1,0],[-1,1],[1,1],[1,0])
        expect(s2.valueAt(-10)).toBe(0)
        expect(s2.valueAt(-1)).toBe(1)
        expect(s2.valueAt(0)).toBe(1)
        expect(s2.valueAt(1)).toBe(1)
        expect(s2.valueAt(10)).toBe(0)

        const s3 = new Set("test",[-3,0],[-2,1],[2,1],[3,0])
        expect(s3.valueAt(-10)).toBe(0)
        expect(s3.valueAt(-3)).toBe(0)
        expect(s3.valueAt(-2)).toBe(1)

        expect(s3.valueAt(-2.5)).toBeGreaterThan(0)
        expect(s3.valueAt(-1)).toBe(1)
        
        expect(s3.valueAt(0)).toBe(1)
        
        expect(s3.valueAt(1)).toBe(1)
        expect(s3.valueAt(2)).toBe(1)
        expect(s3.valueAt(2.5)).toBeGreaterThan(0)
        expect(s3.valueAt(3)).toBe(0)
        
        expect(s3.valueAt(10)).toBe(0)

    })

    it('can be capped at a given value', ()=>{
        expect(Set.capAt)
        const s = new Set("test",[-1,0], [0,1], [1,0])

        const r = s.capAt(0.5)
        expect(r.type).toBe(4)
        expect(r.array).toEqual([ [-1,0], [-0.5, 0.5] , [0.5,0.5], [1,0] ])

        const s2 = new Set("test",[-2,0], [-1,1], [1,1], [2,0])

        const r2 = s2.capAt(0.5)
        expect(r2.type).toBe(4)
        expect(r2.array).toEqual([ [-2,0], [-1.5, 0.5] , [1.5,0.5], [2,0] ])
    })

})