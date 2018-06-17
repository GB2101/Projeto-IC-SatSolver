var array = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
var x = Math.pow(2, array.length)
while(x > 0){
    array = newArray(array)
    x--
}
console.log(array)
console.log(array.length)

function newArray(array) {
    if (!array[0]) {
        array = change(array, 1).array
    } else {
        array = reset(array)
    }
    return array
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
    }else{
        for(var i = 0; i < array.length; i++){
            array[i] = false
        }
    }
    return array
}