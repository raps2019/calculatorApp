
let divide = (a,b) => parseFloat(a)  / parseFloat(b);
let multiply = (a,b) => parseFloat(a)  * parseFloat(b);
let subtract = (a,b) => parseFloat(a)  - parseFloat(b);
let sum = (a,b) => parseFloat(a) + parseFloat(b);

function operate(operator, a, b) {
    if (operator === 'divide') {
        return divide(a,b);
    } else if(operator === 'multiply') {
        return multiply(a,b);
    } else if (operator === 'subtract') {
        return subtract(a,b);
    } else if (operator === 'sum') {
        return sum(a,b);
    }
}

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#clear");
const display = document.querySelector('#display')

let input = '';
let displayText = '';
let total = '';
let operator = {};
let operand = {};
let inputList = [];
const operatorList = [, "subtract", "sum", "multiply", "divide"];


window.addEventListener('click', calculate);
// window.addEventListener('keydown', calculate);

function calculate(e) {

    inputList.push(e.target.id);

    // console.log(e.target)



    if ((operatorList.includes(inputList[inputList.length - 1])) === true && (operatorList.includes(inputList[inputList.length - 2]) === true)) {
        display.textContent = 'ERROR'
        input = '';
        total = '';
        inputList = [];
        return
    }

    if (inputList.length > 2) {
        inputList.splice(0,1)
    }

    if (e.target.className === 'number') {
        input += e.target.textContent;
        displayText = input;
    }

    if (e.target.className === 'backspace') {
        if (input != '') {
            input = input.slice(0,-1);
            displayText = input;
        }
    }

    if (e.target.id === 'negate') {
        console.log('negate clicked')
        if (input != '') {
            input = '-' + input;
            displayText = input;
        } else {
            total = -total;
            displayText = total;
        }
    }

    if (e.target.className === 'operator') {

        if (total === '') {
            operand.firstOperand = input;
            operator.firstOperator = e.target.id;
            input = '';
            total = operand.firstOperand;
            displayText = total;
            console.log(operator)
        } else if (total != '') {
            operand.secondOperand = +input;
            operator.secondOperator = e.target.id;
            input = '';
            console.log(operator)
            if (operator.firstOperator === 'equals') {
                operand.firstOperand = total;
                operator.firstOperator = operator.secondOperator;
                operator.secondOperator = ''
                displayText = total;
                return;
            } if (operator.firstOperator === 'divide' && operand.secondOperand === 0) {
                console.log(operator);
                displayText = 'ERROR - Cannot Divide by 0';
                console.log(displayText)
            } else {
                total = operate(operator.firstOperator, operand.firstOperand, operand.secondOperand);
                displayText = total;
                operator.firstOperator = operator.secondOperator;
                operator.secondOperator = '';
                operand.firstOperand = total;
            }

        }

    }

    if (e.target.className === 'clear') {

        input = '';
        displayText = '';
        total = '';

    }
    //Split number by decimal point. Calculate number of digits and then accordingly round. 
    // if (typeof displayText === 'number') {
    // display.textContent = displayText.toFixed(10);
    // } else {

    
        // console.log(Number.isInteger(displayText))
        // console.log(typeof displayText)
    

    if ((Number.isInteger(displayText) === false) && (typeof displayText === "number")) {
        let decimal = displayText % 1;
        let lengthOfDecimal = decimal.toString().length;
        let lengthOfInteger = (Math.floor(displayText)).toString().length;

        console.log(lengthOfInteger)

        if (lengthOfDecimal + lengthOfInteger > 14) {
            decimal = decimal.toFixed(14 - lengthOfInteger);
        }
        
        displayText = +Math.floor(displayText) + (+decimal)
    }

    if (displayText == 5318008 || displayText == 55378008) {
        displayText = 'YOU CHILD'
        // document.body.style.setProperty("-webkit-transform", "rotate(-180deg)", null);

        // function rotate() {
        //     document.body.style.setProperty("-webkit-transform", "rotate(180deg)", null);
        //     displayText = 'YOU CHILD'; 
        // }

        // rotate();

    } 
    
    display.textContent = displayText;

    // }

}








