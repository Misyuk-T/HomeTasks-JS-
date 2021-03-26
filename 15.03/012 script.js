/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку.
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены -
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/


'use strict';

let personalMovieDb = {
    count: '',
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: () => {
        personalMovieDb.count = +prompt('How many movies have you already watch?');

        while (personalMovieDb.count == null || personalMovieDb.count == '' || isNaN(personalMovieDb.count)) {
            personalMovieDb.count = +prompt('How many movies have you already watch?');
        }
    },
    yourAssessment: () => {
        for (let i = 0; i < 2; i++) {

            let bestMovie = prompt(
                'In your opinion. What movie do you like much than other?', 'BladeRunner');
            let yourAssessment = +prompt(
                'What assessment this movie deserve?', '8.0');

            if ((bestMovie ==  null || length > 50 || '') || (yourAssessment ==  null || length > 50 || '')) {
                console.log('error');
                i--;
            } else {
                personalMovieDb.movies[bestMovie] = yourAssessment;
            }
        }
    },
    webAssessment: () => {
        if (personalMovieDb.count < 10) {
            alert('you are noob')
        } else if ((10 < personalMovieDb.count < 20)) {
            alert('you are beginner')
        } else {
            alert("you are a coll boy")
        }
    },
    yourFavoriteGenres: () => {
    for (let i = 1; i < 2; i++) {
        let genres = prompt(`your favorite genres (through a comma) `,'')

        if (genres === '' || genres === null) {
            let genres = prompt(`your favorite genres (through a comma) `,'')
            i--
        } else {
            personalMovieDb.genres = genres.split(', ')
            personalMovieDb.genres .sort()
        }
    }
},
    showMyDB: () => {
        if (personalMovieDb.privat !== false) {
            console.log(personalMovieDb);
        }
    },
    toggleVisibleMyDB: () => {
       if (personalMovieDb.privat) {
           personalMovieDb.privat = false
       } else {
           personalMovieDb.privat = true
       }

},



} //object end

 personalMovieDb.start();
 personalMovieDb.yourAssessment();
 personalMovieDb.webAssessment();
 personalMovieDb.yourFavoriteGenres();
 personalMovieDb.showMyDB();
 personalMovieDb.toggleVisibleMyDB();

personalMovieDb.genres.forEach(function (item, index, genres) {
    console.log(`Любимый жанр ${index + 1} - это ${item}`)
})


console.log(personalMovieDb)






