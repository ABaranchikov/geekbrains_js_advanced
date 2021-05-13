Vue.component('basket', {
    data: function () {
        return {
            getBasketUrl: '/getBasket.json',
            basketItems: [], //корзина
            imgBasket: 'https://via.placeholder.com/100x150',
            isVisibleCart: false, //флаг видимости корзины      
        }
    },

    template: ` 
                <div>
                    <button class="btn-cart" type="button" @click="getBasket">Корзина</button>
                    <div class="cart-block" v-show="isVisibleCart">
                            <h2 v-if="this.basketItems.length==0">Нет данных</h2>
                            <div class="cart-item" v-for="item of basketItems" :key="item.id_product">
                                <img :src="imgBasket" alt="Some img">
                                    <div class="desc">
                                        <h3>{{item.product_name}}</h3>
                                        <p>{{item.price}}₽</p>
                                        <button class="buy-btn" @click="deleteProduct(item)">Удалить</button>
                                    </div>
                        </div>
                    </div> 
                </div>`,

    methods: {

        getBasket() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        deleteProduct(product) {
            console.log(product.id_product);
            let index = this.basketItems.indexOf(product);
            if (index > -1) {
                this.basketItems.splice(index, 1);
            }
            this.checkBasket();
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.getBasketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
            });
    }

})