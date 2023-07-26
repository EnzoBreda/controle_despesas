class Despesa {
    constructor(data, tipo, desc, valor){
        this.data = data
        this.tipo = tipo
        this.desc = desc
        this.valor = valor
    }

    validarDados() {
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
        
    }
    
    recuperarTodosRegistros() {

        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            
            if(despesa === null) {
                continue
            }
        despesa.id = i
        despesas.push(despesa)
        }

        return despesas
    }

    remover(id) {
        localStorage.removeItem(id)

    }
}

let bd = new Bd()

function cadastrar(){
    let data = document.getElementById('data')
    let tipo = document.getElementById('tipo')
    let desc = document.getElementById('descrição')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        data.value,
        tipo.value,
        desc.value,
        valor.value
    )
    
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        data.value = ''
        tipo.value = ''
        desc.value = ''
        valor.value = ''
        window.alert("Seu cadastro foi realizado.")
    }
    else {
        window.alert("Preencha corretamente os dados!!!")
    }
}

function carregaListaDespesas() {

    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    var listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d){
        let btn = document.createElement("button")
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        btn.innerHTML = "X"
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = d.data
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.desc
        linha.insertCell(3).innerHTML = `R$${d.valor}`
        linha.insertCell(4).append(btn)

        linha.classList.add("row")
        
    })
}