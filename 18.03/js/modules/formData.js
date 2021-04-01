
// post form data
//================================

function postFormData() {

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
}

module.exports = postFormData();