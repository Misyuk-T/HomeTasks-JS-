document.addEventListener('DOMContentLoaded', function () {

    //tabs
    //================================

    let tabParent = document.querySelector('.tabcontainer'),
        tabItems = document.querySelectorAll('.tabcontent'),
        tabHeaderParent = document.querySelector('.tabheader__items'),
        tabHeaderItems = document.querySelectorAll('.tabheader__item');

    function hideTabItem() {
        tabItems.forEach((item) => {
            item.style.cssText = ('display: none;')
        })
        tabHeaderItems.forEach((item) => {
            item.classList.remove('tabheader__item_active')
        })
    }


    function showTabItem(i = 0) {
        tabItems[i].style.cssText = ('display: block;');
        tabHeaderItems[i].classList.add('tabheader__item_active');
    }

    function toggleShowItem() {
        tabHeaderParent.addEventListener('click', (event) => {
            const target = event.target

            if (target && target.classList.contains('tabheader__item')) {

                tabHeaderItems.forEach((item, i) => {
                    if (target == item) {
                        hideTabItem();
                        showTabItem(i);
                    }
                })

            }
        })
    }

    hideTabItem();
    showTabItem();
    toggleShowItem();

    //timer
    //================================

    let deadline = '2021-5-19:14:11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.now(),
            days = Math.floor((t / 1000 / 60 / 60 / 24)),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    }

    getTimeRemaining(deadline);

    setClock(deadline);

    function setClock(endtime) {
        let timer = document.querySelector(`.timer`),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);

            days.textContent = formatTime(t.days);
            hours.textContent = formatTime(t.hours);
            minutes.textContent = formatTime(t.minutes);
            seconds.textContent = formatTime(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = '0';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

// modal window
//================================

    let modal = document.querySelector('.modal'),
        modalContent = modal.querySelector('.modalContent'),
        btnShowModal = document.querySelectorAll('[data-show]'),
        modalClose = modal.querySelector('.modal__close'),
        showModalAfterTime = setTimeout(showModal, 30000);


    function toggleDisplayModal() {
        btnShowModal.forEach((item) => {
            item.addEventListener('click', showModal)
        })
        modalClose.addEventListener('click', showModal)
    }

    toggleDisplayModal();


    function showModal() {
        if (modal.classList.contains('hide')) {
            modal.classList.remove('hide')
            modal.classList.add('show')
            document.documentElement.style.overflow = 'hidden'
        } else {
            modal.classList.add('hide')
            modal.classList.remove('show')
            document.documentElement.style.overflow = ''
        }
        clearTimeout(showModalAfterTime);
    }

    document.addEventListener('scroll', showAfterPageEnd);

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            showModal();
        }
    })

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            showModal();
        }
    })


    function showAfterPageEnd() {
        let element = document.documentElement;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            showModal();
            document.removeEventListener('scroll', showAfterPageEnd)
        }
    }

// class
//================================

    class ItemMenu {
        constructor(img, alt, title, text, price, parent) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.transferToUAH();
        }
        transferToUAH() {
            this.price = this.price * 28
        }
        render() {
            const element = document.createElement('div'),
                  getClassElement = element.classList.add('menu__item');
            element.innerHTML =`
                            <img src=${this.img} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.text}</div>
                                    <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>
                   
                 `;
            this.parent.append(element);
        }
    }

    new ItemMenu(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        14,
        '.menu__field .container'
        ).render();

    new ItemMenu(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        24,
        '.menu__field .container'
    ).render();

    new ItemMenu(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        17,
        '.menu__field .container'
    ).render();


})