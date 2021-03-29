// import {evaluate} from 'mathjs';


window.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.calc__button-digit'),
        operators = document.querySelectorAll('.calc__button-operation'),
        output = document.querySelector('.calc__output_bottom'),
        dot = document.querySelector('.calc__button-dot'),
        topOutput = document.querySelector('.calc__output_top'),
        calculateBtn = document.querySelector('.calc__button-calculate'),
        polarity = document.querySelector('.calc__button-changepol'),
        square = document.querySelector('.calc__button-square');
    //initialize helping variables
    let arr = []; //array for storing our inputs
    let result = 0; //set default result
    let currentVal = '0'; //set default input value
    let isSignEquallyPressed = false; //helping variable to see if we clicked on "="
    let canDelete = false; //helping variable to see if we can delete or not
    output.textContent = '0';

    //check for overflow
    const isOverflown = ({
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight
    }) => {
        return scrollHeight > clientHeight || scrollWidth > clientWidth;
    }

    //helper to disable buttons
    const disableBtns = () => {
        const btns = document.querySelectorAll('[data-disable]');
        console.log(btns)
        btns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        })
        // operators.forEach(operBtn => {
        //     operBtn.disabled = true;
        //     operBtn.classList.add('disabled');
        // })
        // // dot.disabled = true;
        // // dot.classList.add('disabled');
        // calculateBtn.disabled = true;
        // calculateBtn.classList.add('disabled');
        // square.disabled = true;
        // square.classList.add('disabled');
        // polarity.disabled = true;
        // polarity.classList.add('disabled');
    }
    //helper to enable buttons
    const enableBtns = () => {
        const btns = document.querySelectorAll('[data-disable]');
        btns.forEach(btn => {
            if (btn.disabled) {
                btn.disabled = false;
                btn.classList.remove('disabled');
            }
        })
        // operators.forEach(operator => {
        //     if (operator.disabled) {
        //         operator.disabled = false;
        //         operator.classList.remove('disabled')
        //     }
        // })
        // if (dot.disabled) {
        //     dot.disabled = false;
        //     dot.classList.remove('disabled');
        // }
        // if (calculateBtn.disabled) {
        //     calculateBtn.disabled = false;
        //     calculateBtn.classList.remove('disabled');
        // }
        // if (square.disabled) {
        //     square.disabled = false;
        //     square.classList.remove('disabled');
        // }
        // if (polarity.disabled) {
        //     polarity.disabled = false;
        //     polarity.classList.remove('disabled');
        // }
    }


    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target) {
                // const outputs = document.querySelectorAll('.calc__output');

                // outputs.forEach(output => {
                //     if (isOverflown(output)) {
                //         console.log('overflown')
                //         output.style.overflow = 'scroll'
                //     }
                // })
                if (isOverflown(output)) {
                    output.style.fontSize = '20px';
                    topOutput.style.fontSize = '14px';
                } else {
                    topOutput.style.fontSize = '20px';
                    output.style.fontSize = '35px';
                }

                //enable buttons if we disabled it
                enableBtns();


                //reset value to empty string if we pressed "=" , so when we start pressing on buttons we can calculate new expression
                if (isSignEquallyPressed) {
                    currentVal = '';
                    isSignEquallyPressed = false;
                }

                //check if can delete in false state, if so set it to true, so we can delete numbers 
                if (!canDelete) {
                    canDelete = true;
                }




                //check our value on 0 in the beginning so we cant write something like this : 00000003
                //but we want to write numbers like so : 0.03 , so we check if we pressed on dot('.') button
                if (currentVal.toString().startsWith('0') && !currentVal.toString().includes('.')) {
                    console.log('true')
                    currentVal = '';
                    console.log(currentVal)
                }

                //when we click on button write it text content to input value
                currentVal += btn.textContent;
                //check if we have more than 1 value in array, if yes then 
                //manipulate output depending on it
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    // console.log(output.textContent);
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                    // console.log(output.textContent)
                }


                // console.log(currentVal)
            }
        })
    })

    //push value into array then we click on operator button
    //so we get array like this ['1', '+'], then we check if array contains 2 values
    //if yes, then on next operator click we add next value in array so it now 
    //looks like this ['1', '+', '3'] and evaluate result, clear array and put result as first value 
    //in array, so we getting array with result: arr = [4],
    //so in next steps we just adding pressed operator and calculating new value based on prev result;
    operators.forEach(oper => {
        oper.addEventListener('click', (e) => {
            //check if value is not an empty string
            if (currentVal) {

                arr.push(currentVal); //push value to array
                //check if we clicked on "=", so we can give proper result in output and set variable back to false
                if (isSignEquallyPressed) {
                    topOutput.textContent = currentVal;
                    isSignEquallyPressed = false;
                }
                currentVal = ''; //reset value
                const target = e.target;
                //check if there is 2 values in array
                //if yes then calculate result, clear array, and push result in array
                if (arr.length > 1) {
                    result = math.evaluate(arr.join(''));
                    arr = [];
                    //check for infinity if we division zero
                    if (!isFinite(result)) {
                        console.log('infinity')
                        output.style.fontSize = '20px';
                        output.textContent = "Деление на ноль невозможно"
                        //set operator buttons in disabled state
                        disableBtns();
                        currentVal = '';
                        result = 0;
                        return

                    }
                    arr.push(result);
                    output.textContent = result;
                    topOutput.textContent = result;
                    console.log(currentVal)
                    console.log(result);
                    console.log(arr);
                }
                if (target.getAttribute('data-operation') === '+') {
                    arr.push('+');
                    topOutput.textContent += '+';
                }
                if (target.getAttribute('data-operation') === '/') {
                    arr.push('/');
                    topOutput.textContent += '/';
                }
                if (target.getAttribute('data-operation') === '-') {
                    arr.push('-');
                    topOutput.textContent += '-';
                }
                if (target.getAttribute('data-operation') === '*') {
                    arr.push('*');
                    topOutput.textContent += '*';
                }
            }
            // console.log(result);
            // console.log(arr);
            // console.log(currentVal)

        })
    })

    dot.addEventListener('click', () => {
        enableBtns();
        //check if we calculated expression and if we are then reset value, so if we need we can start new calculation from pressing '.'
        if (isSignEquallyPressed) {
            currentVal = '';
            isSignEquallyPressed = false;
        }
        //check if value contains '.' so we cant add more dots to our value
        if (currentVal.includes('.')) {
            currentVal += '';
            console.log(currentVal)
        } else {
            //add zeros if we pressed "." with empty value
            if (currentVal === '') {
                currentVal += `0${dot.textContent}`;
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
            } else {
                currentVal += dot.textContent;
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
            }

        }


        console.log(currentVal)
    })
    // "=" button need independent event listener
    //so we can check if there is more than 2 values in array,
    calculateBtn.addEventListener('click', () => {
        //this needed so if we click on "=" after "+""-" or another operator the value of currentVal will be empty string, so we wont do anything
        //if user typed another value, then we execute code and pushing this value into array and calculating result, plus setting currentVal to result value 
        //so we can continue to calculate
        if (currentVal) {
            if (arr.length > 1) {
                isSignEquallyPressed = true;
                arr.push(currentVal);
                result = math.evaluate(arr.join(''));
                //check for infinity if we division zero
                if (!isFinite(result)) {
                    console.log('infinity')
                    output.style.fontSize = '20px';
                    output.textContent = "Деление на ноль невозможно"
                    //set operator buttons in disabled state and reset vals
                    disableBtns();
                    currentVal = '';
                    result = 0;
                    arr = [];
                    return
                }
                arr = [];
                // arr.push(result);
                output.textContent = result;
                topOutput.textContent += '=';
                currentVal = result.toString();
                console.log(currentVal)
                console.log(result);
                console.log(arr);
                console.log(typeof currentVal)
                //we cant delete result
                canDelete = false;
            }
        }
        // console.log(currentVal);
        // console.log(arr);
        // output.textContent = result;

        // // console.log(result);

        // arr = [];
        // console.log(currentVal);
        // console.log(arr);


    })

    // console.log(currentVal);
    //clear calc
    const clear = document.querySelector('.calc__button-clear');

    clear.addEventListener('click', () => {
        enableBtns();
        currentVal = '0';
        arr = [];
        result = 0;
        output.textContent = result;
        topOutput.textContent = '';
        console.log(currentVal, arr, result)
        //aswell need to clear isSignEquallyPressed so we wont get result = 0 in output after we clicked on operators
        isSignEquallyPressed = false;
    })

    //square


    square.addEventListener('click', () => {
        if (currentVal && currentVal != 0) {
            currentVal *= currentVal;
            //canDelete need to be setted in false for right work
            canDelete = false;
            if (arr.length > 1) {
                topOutput.textContent = arr.join('') + currentVal;
                output.textContent = currentVal;
            } else {
                topOutput.textContent = currentVal;
                output.textContent = currentVal;
            }

        }
    })

    // +/-



    polarity.addEventListener('click', () => {
        if (currentVal && currentVal != 0) {
            if (parseFloat(currentVal) > 0) {
                currentVal = -currentVal;
                console.log(currentVal);
                console.log(typeof currentVal);
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
            } else {
                currentVal = Math.abs(currentVal);
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
                console.log(currentVal)
            }
        }
    })

    // delete
    const deleteBtn = document.querySelector('.calc__button-delete');

    deleteBtn.addEventListener('click', () => {
        //check if we have not an empty value and we can delete
        
        if (currentVal && canDelete) {
            console.log('click')
            //check if we have number in currentValue then transform it to string
            if (typeof currentVal === 'number') {
                currentVal = currentVal.toString();
                console.log('number')
            }
            //check if we have more then 1 number in currentValue input
            //if yes - delete one char, if not - set currentValue to '0', also check if we have string like this '-8' so if we press on delete, it sets value '0' not to '-'
            if (currentVal.length === 1 || (currentVal.length == 2 && currentVal.startsWith('-'))) {
                console.log('length = 1')
                currentVal = '0';
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    // console.log(output.textContent);
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
                console.log(currentVal)
            } else {
                console.log('length > 1')
                currentVal = currentVal.slice(0, currentVal.length - 1);
                if (arr.length > 1) {
                    topOutput.textContent = arr.join('') + currentVal;
                    // console.log(output.textContent);
                    output.textContent = currentVal;
                } else {
                    topOutput.textContent = currentVal;
                    output.textContent = currentVal;
                }
                console.log(currentVal)
            }
        }
    })




})