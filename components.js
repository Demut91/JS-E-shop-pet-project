Vue.component ('goodslist', {
  name: 'goodslist',
  props: ['tovary', 'dobavlenie'],
  template: `
    <main> 
        <div v-if="tovary.length !== 0" class="products">
            <div v-for="good in tovary"> 
                <goodsitem @dobavlenie="dobavlenie" :odinTovar="good" ></goodsitem>
            </div>
            </div>
        <div v-else class="nodata">Не найдено</div>
    </main>
  `,
});


Vue.component ('goodsitem', {
  name: 'goodsitem',
  props: ['odinTovar'],
  template: `
        <div class="product-item">
            <h3 class="item-title">{{ odinTovar.product_name }}</h3>
            <p>Цена: {{ odinTovar.price }} рублей</p>
            <button @click="$emit('dobavlenie', odinTovar)" class="buy-btn" >В корзину</button>
        </div>
  `,
});

Vue.component ('search', {
  name: 'search',
  props: ['searchline'],
  template: `
        <div>
            <input :value="searchline" @input="$emit('input', $event.target.value)" type="text" class="goods-search" />
            <button @click="$emit('otfiltrovat')" class="search-button btn" type="button">Искать</button>
        </div>
    `,
});

Vue.component ('cart', {
  name: 'cart',
  props: ['basket', 'receivingcart', 'udalenie'],
  data: () => ({
    showCart: false,
  }),

  methods: {
    showing () {
      this.showCart = !this.showCart;
    },
  },
  template: `
    <div class="cartWrapper">
      <button class="btn" @click="showing" type="button">Корзина</button>
        <div :class="['cart', { 'cart--active': showCart }]">        
          <button @click="$emit('receivingcart')" type="button" class="buy-btn">Обновить</button>
            <h2 class="item-title">Корзина</h2>
                <div class="cartProducts">
                  <div v-for="good in basket" class="cartProducts-itemWrapper">
                    <cart-product @udalenie11="udalenie" :good="good" />
                  </div>
                </div>        
        </div>
    </div>
  `,
});

Vue.component ('cart-product', {
  name: 'cart-product',
  props: ['good'],
  template: `
      <div class="cartProducts-item">
          <h4>{{ good.product_name }} - {{ good.price }} p.</h4> 
            <div class="box-for-button"> 
              <button @click="$emit('udalenie11', good)" class="buy-btn">Удалить</button>   
            </div>       
      </div>
  `,
});

