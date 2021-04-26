const API_URL =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest (url) {
  return new Promise ((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest ();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject ('Microsoft.XMLHTTP');
    }
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve (xhr.responseText)
      }// else reject ('ERROR'); 
    };
    xhr.open ('GET', url, true);
    xhr.send ();
  });
  
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

  fetchGoods () {
    return makeGETRequest (`${API_URL}/catalogData.json`) 
      .then((goods) => {                    
        this.goods = JSON.parse(goods);          
        console.log(this.goods)                  
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
list.fetchGoods ()
.then((goods) =>  list.render ())           
.then(() =>  console.log (list.calcSum ()))   
//.then(list.calcSum ());
//list.render ();
//console.log (list.calcSum ());



//================================================================

class Cart extends GoodsList {
  constructor () {
    super ();
     if (Cart._instance) {          
      return Cart._instance;        
    }
    Cart._instance = this;
  }
  

  list = [];
  sum = 0;

  adding (goodItem) {
    CartProduct.addingToCart ()
    this.sum = this.sum + GoodsItem.price;
    if (this.list.indexOf (goodItem) < 0) {
      this.list.push (goodItem);
    }
  }
  removing (goodItem) {}
  render () {}
}

//================================================================

class CartProduct extends GoodsItem {
  constructor () {
    super ();
  }

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
