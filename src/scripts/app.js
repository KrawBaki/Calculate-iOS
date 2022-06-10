const inp = document.querySelector('.inp')
const obj = {test: '', operation: '', status: false}

function addNumber(e) {
    let number = +e.innerText
    if(obj.status){
        inp.value = ''
        obj.status = false
    }else {
        inp.value += number
    }
}

function clearInp() {
    inp.value = ''
}

function addPoint() {
    inp.value += '.'
}

function addZero(e) {
    inp.value += e.innerText
}

function divisionNumber() {
    if(obj.test === ''){
        obj.operation = '/'
        obj.test = inp.value
        inp.value = ''
    }
}

function minusData(e){
    if(obj.test === ''){
        obj.operation = '-'
        obj.test = inp.value
        inp.value = ''
    }
}

function plusData(e) {
    if(obj.test === '') {
        obj.operation = e.innerText
        obj.test = inp.value
        inp.value = ''
    }
}


function timesData(e){
    if(obj.test === '') {
        obj.operation = '*'
        obj.test = inp.value
        inp.value = ''
    }
}

function square(){
    let data = eval(`${+obj.test} ${obj.operation} ${+inp.value}`)
    if (Number.isInteger(data) === false) {
        inp.value = data.toFixed(1)
    } else {
        inp.value = data
    }
    obj.status = true
    obj.operation = ''
    obj.test = ''
}





