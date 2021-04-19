"use strict";

const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title = "", price = 0) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list = []) => {
    //в innerHTML мы передаем строковое представление массива (метод toString() - запятая в качестве разделителя) 
    //для преобразования массива в строку использую дополнительно join с нужным разделителем
    return list
        .map((item) => renderProduct(item.title, item.price))
        .join(' ');
}

document.querySelector('.products').innerHTML = renderProducts(products);
