const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'testuser1',
      password: 'password',
      date_created: new Date('2018-01-01T12:12:12.123Z')
    }
  ]
}

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

function makeExpectedBlog(blog) {
  return blog.map(post => (
    {
      id: post.id,
      title: post.title,
      preview: post.preview,
      date_posted: post.date_posted.toISOString(),
      category: 'test'
    }
  ))
}

function makeExpectedShop(shop) {
  return shop.map(item => (
    {
      id: item.id,
      item_name: item.item_name,
      item_desc: item.item_desc,
      price: item.price,
      date_harvested: item.date_harvested.toLocaleString(),
      category: 'test'
    }
  ))
}

function makeSiteFixtures() {
  const testUsers = makeUsersArray();
  const blogCat = makeBlogCategories();
  const shopCat = makeShopCategories();
  const testBlog = makeBlogArray(blogCat);
  const testShop = makeShopArray(shopCat);

  return { testUsers, blogCat, shopCat, testBlog, testShop };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        honeyframe_admin,
        contact,
        shop,
        blog,
        shop_categories,
        blog_categories
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE honeyframe_admin_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE contact_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE shop_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE blog_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE shop_categories_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE blog_categories_id_seq minvalue 0 START WITH 1`)
      ])
    )  
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('honeyframe_admin').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('honeyframe_admin_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedBlogCat(db, cat) {
  return db.into('blog_categories').insert(cat)
    .then(() =>
      db.raw(
        `SELECT setval('blog_categories_id_seq', ?)`,
        [cat[cat.length - 1].id],
      )
    )
}

function seedShopCat(db, cat) {
  return db.into('shop_categories').insert(cat)
    .then(() =>
      db.raw(
        `SELECT setval('shop_categories_id_seq', ?)`,
        [cat[cat.length - 1].id],
      )
    )
}

function seedBlog(db, cat, blog) {
  return db.transaction(async trx => {
    await seedBlogCat(trx, cat)
    await trx.into('blog').insert(blog)
    await trx.raw(
      `SELECT setval('blog_id_seq', ?)`,
      [blog[blog.length - 1].id],
    )
  })
}

function seedShop(db, cat, shop) {
  return db.transaction(async trx => {
    await seedShopCat(trx, cat)
    await trx.into('shop').insert(shop)
    await trx.raw(
      `SELECT setval('shop_id_seq', ?)`,
      [shop[shop.length - 1].id],
    )
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeBlogCategories,
  makeShopCategories,
  makeBlogArray,
  makeExpectedBlog,
  makeExpectedShop,

  makeSiteFixtures,
  cleanTables,
  makeAuthHeader,
  seedUsers,
  seedBlogCat,
  seedShopCat,
  seedBlog,
  seedShop,
}