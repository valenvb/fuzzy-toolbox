let And = require('../src/and')
let Set = require('../src/set')
const set1 = new Set("test1", [-1,0], [0,1], [1,0])
const set2 = new Set("test2", [0,0], [1,1], [2,0])

describe('And', ()=>{
    it("exists", ()=>{
        expect(And)
    })

    it('is an object with methods', ()=>{
        expect(And.drastic).toBeInstanceOf(Function);
        expect(And.einstein).toBeInstanceOf(Function);
        expect(And.godel).toBeInstanceOf(Function);
        expect(And.goguen).toBeInstanceOf(Function);
        expect(And.hamaches).toBeInstanceOf(Function);
        expect(And.luka).toBeInstanceOf(Function);
        expect(And.nilpotent).toBeInstanceOf(Function);

    })


})