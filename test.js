var fs = require('fs')
var contents = fs.readFileSync('files/simple0.cnf', 'utf8')
var text = contents.split('\r\n')

var aux = ''

for(i = 0; i < text.length; i++){
    if((text[i].charAt(0) != 'c') && (text[i].charAt(0) != 'p')){
        aux += text[i]
    }
}

aux = aux.substring(0, aux.length - 2)

aux = aux.split(' 0')

for(i = 0; i < aux.length; i++){
     aux[i] = aux[i].split(' ')
}

var res;

console.log(aux)