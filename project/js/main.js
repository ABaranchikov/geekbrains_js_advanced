"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],  //товары
        filtered: [],  //отфильтрованные товары
        imgCatalog: 'https://via.placeholder.com/200x150',
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

        filterGoods(searchText) {
            console.log('filter: ' + searchText);

            const regexp = new RegExp(searchText, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },

    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },

});