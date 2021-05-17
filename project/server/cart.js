const stat = require('./stats');

const add = (cart, req) => {
  cart.contents.push(req.body);
  stat.log("Добавление", req.body.product_name);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  stat.log("Изменение", find.product_name);
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  stat.log("Удаление", find.product_name);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
