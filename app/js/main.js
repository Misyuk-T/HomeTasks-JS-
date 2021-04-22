document.addEventListener('DOMContentLoaded', function () {
const tabs = require('./modules/tabs'),
    calculator = require('./modules/calculator'),
    classesItem = require('./modules/classesItem'),
    formData = require('./modules/formData'),
    timer = require('./modules/timer'),
    windowModal = require('./modules/windowModal'),
    slider = require('./modules/sliderSlick')

    tabs();
    calculator();
    classesItem();
    postFormData();
    timer();
    modalWindow();
    slider();
})

const arr = [3000, 200, 2000, 5000, 6000] // 7000

    // arr.map((item, i)=> {
    //     console.log(item + 200)
    //     console.log(i)
    // })

    // let checkF = item => item % 2 === 0
    // let something = arr.some(checkF)

// const reducer = (accumulator, item ) => accumulator + item
// arr.reduce(reducer)
// console.log(arr.reduce(reducer))

// arr.forEach((item, i) => {
//     for (let j = 0; j < arr.length; j++) {
//         if (item + arr[j] == 7000) {
//             console.log(true)
//         }
//     }
// })


let reducer = (accumulate, item) => accumulate + item



console.log(arr.reduce(reducer))




















