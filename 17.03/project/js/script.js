'use strict';

// Возьмите свой код из предыдущей практики


const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Абетка для мальчиков",
        "Скотт Пилигрим против...",
    ]
};


let promoAdv = document.querySelector('.promo__adv'),
    promoGenre = document.querySelector('.promo__genre'),
    promoBg = document.querySelector('.promo__bg'),
    promoList = document.querySelector('.promo__interactive-list');


promoAdv.remove();
promoGenre.textContent = 'драма';
promoBg.style.cssText = 'background: url(img/bg.jpg) center center/cover no-repeat;';


function createMoviesList() {
    promoList.innerHTML = '';
    let sortListItem = movieDB.movies.sort();

    movieDB.movies.forEach((film, i) => {
        promoList.innerHTML += `<li class="promo__interactive-item">${i + 1} ${sortListItem[i]} <div class="delete"></div></li>`
    })
    deleteMovie();

}

createMoviesList();

function deleteMovie() {
    let btnDelete = document.querySelectorAll('.delete');

    btnDelete.forEach(function (item, i) {
        item.addEventListener('click', function () {
            delete movieDB.movies[i];
            createMoviesList();

            console.log('was delete')
        })
    })
}


/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

let inputFilmName = document.querySelector('.adding__input'),
    btnSubmit = document.querySelector('form button'),
    checkBox = document.querySelector(`[data-checkbox]`);

checkBox.addEventListener('click', () => {
    checkBox.classList.toggle('on');
})

btnSubmit.addEventListener('click', () => {
    let inputValue = inputFilmName.value

    if (checkBox.classList.contains('on')) {
        alert('added to MY FAVORITE FILMS')
    }

    if (inputValue.length > 23) {

        movieDB.movies.push(inputValue.slice(1, 20) + '...');
        createMoviesList();

        console.log('clock more than 23')
    } else {
        movieDB.movies.push(inputValue);
        createMoviesList();

        console.log(movieDB)
    }

    console.log(typeof checkBox.value)
    console.log(checkBox.value)
    console.log(checkBox)
});











