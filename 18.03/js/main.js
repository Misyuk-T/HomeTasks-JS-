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
        btnShowModal = document.querySelectorAll('[data-show]'),
        modalClose = modal.querySelector('.modal__close'),
        showModalAfterTime = setTimeout(showModal, 30000);

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
        document.removeEventListener('scroll', showAfterPageEnd);
    }

    btnShowModal.forEach((item) => {
        item.addEventListener('click', showModal)
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            showModal();
        }
    })

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            showModal();
        }
        console.log(event.target)
    })

    document.addEventListener('scroll', showAfterPageEnd);

    function showAfterPageEnd() {
        let element = document.documentElement;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            showModal();
        }
    }

// class
//================================

    class ItemMenu {
        constructor(img, altimg, title, descr, price, parent) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
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
            element.innerHTML = `
                            <img src=${this.img} alt=${this.altimg}>
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                    <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>
                   
                 `;
            this.parent.append(element);
        }
    }

    // const getResource = async (url) => {
    //     const res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Couldn't fetch ${url},status: ${res.status}`);
    //     }
    //     return await res.json();
    // }
    // getResource(`http://localhost:3000/menu`)
    //     .then(data => {
    //         data.forEach(({img, alt, title, descr, price}) => {
    //             new ItemMenu(img, alt, title, descr, price, '.menu__field .container').render();
    //         });
    //         console.log(data)
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, alt, title, descr, price}) => {
                new ItemMenu(img, alt, title, descr, price, '.menu__field .container').render();
            });
            console.log(data)
        })


// post form data
//================================

    let forms = document.querySelectorAll('form'),
        message = {
            loading: 'img/forms/054 spinner.svg',
            success: 'Мы с вами сяжемся, ждите',
            failure: 'Что-то пошло не так...'
        }

    forms.forEach(item => {
        bindPostData(item)
    })

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('submit')

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');


            const postData = async (url, data) => {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                })
                return await res.json();
            }


            const formData = new FormData(form);
            // const obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value
            // })
            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            // console.log(formData)
            // console.log(json)

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showTanksModal(message.success);
                    statusMessage.remove()
                }).catch(() => {
                console.error(showTanksModal(message.failure))
            }).finally(() => {
                form.reset()
            })

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         showTanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showTanksModal(message.failure);
            //     }
            // })
        })
    }

    function showTanksModal(message) {
        let modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');

        let thanksBlock = document.createElement('div');
        thanksBlock.classList.add('modal__dialog');

        thanksBlock.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>`

        document.querySelector('.modal').append(thanksBlock);

        setTimeout(() => {
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');

            thanksBlock.remove();
        }, 2000)

    }

    //slick slider
    //=========================================

    let sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = sliderWrapper.querySelector('.offer__slider-inner'),
        sliderItems = sliderWrapper.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        innerWidth = window.getComputedStyle(sliderWrapper).width,
        width = sliderItems.length * 100 + `%`,
        indexSlide = 1,
        transformSlide = 0,
        itemOffset = 100 / sliderItems.length


    sliderWrapper.style.overflow = 'hidden';
    sliderInner.style.cssText = `display: flex; width: ${width}; transition: all .4s`

    if (10 > sliderItems.length) {
        total.textContent = `0${sliderItems.length}`
    } else {
        total.textContent = sliderItems.length
    }

    function nextSlide() {
        if (transformSlide == itemOffset * (sliderItems.length - 1)) {
            transformSlide = 0;
            indexSlide = 0;
        } else {
            transformSlide += itemOffset;
        }
        sliderInner.style.transform = `translateX(-${transformSlide}%)`
        plusCurrentValue();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlide - 1].style.opacity = 1;
    }

    function prevSlide() {
        if (transformSlide == 0) {
            transformSlide = itemOffset * (sliderItems.length - 1);
            indexSlide = sliderItems.length + 1;
        } else {
            transformSlide -= itemOffset;
        }
        sliderInner.style.transform = `translateX(-${transformSlide}%)`
        minusCurrentValue();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlide - 1].style.opacity = 1;
    }

    function plusCurrentValue() {
        if (indexSlide < 10) {
            current.textContent = `0${++indexSlide}`;
        } else {
            current.textContent = ++indexSlide;
        }
    }

    function minusCurrentValue() {
        if (indexSlide < 10) {
            current.textContent = `0${--indexSlide}`;
        } else {
            current.textContent = --indexSlide;
        }
    }

    next.addEventListener('click', () => {
        nextSlide();
    })
    prev.addEventListener('click', () => {
        prevSlide();
    })


    sliderWrapper.style.position = 'relative';
    const indicators = document.createElement(`ol`),
        dots = [];
    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`
    sliderWrapper.append(indicators);

    for (let i = 0; i < sliderItems.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot)
        dots.push(dot)
    }

    dots.forEach(dat => {
        dat.addEventListener(`click`, e => {
            let slideTo = e.target.getAttribute('data-slide-to');
            transformSlide = (slideTo - 1) * itemOffset
            sliderInner.style.transform = `translateX(-${transformSlide}%)`
            indexSlide = slideTo

            if (indexSlide < 10) {
                current.textContent = `0${indexSlide}`;
            } else {
                current.textContent = indexSlide;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[indexSlide - 1].style.opacity = 1;
        })
    })


    //calculator
    //=========================================

    let male = document.querySelector('#male'),
        female = document.querySelector('#female'),
        activeParent = document.querySelector('.calculating__choose_big'),
        calculatingResult = document.querySelector('.calculating__result span'),
        height, weight, age, active = 1.375, sex = 6;

    function setResult() {
        if (height && weight && age && active && sex) {
            calculatingResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - sex) * active);
        } else calculatingResult.textContent = '____'

    }
    setResult();

    function getStaticInformation(parent) {
        let itemsParent = parent.querySelectorAll("div");

        itemsParent.forEach((item) => {
            item.addEventListener('click', (e) => {
                let target = e.target

                itemsParent.forEach((i) => {
                    i.classList.remove('calculating__choose-item_active');
                })
                target.classList.add('calculating__choose-item_active')


                if (target.getAttribute('data-active')) {
                    active = target.getAttribute('data-active');
                } else if (target.getAttribute('id') === 'female') {
                    sex = 165
                } else {
                    sex = 6
                }
                setResult();
            })
        })
    }

    getStaticInformation(document.querySelector('.calculating__choose_big'));
    getStaticInformation(document.querySelector('#gender'));
    
    function getDynamicInformation(parent) {
        let dynamicInputs = parent.querySelectorAll('input');

        dynamicInputs.forEach((item) => {
            item.addEventListener('input', () => {
                switch(item.getAttribute('id')) {
                    case 'height':
                        height = +item.value;
                        break;
                    case 'weight':
                        weight = +item.value;
                        break;
                    case 'age':
                        age = +item.value;
                        break;
                }
                setResult();
            })
        })
    }

    getDynamicInformation(document.querySelector('.calculating__choose_medium'))


})





















