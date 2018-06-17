/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */
exports.solve = function (fileName) {
  let formula = propsat.readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment) {
  // implement here the code to produce the next assignment based on currentAssignment. 
  return newAssignment
}

function doSolve(clauses, assignment) {
  let isSat = false
  while ((!isSat) && /* must check whether this is the last assignment or not*/) {
    // does this assignment satisfy the formula? If so, make isSat true. 

    // if not, get the next assignment and try again. 
    assignment = nextAssignment(assignment)
  }
  let result = { 'isSat': isSat, satisfyingAssignment: null }
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}

//--------------------------------------------------------------------------------

function readFormula(fileName) {

  var fs = require('fs')
  var file = fs.readFileSync(fileName)
  let text = file.split('\r\n')

  let clauses = readClauses(text)
  let variables = readVariables(clauses)
  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
}

function readClauses(text) {
  var aux = ''

  for (i = 0; i < text.length; i++) {
    if ((text[i].charAt(0) != 'c') && (text[i].charAt(0) != 'p')) {
      aux += text[i]
    }
  }

  aux = aux.substring(0, aux.length - 2)

  aux = aux.split(' 0')

  for (i = 0; i < aux.length; i++) {
    aux[i] = aux[i].split(' ')
  }

  return aux
}

function readVariables(clauses) {
  var x = []

  var aux

  for (i = 0; i < clauses.length; i++) {
    for (j = 0; j < clauses[i].length; j++) {
      aux = clauses[i][j]
      if (aux < 0) {
        aux = aux * (-1)
      }
      x[aux - 1] = false
    }
  }

  return x
}

function checkProblemSpecification(text, clauses, variables) {
  var check = true

  var aux

  for (i = 0; i < text.length; i++) {
    if (text[i].charAt(0) == 'p') {
      aux = text[i].split(' ')
    }
  }

  if (aux[2] != variables.length) {
    check = false
  }

  if (aux[3] != clauses.length) {
    check = false
  }

  return check
}

//--------------------------------------------------------------------------------