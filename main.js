var sat = require('./satSolver.js')

var name = 'simple0'

var result = sat.solve(name)

console.log(result.isSat)
console.log(result.satisfyingAssignment)