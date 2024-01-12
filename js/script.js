const form = document.querySelector('form');
const randomFields = document.querySelector('.random-fields')
const inputFields = document.querySelectorAll('.input-field');
const button = document.getElementById('button');
const timerDisplay = document.getElementById('timer');
const istruction = document.querySelector('h3');

let time;

// Funzioni

const getRandomNumbers = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 5) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    randomFields.innerHTML = '';
    time = 3;
    button.disabled = true;
    const randomNumbers = getRandomNumbers();
    console.log(randomNumbers);
    for (let number of randomNumbers) {
        const randomField = document.createElement('div');
        randomField.classList.add('random-number');
        randomField.innerText = number;
        randomFields.appendChild(randomField);
    }
    const timer = setInterval(() => {
        timerDisplay.innerText = time--;
        if (time < 0) {
            istruction.innerText = 'Indovina i 5 numeri';
            randomFields.classList.add('d-none');
            button.disabled = false;
            button.innerText = 'Conferma';
            clearInterval(timer);
            for (let field of inputFields) {
                field.classList.remove('d-none');
                field.required = true;
            }
        }
    }, 1000)
})