const form = document.querySelector('form');
const randomFields = document.querySelector('.random-fields')
const inputFields = document.querySelectorAll('.input-field');
const button = document.getElementById('button');

// Funzioni

const getRandomNumbers = () => {
    const randomNumbers = [];
    while (randomNumbers.lenght < 5) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        console.log(randomNumber);
        if (!randomNumbers.includes(randomNumber)) {

            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const randomNumbers = getRandomNumbers();
    console.log(randomNumbers);
})