//================
//indexOf, найстаріша фігня, повертає - при false та індекс при tru але дає можливість проставити пошук з певного індексу
// includes, ES7 аргументи як і indexOf, але завжди повертає boolean
// find, ES6 перебор масива, повертає елемент або -1
// findIndex,  ES6 перебор масива, повертає індекс або -1, не можна вказати з якого індексу починати пошук, але можна вписати більше умов + можна шукати свойства об'єкту

//================


let arr = [1000, 2000, 5000, 200, 0, 200, 6000],
    arr2 = [],
    b;

// for (i = 0; i < arr.length; i++) {
//     let index = arr.indexOf(200, b + 1);
//
//     if (index !== -1) {
//         arr2.push(index);
//         b = index;
//     }
//     console.log(arr2);
// }

for (i = 0; i < arr.length; i++) {
    let indx = arr.findIndex((element, i) => {
        if (element === 200 && !arr2.includes(i)) {
            return i
        }
    });

    if (indx !== -1) {
        arr2.push(indx);
    }
    console.log(arr2);
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

//console.log(palindrome('anna'));


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

// console.log(anagram('some', 'mose'));


//================
//Fibonacci
//================

function fibonacci(num) {
    const arr = [0, 1];

    for (let i = 2; i <= num; i++) {
        const nextNum1 = arr[i - 1],
            nextNumb2 = arr[i - 2];
        //console.log('1')

        arr.push(nextNum1 + nextNumb2);
    }

    return arr[num]
}

//console.log(fibonacci(22))










