//--------------------------------------------------------------------------------

exports.solve = function (fileName) {
  var propsat = require('propsat')
  let formula = propsat.readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result
}

//--------------------------------------------------------------------------------

function nextAssignment(currentAssignment) {
  var newAssignment
  if (!currentAssignment[0]) {
    newAssignment = change(currentAssignment, 1).array
  } else {
    newAssignment = reset(currentAssignment)
  }
  return newAssignment
}

function change(array, pos) {
  var aux = false
  var k = 0
  for (var i = pos; i < array.length; i++) {
    if (array[i]) {
      array[i] = false
      k = i - 1
      array[k] = true
      aux = true
      i = array.length
    }
  }
  if (!aux) {
    k = array.length - 1
    array[k] = true
  }
  var res = { array, k }
  return res
}

function reset(array) {
  var aux
  var k
  var set
  var aux2 = false
  for (var i = 0; i < array.length; i++) {
    if (!array[i]) {
      aux = change(array, i)
      array = aux.array
      k = aux.k
      set = i
      aux2 = true
      i = array.length
    }
  }
  if (aux2) {
    for (var i = k - 1; i >= 0; i--) {
      if (set > 0) {
        array[i] = true
        set = set - 1
      } else {
        array[i] = false
      }
    }
  } else {
    for (var i = 0; i < array.length; i++) {
      array[i] = false
    }
  }
  return array
}

//--------------------------------------------------------------------------------

function doSolve(clauses, assignment) {
  let isSat = false
  x = Math.pow(2, assignment.length)
  while ((!isSat) && (x > 0)) {
    var final = []
    var have = true
    for (var i = 0; i < clauses.length; i++) {
      for (var c = 0; c < clauses[i].length; c++) {
        var aux
        var not = false
        x = Number(clauses[i][c])
        if (x < 0) {
          not = true
          x = x * (-1)
        }
        x--
        aux = assignment[x]
        if (aux) {
          if (not) {
            final[i] = false
          } else {
            final[i] = true
            c = clauses[i].length
          }
        } else {
          if (not) {
            final[i] = true
            c = clauses[i].length
          } else {
            final[i] = false
          }
        }
      }
      if (!final[i]) {
        have = false
        i = clauses.length
      }
    }
    if (have) {
      isSat = true
    } else {
      x--
      assignment = nextAssignment(assignment)
    }
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
  let text = fileName.split('\r\n')

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

  var aux = []

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