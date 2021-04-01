
//tabs
//================================

function tabs() {

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
}

module.exports = tabs();