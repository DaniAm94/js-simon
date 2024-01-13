const form = document.querySelector('form');
const randomFields = document.querySelector('.random-fields')
const inputFields = document.querySelectorAll('.input-field');
const button = document.getElementById('button');
const timerDisplay = document.getElementById('timer');
const istruction = document.querySelector('h3');

let time;
let randomNumbers = [];

// Funzioni

/**
 * return a list of 5 random numebers in a range from 1 to 100
 * @returns {Array}
 */
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


// Al click sul pulsante
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Se il pulsante contiene la scritta Start o Restart
    if (button.innerText === 'Start' || button.innerText === 'Restart') {
        // Ripulisco i campi di input
        for (let field of inputFields) {
            field.value = '';
            field.classList.remove('success', 'fail');
            field.classList.add('d-none');
        }
        // Do istruzione all'utente
        istruction.innerText = 'Memorizza i numeri';
        //Ripulisco i campi con i 5 numeri casuali
        randomFields.innerHTML = '';
        // Inizializzo il tempo
        time = 10;
        timerDisplay.innerText = time;

        // Disabilito il pulsante fintanto che scorre il timer
        button.disabled = true;
        // Genero i 5 numeri casuali e li metto in una variabile
        randomNumbers = getRandomNumbers();
        console.log('Numeri da indovinare:', randomNumbers);
        // Creo un nodo per ogni numero casuale per poterlo mostrare in pagina
        for (let number of randomNumbers) {
            const randomField = document.createElement('div');
            randomField.classList.add('random-number');
            randomField.innerText = number;
            randomFields.appendChild(randomField);
        }
        // Creo una time function per lo scorrere del timer
        const timer = setInterval(() => {
            timerDisplay.innerText = --time;
            // Quando il tempo arriva a 0
            if (time <= 0) {
                // Cambio messaggio in schermata per dare istruzioni all'utente
                istruction.innerText = 'Indovina i 5 numeri';
                // Nascondo i numeri da indovinare
                randomFields.classList.add('d-none');
                //Riabilito il pulsate e gli cambio testo
                button.disabled = false;
                button.innerText = 'Conferma';
                // Blocco il timer
                clearInterval(timer);
                // Rendo visibili i campi di input in cui l'utente inserira la sua risposta
                for (let field of inputFields) {
                    field.classList.remove('d-none');
                    field.required = true;

                }
            }
        }, 1000)
    }
    // Se il pulsante avrà la scritta conferma 
    if (button.innerText === 'Conferma') {
        // Modifico il testo del pulsante 
        button.innerText = 'Restart'
        // Inizializzo una variabile per il punteggio
        let score = 0;
        // Rendo di nuovo visibili i 5 numeri casuali da indovinare
        randomFields.classList.remove('d-none')
        // Creo una variabile in cui inserire i 5 numeri scelti dall'utente
        const userInputs = [];
        for (let i = 0; i < inputFields.length; i++) {
            userInputs.push(parseInt(inputFields[i].value));
            // Ogni volta che c'è un match mostro un esito positivo
            if (userInputs[i] === randomNumbers[i]) {
                score++;
                inputFields[i].classList.add('success')
            } else {
                inputFields[i].classList.add('fail')

            }
        }
        console.log('Numeri inseriti dall\'utente: ', userInputs);
        // Mostro il risultato in pagina
        istruction.innerText = `Hai indovinato ${score} numeri su 5`;
    }
})