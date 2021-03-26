window.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.calc__button-digit');
    const operators = document.querySelectorAll('.calc__button-operation'),
          output = document.querySelector('.calc__output'),
          dot = document.querySelector('.calc__button-dot');
    //initialize helping variables
    let arr = [];   //array for storing our inputs
    let result = 0; //set default result
    let currentVal = '0'; //set default input value
    output.textContent = currentVal;
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target) {
                //when we click on button write it text content to input value
                if (currentVal.startsWith('0') && !currentVal.includes('.')) {
                    console.log('true')
                    currentVal = '';
                    console.log(currentVal)
                }
                currentVal += btn.textContent;
                //check if we have more than 1 value in array, if yes then 
                //manipulate output depending on it
                if (arr.length > 1) {
                    output.textContent = arr.join('') + currentVal;
                    // console.log(output.textContent);
                } else {
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
    //in array, so we getting array with result: arr = [result],
    //so in next steps we just adding pressed operator and calculating new value based on prev result;
    //with help 
    operators.forEach(oper => {
        oper.addEventListener('click', (e) => {
            //check if value is not an empty string
            if (currentVal) {
                arr.push(currentVal); //push value to array
                currentVal = ''; //reset value
                const target = e.target;
                //check if there is 2 values in array
                //if yes then calculate result, clear array, and push result in array
                if (arr.length > 1) {
                    result = eval(arr.join(''));
                    arr = [];
                    arr.push(result);
                    output.textContent = result;
                    console.log(result);
                    console.log(arr);
                }
                if (target.getAttribute('data-operation') === '+') {
                    arr.push('+');
                    output.textContent += '+'
                }
                if (target.getAttribute('data-operation') === '/') {
                    arr.push('/');
                    output.textContent += '/'
                }
                if (target.getAttribute('data-operation') === '-') {
                    arr.push('-');
                    output.textContent += '-'
                }
                if (target.getAttribute('data-operation') === '*') {
                    arr.push('*');
                    output.textContent += '*'
                }
                if (target.getAttribute('data-operation') === '=') {
                    //show result, assign result to current val, so we can calculate further
                    //and clear array
                    output.textContent = result;
                    // console.log(result);
                    currentVal = result.toString();
                    arr = [];
                }
            }
            console.log(result);
            console.log(arr);

        })
    })

    dot.addEventListener('click', () => {
        //check if value contains '.' so we cant add more dots to our value
        if (currentVal.includes('.')) {
            currentVal += '';
            console.log(currentVal)
        } else {
            currentVal += dot.textContent;
        }
        
       
        console.log(currentVal)
    })

    // console.log(currentVal);

    const clear = document.querySelector('.calc__button-clear');

    clear.addEventListener('click', () => {
        currentVal = '0';
        arr = [];
        result = 0;
        output.textContent = result;
        console.log(currentVal, arr, result)
    })
})