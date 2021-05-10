const API_URL =
  'http://127.0.0.1:3000';

const app = new Vue ({
  el: '#app',
  data: () => ({
    goods: [],
    filteredGoods: [],
    searchline: '',
    showCart: false,
  }),

  mounted () {
    this.makeGETRequest (`${API_URL}/catalogData`, goods => {
      this.goods = JSON.parse (goods);
      this.filteredGoods = JSON.parse (goods);
    });
  },

  methods: {
    makeGETRequest (url, callback) {
      let xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest ();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject ('Microsoft.XMLHTTP');
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) callback (xhr.responseText);
        }
      };

      xhr.open ('GET', url, true);
      xhr.send ();
    },

    makePOSTRequest(url, data, callback) {
      let xhr;
  
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }
  
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
      xhr.send(data);
    },
  

    filterGoods () {
      const regexp = new RegExp (this.searchline, 'i');
      this.filteredGoods = this.goods.filter (good =>
        regexp.test (good.product_name)
      );          
      
    },
  },
});

// class GoodsItem {
//   constructor (product_name, price, id_product) {
//     this.product_name = product_name;
//     this.id_product = id_product;
//     this.price = price;
//   }
//   render () {
//     return `<div class="product-item"><h3 class="item-title">${this.product_name}</h3>
//       <p>${this.price}р.</p><button id="${this.id_product}">Добавить</button></div>`;
//   }
// }

//================================================================

// class GoodsList {
//   constructor () {
//     this.goods = [];
//     this.filteredGoods = [];
//   }

  // fetchGoods () {
  //   // return makeGETRequest (`${API_URL}/catalogData.json`).then (goods => {
  //   //   this.goods = JSON.parse (goods);
  //   //   this.filteredGoods = JSON.parse (goods);
  //   // });
  // }

  // filterGoods (value) {
  //   const regexp = new RegExp (value, 'i');
  //   this.filteredGoods = this.goods.filter (good =>
  //     regexp.test (good.product_name)
  //   );
  //   // this.render ();
  // }

  // render () {
    // let listHtml = '';
    // this.filteredGoods.forEach (good => {
    //   const goodItem = new GoodsItem (
    //     good.product_name,
    //     good.price,
    //     good.id_product
    //   );
    //   listHtml += goodItem.render ();
    // });
    // document.querySelector ('.products').innerHTML = listHtml;
//   }

//   calcSum () {
//     let sum = 0;
//     for (let obj in this.goods) {
//       sum += this.goods[obj].price;
//     }
//     return sum;
//   }
// }

//================================================================

// const list = new GoodsList ();
// list
//   .fetchGoods ()
//   .then (goods => list.render ())
//   .then (() => console.log (list.calcSum ()));

// const searchInput = document.querySelector ('.goods-search');
// searchInput.addEventListener ('input', ({target}) => {
//   const {value} = target;
//   list.filterGoods (value);
// });

//================================================================

// class Cart extends GoodsList {
//   constructor () {
//     super ();
//     list = [];
//     sum = 0;
//   }

//   adding (goodItem) {
//     CartProduct.addingToCart ();
//     this.sum = this.sum + GoodsItem.price;
//     if (this.list.indexOf (goodItem) < 0) {
//       this.list.push (goodItem);
//     }
//   }
//   removing (goodItem) {}
//   render () {}
// }

//================================================================

// class CartProduct extends GoodsItem {
//   constructor () {
//     super ();
//   }

//   addedToCart = false;
//   _amount = 0;

//   addingToCart () {
//     this.addedToCart = true;
//     this._amount++;
//   }
//   removingFromCart () {
//     if (this._amount > 0) {
//       this._amount--;
//     } else this.addedToCart = false;
//   }
//}
