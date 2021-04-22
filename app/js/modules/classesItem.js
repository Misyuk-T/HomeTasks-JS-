// class
//================================

function classesItem() {

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

}

module.exports = classesItem();