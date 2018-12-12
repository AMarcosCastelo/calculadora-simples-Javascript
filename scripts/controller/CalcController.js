class Calculator {

    constructor() {

        this._lastNumber = '';
        this._lastOperator = '';
        this._operation = [];
        this._$displayCalc = document.querySelector('#display');
        this.initialize();
        this.initEventsButtons();
        this.initKeyBoard();

    }

    pasteFromClipboard() {

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('text');

            this.displayCalc = parseFloat(text);

        });

    }

    copyToClipBoard() {

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand('Copy');

        input.remove();

    }

    initialize() {

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

    }

    initKeyBoard() {

        document.addEventListener('keyup', e => {

            switch (e.key) {
                case 'Backsace':
                    this.clearEntry();
                    break;
                case 'Escape':
                    this.cancel();
                    break;
                case 'raiz':
                    
                    break;
                case 'expo':
                    
                    break;
                case 'fracao':
                    
                    break;
                case 'backspace':
                    
                    break;
                case '/':
                case '*':
                case '-':
                case '+':
                case '%':
                    this.addOperation(e.key);
                    break;
                case '.':
                case ',':
                    this.addComma();
                    break;
                case 'maisoumenos':
                    
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'Enter':
                case '=':
                    this.calculate();
                    break;
                case 'c':
                    if (e.ctrlKey) this.copyToClipBoard();
                    break;
            }

        });

    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach( event => {

            element.addEventListener(event, fn);

        });

    }

    cancel() {

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry() {

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        return this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);

    }

    pushOperation(value){

        this._operation.push(value);

        if( this._operation.length > 3) {

            this.calculate();

        }

    }

    getResult() {

        try {

            return eval(this._operation.join(''));

        } catch(e) {

            setTimeout(()=>{

                this.setError();

            },1)

        }

    }

    calculate() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation =[firstItem, this._lastOperator, this._lastNumber];

        }

        if(this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if(last == '%') {

            result /= 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if(this.isOperator(this._operation[i]) == isOperator) {

                lastItem = this._operation[i];
                break;

            }
            

        }

        if(!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    addOperation(value) {


        if(isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value)

            } else  {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }



        }

    }

    setError() {

        this.displayCalc = 'ERROR';

    }

    addComma() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');
            console.log(this._operation);

        } else {

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();

    }

    execBtn(value) {

        switch (value) {
            case 'ce':
                this.clearEntry();
                break;
            case 'c':
                this.cancel();
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'raiz':
                this.squareRoot();
                break;
            case 'expo':
                
                break;
            case 'fracao':
                
                break;
            case 'backspace':
                
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'virgula':
                this.addComma();
                break;
            case 'maisoumenos':
                
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.addOperation(parseInt(value));
                break;
            case 'igual':
                this.calculate();
                break;
            default:
                this.setError();
                break;
        }

    }

    initEventsButtons() {

        let buttons = document.querySelectorAll('button');
        
        buttons.forEach( (btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.id.replace('btn-', '');
                this.execBtn(textBtn);

            });

        });

    }

    get displayCalc() {

        return this._$displayCalc.innerHTML;

    }

    set displayCalc(value) {

        if (value.toString().length > 12) {

            this.setError();
            return;

        }

        this._$displayCalc.innerHTML = value;

    }



}