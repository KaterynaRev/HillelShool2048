
const ceilStyles = "flex items-center justify-center bg-stone-100 text-4xl font-bold";
const fieldElement = document.querySelector('#field');
let fieldMatrix = [];
let isGameOver = false;
let isWinner = false;

window.onload = () => startGame();

document.addEventListener('keyup', (event) => {
    if (isGameOver || isWinner) return;
    if(event.key === 'ArrowLeft'){
        moveLeft()
        addNewBasic()
        drawField()
    } else if(event.key === 'ArrowRight') {
        moveRight()
        addNewBasic()
        drawField()
    } else if(event.key === 'ArrowUp') {
        moveUp()
        addNewBasic()
        drawField()
    } else if(event.key === 'ArrowDown') {
        moveDown()
        addNewBasic()
        drawField()
    }
})

const startGame = () => {
    isGameOver = false;
    isWinner = false;
    // Створюємо новий масив розміром 4x4, заповнений нулями.
    fieldMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0))
    // Додаємо перше базове значення (2 або 4) в випадкове порожнє місце на полі.
    addNewBasic()
    addNewBasic()
    drawField()
}


const drawField = () => {
    // Очищаємо вміст HTML елемента, який представляє ігрове поле.
    fieldElement.innerHTML = ''

    // перебір двовимірного масиву `fieldMatrix` для обробки кожного елемента.
    fieldMatrix.flat().forEach(item => {
        const div = document.createElement('div')
        // Якщо елемент матриці дорівнює 0, залишаємо текст всередині <div> порожнім.
        // В іншому випадку, встановлюємо текстом значення елемента матриці.
        div.innerText = item === 0 ? '' : item
        div.classList.value = ceilStyles
        fieldElement.appendChild(div)
    })
}

const addNewBasic = () => {
    if (!checkFreeCell()) {
        isGameOver = true;
        CheckGameOver();
        return;
    }

    const basicValue = Math.random() >= 0.6 ? 4 : 2;
    let foundedEmpty = false;

    while (!foundedEmpty && checkFreeCell()) {
        let rowIndex = Math.floor(Math.random() * 4);
        let colIndex = Math.floor(Math.random() * 4);
        if (fieldMatrix[rowIndex][colIndex] === 0) {
            fieldMatrix[rowIndex][colIndex] = basicValue;
            foundedEmpty = true;
        }
    }
}

// Функція для перевірки на перемогу
const checkForWin = (value) => {
    if (value === 2048) {
        setTimeout(() => {
            CheckWinner();
        }, 1000);
    }
};

const moveLeft = () => {
    fieldMatrix = fieldMatrix.map(row => {
        // Фільтруємо рядок, залишаючи тільки ненульові елементи.
        let filtredRow = row.filter(item => item > 0);

        // Об'єднуємо рядок: якщо два сусідні елементи однакові, вони об'єднуються в один, збільшуючись удвічі.
        let mergedRow = [];
        for (let i = 0; i < filtredRow.length; i++) {
            // Перевіряємо, чи наступний елемент такий самий, як поточний.
            if (i < filtredRow.length - 1 && filtredRow[i] === filtredRow[i + 1]) {
                // Об'єднуємо елементи.
                mergedRow.push(filtredRow[i] * 2);
                // Перевіряємо, чи досягнуто значення 8.
                checkForWin(filtredRow[i] * 2);
                i++; // Пропускаємо наступний елемент, бо він вже об'єднаний.
            } else {
                mergedRow.push(filtredRow[i]);
            }
        }

        // Додаємо нулі в кінець рядка, щоб він знову став довжиною 4.
        while (mergedRow.length < 4) {
            mergedRow.push(0);
        }

        return mergedRow;
    });
};

const moveRight = () => {
    fieldMatrix = fieldMatrix.map(row => {
        // Реверсуємо рядок для обробки руху вправо як руху вліво
        let reversedRow = row.slice().reverse();

        // Фільтруємо рядок, залишаючи тільки ненульові елементи.
        let filtredRow = reversedRow.filter(item => item > 0);

        // Об'єднуємо рядок: якщо два сусідні елементи однакові, вони об'єднуються в один, збільшуючись удвічі.
        let mergedRow = [];
        for (let i = 0; i < filtredRow.length; i++) {
            // Перевіряємо, чи наступний елемент такий самий, як поточний.
            if (i < filtredRow.length - 1 && filtredRow[i] === filtredRow[i + 1]) {
                // Об'єднуємо елементи.
                mergedRow.push(filtredRow[i] * 2);
                // Перевіряємо, чи досягнуто значення 8.
                checkForWin(filtredRow[i] * 2);
                i++; // Пропускаємо наступний елемент, бо він вже об'єднаний.
            } else {
                mergedRow.push(filtredRow[i]);
            }
        }

        // Додаємо нулі в кінець рядка, щоб він знову став довжиною 4.
        while (mergedRow.length < 4) {
            mergedRow.push(0);
        }

        // Реверсуємо рядок назад до початкового порядку
        return mergedRow.reverse();
    });
};

