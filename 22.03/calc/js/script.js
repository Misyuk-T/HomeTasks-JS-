document.addEventListener('DOMContentLoaded', function () {

    const inputRub = document.querySelector('#rub'),
          inputUsd = document.querySelector('#usd')

    inputRub.addEventListener('input', () => {
        const request = new XMLHttpRequest();

        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener("load", () => {
            if (request.readyState === 4 && request.status === 200) {


                const data = JSON.parse(request.response);
                console.log(data)
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
            } else {
                inputUsd.value = '4toto poshlo ne tak'
            }
        })




    })





})