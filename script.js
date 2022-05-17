class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
}

 clear(){

    this.currentOperand = '';
    this.previousOperand = '';
    this.opertion = undefined;
 }

 delete(){

 }

 appendNumber(number){
     if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
 }

 chooseOperation(operation){
    if (this.currentOperand === '') return;
    if (this.previousOperand !==''){
        this.compute();
    }
  this.opertion = operation;
  this.previousOperand = this.currentOperand;
  this.currentOperand = '';  
 }

 compute(){
   let computation
   const prev = parseFloat(this.previousOperand);
   const current = parseFloat(this.currentOperand);
   if (isNaN(prev) || isNaN(current)) return;

   switch (this.opertion){
       case '+' : 
            computation = prev + current;
            break;
        case '-' : 
            computation = prev - current;
            break;
        case '÷' : 
            computation = prev / current;
            break;
        case '*' : 
            computation = prev * current;
            break;
        default: return;
   }
   this.currentOperand = computation;
   this.opertion = undefined;
   this.previousOperand = '';
 }

 updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText =  this.previousOperand;
}
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-prev]');
const currentOperandTextElement = document.querySelector('[data-curr]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})


clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})