"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        getBasketUrl: '/getBasket.json',
        products: [],  //товары
        basketItems: [], //корзина
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '', //строка поиска
        isVisibleCart: false, //флаг видимости корзины
        isEmptyProducts: false, //флаг пустых данных
        isEmptyBasket: false, //флаг пустых данных
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            console.log(product.id_product);
        },

        deleteProduct(product) {
            console.log(product.id_product);
            let index = this.basketItems.indexOf(product);
            if (index > -1) {
                this.basketItems.splice(index, 1);
            }
            this.checkBasket();
        },

        filterGoods() {
            console.log('filter: ' + this.searchLine);

            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },

        getBasket() {
            this.isVisibleCart = !this.isVisibleCart;
            if (this.isVisibleCart) {
                this.getJson(`${API + this.getBasketUrl}`)
                    .then(data => {
                        for (let el of data.contents) {
                            this.basketItems.push(el);
                        }
                        this.checkBasket();
                    });
            } else {
                this.basketItems = [];
            }

        },

        checkBasket() {
            this.isEmptyBasket = this.basketItems.length == 0;
        }

    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.isEmptyProducts = this.products.length == 0;
            });
    },

});