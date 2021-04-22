//calculator
//=========================================


function calculator() {

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

}

module.exports = calculator();