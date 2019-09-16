const xss = require('xss');

const StoreService = {
  getAllItems(db) {
    return db 
      .from('shop')
      .select(
        'shop.id',
        'shop.item_name',
        'shop.item_desc',
        'shop.date_harvested',
        'shop.price',
        'cat.category'
      )
      .leftJoin(
        'shop_categories AS cat',
        'shop.cat_id',
        'cat.id'
      )
  },
  scrubItem(item) {
    return {
      id: item.id,
      item_name: xss(item.item_name),
      item_desc: xss(item.item_desc),
      date_harvested: item.date_harvested,
      price: item.price,
      category: item.category
    }
  }
};

module.exports = StoreService;