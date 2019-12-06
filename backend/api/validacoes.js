module.exports = app => {
    function existeOuErro(value, msg) {
        if (!value) throw msg   
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    } 
    
    function notExisteOuErro(value, msg) {
        try {
            existeOuErro(value, msg)
        } catch(msg) {
            return
        }
    
        throw msg
    }
    
    function equalsOuErro(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }
    
    function ehEmailValido(email, msg){
        var exclude=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/
        var check=/@[w-]+./
        var checkend=/.[a-zA-Z]{2,3}$/
        if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)) throw msg
    }

    return { existeOuErro, notExisteOuErro, equalsOuErro, ehEmailValido }
}


