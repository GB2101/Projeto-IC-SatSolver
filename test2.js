var x1 = [false, false, false, true]
var x2 = [
    ['-2', '3', '4'],
    ['1', '-3', '-4'],
    ['1', '3', '4'],
    ['-2', '-3', '-4']
]

var x3 = doSolve(x2, x1)
console.log(x3)

function doSolve(clauses, assignment) {
    var isSat = false
    var satisfyingAssignment = null
    var final = []
    var find = true
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
        if (!final[i]){
            find = false
            i = clauses.length
        }
    }

    var result = { 'isSat': isSat, satisfyingAssignment: null }

    if(find){
        result.isSat = true
        result.satisfyingAssignment = assignment
    }

    return result
}