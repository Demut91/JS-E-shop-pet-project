Vue.component ('goodslist', {
  name: 'goodslist',
  props: ['goods'],
  template: `
<main> 
    <div v-if="goods.length !== 0" class="products">
        <div v-for="good in goods"> 
            <goodsitem :good="good" ></goodsitem>
        </div>
    </div>
    <div v-else class="nodata">Не найдено</div>
</main>
`,
});

Vue.component ('goodsitem', {
  name: 'goodsitem',
  props: ['good'],
  template: `
        <div class="product-item">
            <h3 class="item-title">{{ good.product_name }}</h3>
            <p> {{ good.price }}</p>
        </div>
    `,
});
