BEGIN;

TRUNCATE
  contact,
  shop,
  blog,
  shop_categories,
  blog_categories
  RESTART IDENTITY CASCADE;

INSERT INTO shop_categories (category)
VALUES
  ('Honey'),
  ('Beeswax'),
  ('Comb'),
  ('Other');

INSERT INTO blog_categories (category)
VALUES
  ('News'),
  ('Personal'),
  ('Shop'),
  ('Other');

INSERT INTO shop (
  item_name,
  item_desc,
  img_url,
  price,
  date_harvested,
  cat_id
)
VALUES
  (
    'Honey',
    'Early summer honey with floral notes',
    'img/store/honey.jpg',
    7.50,
    '2019-06-07',
    1
  ),
  (
    'Honey',
    'Late summer honey with a fruitier flavor profile',
    'img/store/honey.jpg',
    7.50,
    '2019-08-07',
    1
  ),
  (
    'Beeswax',
    'Unprocessed beeswax',
    'img/store/wax.jpg',
    5.00,
    '2019-06-07',
    2
  ),
  (
    'Beeswax Candles',
    'Hand-rolled candles made with beeswax',
    null,
    6.50,
    '2019-06-07',
    2
  ),
  (
    'Raw Comb',
    'Raw honeycomb, fresh from the hive!',
    'img/store/wax.jpg',
    5.00,
    '2019-08-07',
    3
  );

INSERT INTO blog (
  title,
  preview,
  post,
  cat_id
)
VALUES
  (
    'Welcome!',
    'Hello everyone! This is the first-ever blog post at Honeyframe, a fictional small business that sells honey...',
    'Hello everyone! This is the first-ever blog post at Honeyframe, a fictional small business that sells honey and beeswax! This site and fictional business were created as a capstone project for Sam Parkinson to show off his front-end and back-end coding skills, and the framework is designed loosely enough that the site should be relatively easy to repurpose for a different small business. The styling will need to be redone, and the database and related queries rebuilt, but the architecture should remain in place.
    ',
    1
  ),
  (
    'Bees are neat!',
    'Bees are really neat! They make honey and wax, and also pollinate flowers! Fun fact:...',
    'Bees are really neat! They make honey and wax, and also pollinate flowers! Fun fact: the guy who made this website is actually quite terrified of bees. But honeycombs are a cool geometric structure!
    ',
    1
  ),
  (
    'Check Out the Shop!',
    'By clicking the link at the top of the page, you can see what products are in stock in our shop! We have...',
    'By clicking the link at the top of the page, you can see what products are in stock in our shop! We have a few different harvests of honey for sale. Since the bees are active throughout the summer, they harvest from flowers that bloom at different times of the year. As a result, different batches of honey have subtle differences in flavor! If you want, you can buy a sample pack of small jars of honey from different harvests so you can figure out which honey is your favorite.
    ',
    3
  );

COMMIT;