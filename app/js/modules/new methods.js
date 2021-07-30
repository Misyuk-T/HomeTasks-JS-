//================
//indexOf, найстаріша фігня, повертає - при false та індекс при tru але дає можливість проставити пошук з певного індексу
// includes, ES7 аргументи як і indexOf, але завжди повертає boolean
// find, ES6 перебор масива, повертає елемент або -1
// findIndex,  ES6 перебор масива, повертає індекс або -1, не можна вказати з якого індексу починати пошук, але можна вписати більше умов + можна шукати свойства об'єкту=
//filter - перевіряє все і якщо підходить умова (тру) додає в масив і продовжує далі

//================


let arr = [1000, 2000, 5000, 200, 0, 200, 6000],
    arr2 = [],
    b;
//1
for (i = 0; i < arr.length; i++) {
    let index = arr.indexOf(200, b + 1);

    if (index !== -1) {
        arr2.push(index);
        b = index;
    }
    //console.log(arr2);
}

//2
for (i = 0; i < arr.length; i++) {
    let indx = arr.findIndex((element, i) => {
        if (element === 200 && !arr2.includes(i)) {
            return i
        }
    });

    if (indx !== -1) {
        arr2.push(indx);
    }
    //console.log(arr2);
}


//================
//Palindrome
//================

function palindrome(string) {
    string = string.toLowerCase();
    let newString = string.split('').reverse().join('');

    if (string === newString) {
        return true
    } else {
        return false
    }
}

console.log(palindrome('anna'));


//================
//FizzBuzz
//================

function fizz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && !(i % 5 === 0)) {
            console.log('fizz');
        } else if (i % 5 === 0 && !(i % 3 === 0)) {
            console.log('buzz');
        } else if (i % 5 === 0 && i % 3 === 0) {
            console.log('fizzBuzz');
        } else {
            console.log(i);
        }
    }
}

//fizz(215);


//================
//Anagram
//================

function normalize(word) {
    word = word.toLowerCase().split('').sort();
    return word
}

function compare(array1, array2) {
    return array1.every((item, i) => {
        return array1[i] === array2[i]
    });
}

function anagram(word1, word2) {
    if (!(word1.length === word2.length)) {
        return false
    }

    let normalizeW1 = normalize(word1),
        normalizeW2 = normalize(word2);

    return (compare(normalizeW1, normalizeW2));
}

 console.log(anagram('vitalik', 'likvita'));


//================
//Fibonacci
//===============

function fibonacci(number) {
    let arr = [0, 1];

    for (let i = 2; i <= number; i++) {
        let nextNumber = arr[i - 1],
            previousNumber = arr[i - 2],
            sum = nextNumber + previousNumber;

        if (number <= sum) {
            return arr
        } else {
            arr.push(sum)
        }
    }
    return arr
}

//console.log(fibonacci(233));


function fib(n) {
    debugger
    return n <= 1 ? n : fib(n - 1) + fib(n - 2)

}

// console.log(fib(23));

let fibb = n => {
    let prev = 0,
        next = 1;

    for (let i = 0; i < n; i++) {
        debugger
        let temp = next;
        next = prev + next;
        prev = next;
    }
    return prev
}

// console.log(fibb(33))


const fib2 = n => {
    if (n === 0) {
        debugger
        return [0, 1];
    } else {
        const [prev, next] = fib2(n - 1);
        return [next, prev + next];
    }
}
// fib2(5)

//================
//ВИВЕСТИ ВСІ ПРОСТІ ЧИСЛА
//===============

let SimpleNumber = n => {

    let SimpleArr = [];

    iterator:  for (let i = 2; i <= n; i++) {

        for (let j = 2; j < i; j++) {

            if (i % j === 0) {
                continue iterator
            } else if (!SimpleArr.includes(i)) {
                SimpleArr.push(i);
            }
        }
    }

    //console.log(SimpleArr);
}


 SimpleNumber(18);
let n = 12;

checkSimple:
    for (let i = 2; i <= n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) continue checkSimple
        }
        //console.log(i);
    }

//======
// БІНАРНИЙ ПОШУК
//======

let coolArr1 = [0, 1, 2, 10, 11, 12, 13, 14, 18];

function search(arr, target) {
    let left = 0,
        right = arr.length - 1,
        mid;

    while (left <= right) {
        mid = Math.round((right - left) / 2 + left);
        debugger
        if (target > arr[mid]) {
            left = mid
        } else if (target < arr[mid]) {
            right = mid
        } else if (arr[mid] === target) {
            return mid
        }


    }
}

//console.log(search(coolArr1, 14))

//======
// ВСІ ФОЛСИ
//======

/*console.log(
    Boolean(''),
    Boolean(null),
    Boolean(undefined),
    Boolean(0),
    Boolean(NaN),

)*/


//======
// XMLHttpRequest
//======

const userUrl = "https://jsonplaceholder.typicode.com/users";

let xhr = new XMLHttpRequest(); //створюємо конструктором новий запит (не може прйимати аргументів)
xhr.open("GET", userUrl); //передаємо аргументи, в методі GET третій аргумент (body) не обов'язковий
xhr.send(); //передаємо запит на сервер

xhr.onload = function() {
    if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
       // console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
        // console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    }
};

xhr.onprogress = function(event) { //відслідковуємо прогрес отримання данних
    if (event.lengthComputable) {  // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
        // console.log(`Получено ${event.loaded} из ${event.total} байт`);
        // event.loaded - количество загруженных байт
        // event.total - количество байт всего (только если lengthComputable равно true)
    } else {
        // console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    }

};

xhr.onerror = function() {
    console.log("Запрос не удался");
};


//======
// fetch
// fetch не позволяет отслеживать прогресс отправки, то мы будем использовать XMLHttpRequest.

fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
        "Content-type": "application/json",
    }
})
    .then(response => response.ok ? response.json() : console.error("Error" + response.status) )
    //стрілочні функції завжди неявно повертають значення, в іншому випадку потрібно самому прописати і повернути проміс
    //.then(data => console.log(data))
    .catch(error => console.log(error))  //onRejected для того, щоб зловити якусь невідомуу помилку

//======
// fetch POST
//
data = "some text"

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-tyoe": "application/json"
    },
    body: JSON.stringify(data),
})
    .then(data => console.log(data))











