
let Fuzzy = window.Fuzzy || {}

Fuzzy = {
    Set : require('./src/set'),
    And : require('./src/and'),
    Or  : require('./src/or'),
    Inference : require('./src/inference')

}

window.Fuzzy = Fuzzy