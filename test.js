var fs = require('fs')
var x = 'simple0'
var k = 'files/'+ x +'.cnf'
var contents = fs.readFileSync(k, 'utf8')
var text = contents.split('\r\n')

var clauses = ''

for (var i = 0; i < text.length; i++) {
    if ((text[i].charAt(0) != 'c') && (text[i].charAt(0) != 'p')) {
        clauses += text[i]
    }
}

clauses = clauses.substring(0, clauses.length - 2)

clauses = clauses.split(' 0')

for (var i = 0; i < clauses.length; i++) {
    clauses[i] = clauses[i].split(' ')
}

var clauses;

console.log(clauses)

//--------------------------------------------------------------------------------

var variables = []

var aux

for (var i = 0; i < clauses.length; i++) {
    for (var j = 0; j < clauses[i].length; j++) {
        aux = clauses[i][j]
        if (aux < 0) {
            aux = aux * (-1)
        }
        variables[aux - 1] = false
    }
}

console.log(variables)

//--------------------------------------------------------------------------------

var check = true

var aux2

for (var i = 0; i < text.length; i++) {
    if (text[i].charAt(0) == 'p') {
        aux2 = text[i].split(' ')
    }
}

if (aux2[2] != variables.length) {
    check = false
}

if (aux2[3] != clauses.length) {
    check = false
}

console.log(check)