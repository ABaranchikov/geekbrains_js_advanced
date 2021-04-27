"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
};


class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; // data
        this._allProducts = []; // массив экземпляров товаров на основе this._goods

        this._getGoods2();
    }

    _getGoods() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    _getGoods2() {
        return getRequest(`${API}/catalogData.json`)
            .then(result => JSON.parse(result))
            .then((data) => {
                this._goods = data;
                this._render();
            })
            .catch(error => console.log(error));
    }


    _render() {
        const block = document.querySelector(this.container);
        block.innerHTML = "";

        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    addToBasket() {
        return getRequest(`${API}/addToBasket.json`)
            .then(result => JSON.parse(result))
            .then(data => {
                if (data.result == 1) {
                    console.log("Добавили в корзину");
                }
            })
            .catch(error => console.log(error));
    }

    deleteFromBasket() {
        return getRequest(`${API}/deleteFromBasket.json`)
            .then(result => JSON.parse(result))
            .then(data => {
                if (data.result == 1) {
                    console.log("Удалили из корзины")
                }
            })
            .catch(error => console.log(error));
    }

    getBasket() {
        return getRequest(`${API}/getBasket.json`)
            .then(result => JSON.parse(result))
            .then(data => {
                console.log(data);
                this._goods = data.contents;
                this._render()
            })
            .catch(error => console.log(error));
    }

    fullPrice() {
        return this._goods.reduce((sum, { price }) => sum + price, 0);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                      <button class="del-btn">Удалить</button>
                  </div>
              </div>`;
    }
}

const catalog = new ProductList();
document.querySelector('.btn-cart').addEventListener('click', () => catalog.getBasket());
