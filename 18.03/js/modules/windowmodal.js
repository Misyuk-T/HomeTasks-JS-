function modalWindow() {
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

}

module.exports = modalWindow();