const moveUp = () => {
    // Створюємо нову матрицю розміром 4x4, заповнену нулями.
    transposedMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0))

    // Транспонуємо оригінальну матрицю (міняємо місцями рядки і стовпці).
    fieldMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            transposedMatrix[cellIndex][rowIndex] = cell
        })
    })
    // Обробляємо кожний рядок транспонованої матриці, як у функції moveLeft.
    transposedMatrix = transposedMatrix.map(row => {
        // Фільтруємо рядок, залишаючи тільки ненульові елементи.
        let filtredRow = row.filter(item => item > 0)
        // Об'єднуємо елементи в рядку.
        let mergedRow = [];
        for (let i = 0; i < filtredRow.length; i++) {
            // Перевіряємо, чи наступний елемент такий самий, як поточний.
            if (i < filtredRow.length - 1 && filtredRow[i] === filtredRow[i + 1]) {
                // Об'єднуємо елементи.
                mergedRow.push(filtredRow[i] * 2);
                // Перевіряємо, чи досягнуто значення 8.
                checkForWin(filtredRow[i] * 2);
                i++; // Пропускаємо наступний елемент, бо він вже об'єднаний.
            } else {
                mergedRow.push(filtredRow[i]);
            }
        }
        while(mergedRow.length < 4) {
            mergedRow.push(0)
        }
        return mergedRow;
    })
    // Зворотне транспонування обробленої матриці, щоб повернути її до оригінальної орієнтації.
    transposedMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            fieldMatrix[cellIndex][rowIndex] = cell
        })
    })
}

const moveDown = () => {
    transposedMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0))

    fieldMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            transposedMatrix[cellIndex][rowIndex] = cell
        })
    })

    transposedMatrix = transposedMatrix.map(row => {
        let filtredRow = row.filter(item => item > 0)
        let mergedRow = [];
        for (let i = 0; i < filtredRow.length; i++) {
            // Перевіряємо, чи наступний елемент такий самий, як поточний.
            if (i < filtredRow.length - 1 && filtredRow[i] === filtredRow[i + 1]) {
                // Об'єднуємо елементи.
                mergedRow.push(filtredRow[i] * 2);
                // Перевіряємо, чи досягнуто значення 8.
                checkForWin(filtredRow[i] * 2);
                i++; // Пропускаємо наступний елемент, бо він вже об'єднаний.
            } else {
                mergedRow.push(filtredRow[i]);
            }
        }
        while(mergedRow.length < 4) {
            mergedRow.push(0)
        }
        return mergedRow.reverse()
    })
    transposedMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            fieldMatrix[cellIndex][rowIndex] = cell
        })
    })
}

const checkFreeCell = () => {
    return fieldMatrix.flat().some(item => item === 0)
}

const btnStart = document.createElement('button')

function CheckWinner() {
    const divWinner = document.createElement('div');
    const pWinner = document.createElement('p');
    btnStart.classList.add('btnStart');
    divWinner.classList.add('divWin');
    pWinner.classList.add('pWin');

    btnStart.innerHTML = 'Start';
    pWinner.innerHTML = 'You Win';

    divWinner.appendChild(pWinner);
    divWinner.appendChild(btnStart);
    document.body.appendChild(divWinner);

    btnStart.addEventListener('click', () => {
        document.body.removeChild(divWinner);
        startGame();
    });
}

function CheckGameOver() {
    const divGameOver = document.createElement('div');
    const pGameOver = document.createElement('p');
    btnStart.classList.add('btnStart');
    divGameOver.classList.add('divGame');
    pGameOver.classList.add('pOver');

    btnStart.innerHTML = 'Start';
    pGameOver.innerHTML = 'Game Over';

    divGameOver.appendChild(pGameOver);
    divGameOver.appendChild(btnStart);
    document.body.appendChild(divGameOver);

    btnStart.addEventListener('click', () => {
        document.body.removeChild(divGameOver);
        startGame();
    });
}