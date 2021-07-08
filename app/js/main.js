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























