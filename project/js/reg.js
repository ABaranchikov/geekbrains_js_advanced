'use strict';

const doc = document.querySelector('p');
//Задание 1
function task1() {
    const str = doc.innerText;
    const regexp = /'/gm;
    const result = str.replace(regexp, '"');
    doc.innerText = result;
    console.log(result);
}
//Задание 2

const task2 = () => {
    const str = doc.innerText;
    const regexp = /\B'(.+?)'\B/gm;
    const result = str.replace(regexp, "\"$1\"");
    doc.innerText = result;
    console.log(result);
}

//Задание 3
const nameValidator = /^[a-zA-Zа-яА-ЯеЁ]+$/; //любая буква
const phoneValidator = /^\+7\([\d+]{3}\)[\d+]{3}\-[\d+]{4}$/;//+7(000)000-0000.
const emailValidator = /^[a-z]+[\-|\.]?[a-z]+@[a-z]+\.[a-z]{2}$/;
const anyTextValidator = /^\s*$/; //пустая строка

const validate = (event) => {
    let ok = true;
    let name = document.querySelector('#name');
    if (!nameValidator.test(name.value)) {
        name.classList.add('non_valid');
        ok = false;
    } else {
        name.classList.remove('non_valid');
    }

    let phone = document.querySelector('#phone');
    if (!phoneValidator.test(phone.value)) {
        phone.classList.add('non_valid');
        ok = false;
    } else {
        phone.classList.remove('non_valid');
    }

    let email = document.querySelector('#email');
    if (!emailValidator.test(email.value)) {
        email.classList.add('non_valid');
        ok = false;
    } else {
        email.classList.remove('non_valid');
    }

    let anyText = document.querySelector('#anyText');
    if (anyTextValidator.test(anyText.value)) {
        anyText.classList.add('non_valid');
        ok = false;
    } else {
        anyText.classList.remove('non_valid');
    }

    if (!ok) {
        event.preventDefault();
    }
}

document.querySelector('#btn_submit').addEventListener('click', validate);