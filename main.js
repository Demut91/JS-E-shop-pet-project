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

//================================================================

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
      {title: 'Shoes', price: 150},
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
    let sum = 0;
    for (let obj in this.goods) {
        sum += this.goods[obj].price;
      }
     return sum;
    }
  }

//================================================================

const list = new GoodsList ();
list.fetchGoods ();
list.render ();
console.log(list.calcSum());

//================================================================

class Cart {
	constructor () {
    	if (Cart._instance) {
      		return Cart._instance
    	}
	Cart._instance = this
  	}

	list = []                                   
	sum = 0
	adding (goodItem) {}
    removing (goodItem) {}
    render () {}
}

//================================================================ 

class CartProduct {
    addedToCart = false
	_amount = 0

    addingToCart () {
        this.addedToCart = true
        this._amount++
    }
    removingFromCart () {
        if (this._amount > 0) {
            this._amount--
        } else this.addedToCart = false
    }
}