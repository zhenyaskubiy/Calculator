let a = ''; //first number
let b = ''; //second number
let sign = ''; //знак операції
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-'];

//екран
const out = document.querySelector('.calc-screen p');
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.AC').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // натиснута не кнопка
    if(!event.target.classList.contains('btn')) return;
    // натиснута  кнопка clearAll AC
    if(event.target.classList.contains('AC')) return;

    out.textContent = '';
    // отримання натиснутої кнопи
    const key = event.target.textContent;

    // якщо натиснута 0-9 або ,
    if(digit.includes(key)) {
        if(b ==='' && sign ===''){
        a+= key;
        
        out.textContent = a;
        }
        else if(a!=='' && b!=='' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else{
            b+= key;
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }

    // якщо натиснутий + - х / ,
    if(action.includes(key)) {

       if (key === '%') {
                a = parseFloat(a) / 100;
                out.textContent = a;
                finish = true;
                console.log(a, b, sign);
                return;
       }

        // if clicked +/-
    if (key === '+/-') {
        if (b === '' && sign === '') {
            a = (parseFloat(a) * -1).toString();
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = (parseFloat(b) * -1).toString();
            out.textContent = b;
        } else {
            b = (parseFloat(b) * -1).toString();
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }
    


        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }
    //натиснута дорівнює
    if(key === '='){
        if(b ==='') b = a;
        switch(sign){
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case 'x':
                a = (+a) * (+b);
                break;
            case '/':
                if (b === '0'){
                    out.textContent = 'Помилка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
            a = a / b;
            break;
            case '%':
                a = a - (a * b / 100).toString();
                break;
        }

        if (a.toString().includes('.') && a.toString().split('.')[1].length > 6) {
            a = parseFloat(parseFloat(a).toFixed(6));
        }
        
        if(a == a + '%') a / 100;

        
        finish = true;
        out.textContent = a;
        console.log(a, b, sign);
    }
}