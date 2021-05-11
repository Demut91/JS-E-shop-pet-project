Vue.component ('goodslist', {
  name: 'goodslist',
  props: ['tovary', 'addToCart'],
  template: `
    <main> 
        <div v-if="tovary.length !== 0" class="products">
            <div v-for="good in tovary"> 
                <goodsitem @dobavlenie="addToCart" :odinTovar="good" ></goodsitem>
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
            <button @click="$emit('dobavlenie', odinTovar)" class="buy-btn" > {{ odinTovar.id_product }} В корзину</button>
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

// 

Vue.component ('cart', {
  name: 'cart',
  props: ['goods'],
  data: () => ({
    showCart: false,
  }),

  methods: {
    showing () {
      this.showCart = !this.showCart;
    },
  },
  template: `
        <div>
            <div :class="['cart', { 'cart--active': showCart }]">
                <h2 class="item-title">Корзина</h2>
            </div>
            <button class="btn" @click="showing" type="button">Корзина</button>
        </div>
    `,
});
