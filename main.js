var sat = require('./satSolver.js')

var name = fileName()

var result = sat.solve(name)

console.log(result.isSat)
console.log(result.satisfyingAssignment)

function fileName(){
    var fs = require('fs')
    var name = fs.readFileSync('entrada', 'utf8')
    name = name.split('\r\n')
    name = name[3].split(' ')
    var x = name.length - 1
    name = name[x]
    name = 'files/'+ name +'.cnf'
    return name
}