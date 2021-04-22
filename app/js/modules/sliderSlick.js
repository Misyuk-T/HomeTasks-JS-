//slick slider
//=========================================


function slider() {
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
}

module.exports = slider();