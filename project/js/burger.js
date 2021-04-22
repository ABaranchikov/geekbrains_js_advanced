'use strict';

class KindOfBurgers {
    static #GOODS = [
        { id: 'Маленький', price: 50, calories: 20 },
        { id: 'Большой', price: 100, calories: 40 },
        { id: 'с сыром', price: 10, calories: 20 },
        { id: 'с салатом', price: 20, calories: 5 },
        { id: 'с картофелем', price: 15, calories: 10 },
        { id: 'посыпан приправой', price: 15, calories: 0 },
        { id: 'полит майонезом', price: 20, calories: 5 },
    ];

    static getPrice(id) {
        let item = KindOfBurgers.#GOODS.find(item => item.id == id);
        if (item == undefined) {
            return 0;  //тут должен быть сценарий для ошибок
        }
        return item.price;
    }

    static getCalories(id) {
        let item = KindOfBurgers.#GOODS.find(item => item.id == id);
        if (item == undefined) {
            return 0;//тут должен быть сценарий для ошибок
        }
        return item.calories;
    }
}

class Burger {
    #price = 0;
    #calories = 0;
    constructor(id = 'small') {
        this.id = id;
        this.addPrice(id);
        this.addCalories(id);
    }

    addPrice(id) {
        this.#price += KindOfBurgers.getPrice(id);
    }

    addCalories(id) {
        this.#calories += KindOfBurgers.getCalories(id);
    }

    get price() {
        return this.#price;
    }

    get calories() {
        return this.#calories;
    }

    showPriceAndCalories() {
        console.log(`Burger: ${this.id}. Total price = ${this.price} and calories = ${this.calories}`);
    }
}

class BurgerWithFilling extends Burger {
    constructor(id, fill) {
        super(id);
        this.fill = fill;
        this.addPrice(fill);
        this.addCalories(fill);
    }

    showPriceAndCalories() {
        console.log(`Burger: ${this.id} ${this.fill}. Total price = ${this.price} and calories = ${this.calories}`);
    }
}

class BurgerWithFillingAndSauce extends BurgerWithFilling {
    constructor(id, fill, sauce) {
        super(id, fill);
        this.sauce = sauce;
        this.addPrice(sauce);
        this.addCalories(sauce);
    }

    showPriceAndCalories() {
        console.log(`Burger: ${this.id} ${this.fill} ${this.sauce}. Total price = ${this.price} and calories = ${this.calories}`);
    }
}

const obj1 = new Burger('Маленький');
obj1.showPriceAndCalories();

const obj2 = new BurgerWithFilling('Большой', 'с салатом');
obj2.showPriceAndCalories();


const obj3 = new BurgerWithFillingAndSauce('Маленький', 'с сыром', 'полит майонезом');
obj3.showPriceAndCalories();
/*

*Некая сеть фастфуда предлагает несколько видов гамбургеров:
### Маленький (50 рублей, 20 калорий).
### Большой (100 рублей, 40 калорий).

### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
### С сыром (+10 рублей, +20 калорий).
### С салатом (+20 рублей, +5 калорий).
### С картофелем (+15 рублей, +10 калорий).

### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).

### Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.
*/