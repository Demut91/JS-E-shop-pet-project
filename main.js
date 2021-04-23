const API_URL =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest (url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest ();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject ('Microsoft.XMLHTTP');
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback (xhr.responseText);
    }
  };

  xhr.open ('GET', url, true);
  xhr.send ();
}

class GoodsItem {
  constructor (product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render () {
    return `<div class="product-item"><h3 class="item-title">${this.product_name}</h3>
      <p>${this.price}р.</p><button class="buy-btn">Купить</button></div>`;
  }
}

//================================================================

class GoodsList {
  constructor () {
    this.goods = [];
  }
  fetchGoods (cb) {
    makeGETRequest (`${API_URL}/catalogData.json`, goods => {
      this.goods = JSON.parse (goods);
      cb ();
    });
  }

  render () {
    let listHtml = '';
    this.goods.forEach (good => {
      const goodItem = new GoodsItem (good.product_name, good.price);
      listHtml += goodItem.render ();
    });
    document.querySelector ('.products').innerHTML = listHtml;
  }

  calcSum () {
    let sum = 0;
    for (let obj in this.goods) {
      sum += this.goods[obj].price;
    }
    return sum;
  }
}

//================================================================

const list = new GoodsList ();
list.fetchGoods (() => {
  list.render ();
  console.log (list.calcSum ());
});


//================================================================

class Cart {
  constructor () {
    if (Cart._instance) {
      return Cart._instance;
    }
    Cart._instance = this;
  }

  list = [];
  sum = 0;
  adding (goodItem) {
    this.sum = this.sum + GoodsItem.price;
    if (this.list.indexOf (goodItem) < 0) {
      this.list.push (goodItem);
    }
  }
  removing (goodItem) {}
  render () {}
}

//================================================================

class CartProduct {
  addedToCart = false;
  _amount = 0;

  addingToCart () {
    this.addedToCart = true;
    this._amount++;
  }
  removingFromCart () {
    if (this._amount > 0) {
      this._amount--;
    } else this.addedToCart = false;
  }
}
