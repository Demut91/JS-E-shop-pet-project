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
  props: ['basket', 'receivingcart'],
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
          <button @click="$emit('receivingcart')" type="button">получить</button>
            <h2 class="item-title">Корзина</h2>
                <div class="cartProducts">
                  <div v-for="good in basket" class="cartProducts-itemWrapper">
                    <cart-product :good="good" />
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
          <h4 class="item-title">{{ good.product_name }}</h4>
          <p> {{ good.price }} p.</p>          
      </div>
  `,
});

