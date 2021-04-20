// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];
// //Функция для формирования верстки каждого товара
// const renderProduct = (title, price) =>
//      `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// ;
// const renderPage = list => document.querySelector('.products')
// .innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');

// renderPage(products);

class GoodsItem {
  constructor (title, price) {
    this.title = title;
    this.price = price;
  }
  render () {
    return `<div class="product-item"><h3>${this.title}</h3>
      <p>${this.price}</p><button class="buy-btn">Купить</button></div>`;
  }
}

class GoodsList {
  constructor () {
    this.goods = [];
  }
  fetchGoods () {
    this.goods = [
      {title: 'Shirt', price: 150},
      {title: 'Socks', price: 50},
      {title: 'Hat', price: 200},
      {title: 'Jacket', price: 350},
      {title: 'Shoes', price: 250},
    ];
  }
  render () {
    let listHtml = '';
    this.goods.forEach (good => {
      const goodItem = new GoodsItem (good.title, good.price);
      listHtml += goodItem.render ();
    });
    document.querySelector ('.products').innerHTML = listHtml;
  }
  calcSum () {
    let arr = this.goods;
    let sum = 0;
    for (let obj in arr) {
        sum += arr[obj].price;
      }
     return sum;
    }
  }

const list = new GoodsList ();
list.fetchGoods ();
list.render ();
console.log(list.calcSum());
