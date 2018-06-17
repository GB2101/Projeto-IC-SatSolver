var array = [false, false, false, false]

function newArray(array){
    var aux = false
    if (!array[x]){
        for(i = 1; i < array.length; i++){
            if (array[i]){
                array[i] = false
                array[i-1] = true
                aux = true
                i = array.length
            }
        }
        if(!aux){
            var k = array.length - 1
            array[k] = true
        }
    }
    return array
}