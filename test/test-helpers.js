function makeBlogCategories() {
  return [
    {
      id: 1,
      category: 'test'
    }
  ]
}

function makeShopCategories() {
  return [
    {
      id: 1,
      category: 'test'
    }
  ]
}

function makeBlogArray(cat) {
  return [
    {
      id: 1,
      title: 'Test',
      preview: 'Post...',
      post: 'Post test post test post',
      date_posted: new Date('2019-01-05T12:12:12.123Z'),
      cat_id: cat[0].id
    },
    {
      id: 2,
      title: 'Test 2',
      preview: 'Post...',
      post: 'Post test post test post',
      date_posted: new Date('2019-02-05T12:12:12.123Z'),
      cat_id: cat[0].id
    }
  ]
}

function makeShopArray(cat) {
  return [
    {
      id: 1,
      item_name: 'Test',
      item_desc: 'This is a description',
      price: '7.50',
      date_harvested: '2019-07-01',
      cat_id: cat[0].id
    },
    {
      id: 2,
      item_name: 'Test 2',
      item_desc: 'This is a description',
      price: '7.50',
      date_harvested: '2019-07-01',
      cat_id: cat[0].id
    }
  ]
}

function makeSiteFixtures() {
  const blogCat = makeBlogCategories();
  const shopCat = makeShopCategories();
  const testBlog = makeBlogArray(blogCat);
  const testShop = makeShopArray(shopCat);

  return { testBlog, testShop };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        contact,
        shop,
        blog,
        shop_categories,
        blog_categories
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE contact_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE shop_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE blog_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE shop_categories_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE blog_categories_id_seq minvalue 0 START WITH 1`)
      ])
    )  
  )
}

module.exports = {
  makeBlogCategories,
  makeShopCategories,
  makeBlogArray,

  makeSiteFixtures,
  cleanTables,
}