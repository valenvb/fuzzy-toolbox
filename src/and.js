'use strict';

const And = {
    godel : function(a, b){
        return a<b? a : b; //min
    },
    goguen : function(a, b){
        return a*b
    },
    luka : function(a, b){
        let c = a+b -1
        return c>0? c : 0;
    },
    hamaches : function(a, b){
        if(a===0 && b === 0) return 0;
        return (a*b) / ( (a+b) - (a*b) )
    },
    einstein : function(a, b){
        return (a*b) / ( 2 - ( (a+b) - (a*b) ) )
    },
    nilpotent : function(a, b){
        if(a+b > 1){
            return a<b?a:b
        } else return 0
    },
    drastic : function(a, b){
        if(a==1 || b==1){
            return a<b? a : b
        }else return 0
    }

}


module.exports = And