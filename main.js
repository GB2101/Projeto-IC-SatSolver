var sat = require('./satSolver.js')

var result = sat.solve('files/simple1.cnf')

console.log(result.isSat)
console.log(result.satisfyingAssignment)