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
  price,
  date_harvested,
  cat_id
)
VALUES
  (
    'Honey',
    '<img src="" alt="honey" /><p>Early summer honey with floral notes</p>',
    7.50,
    '2019-06-07',
    1
  ),
  (
    'Honey',
    '<img src="" alt="honey" /><p>Late sumer honey with </p>',
    7.50,
    '2019-08-07',
    1
  ),
  (
    'Beeswax',
    '<img src="" alt="beeswax" /><p>Unprocessed beeswax</p>',
    5.00,
    '2019-06-07',
    2
  ),
  (
    'Beeswax Candles',
    'Hand-rolled candles made with beeswax',
    6.50,
    '2019-06-07',
    2
  ),
  (
    'Raw Comb',
    '<img src="" alt="raw honey comb" /><p></p>',
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
    'Filler Title',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed 
      egestas egestas fringilla phasellus. Aliquam ultrices sagittis orci a scelerisque. 
      Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Vitae auctor eu augue ut. 
      Libero id faucibus nisl tincidunt eget. Quis auctor elit sed vulputate mi. Nisl nisi scelerisque eu ultrices vitae auctor. 
      Purus ut faucibus pulvinar elementum integer enim neque volutpat. Volutpat est velit egestas dui id ornare. Rutrum tellus pellentesque eu 
      tincidunt tortor aliquam nulla. Ut placerat orci nulla pellentesque dignissim enim sit. Neque volutpat ac tincidunt vitae semper. Vitae auctor eu augue 
      ut. Congue mauris rhoncus aenean vel elit scelerisque. Curabitur gravida arcu ac tortor dignissim convallis.
    ',
    1
  ),
  (
    'Second Filler Title',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed 
      egestas egestas fringilla phasellus. Aliquam ultrices sagittis orci a scelerisque. 
      Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Vitae auctor eu augue ut. 
      Libero id faucibus nisl tincidunt eget. Quis auctor elit sed vulputate mi. Nisl nisi scelerisque eu ultrices vitae auctor. 
      Purus ut faucibus pulvinar elementum integer enim neque volutpat. Volutpat est velit egestas dui id ornare. Rutrum tellus pellentesque eu 
      tincidunt tortor aliquam nulla. Ut placerat orci nulla pellentesque dignissim enim sit. Neque volutpat ac tincidunt vitae semper. Vitae auctor eu augue 
      ut. Congue mauris rhoncus aenean vel elit scelerisque. Curabitur gravida arcu ac tortor dignissim convallis.
    ',
    1
  ),
  (
    'Third Filler Title',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque...',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed 
      egestas egestas fringilla phasellus. Aliquam ultrices sagittis orci a scelerisque. 
      Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Vitae auctor eu augue ut. 
      Libero id faucibus nisl tincidunt eget. Quis auctor elit sed vulputate mi. Nisl nisi scelerisque eu ultrices vitae auctor. 
      Purus ut faucibus pulvinar elementum integer enim neque volutpat. Volutpat est velit egestas dui id ornare. Rutrum tellus pellentesque eu 
      tincidunt tortor aliquam nulla. Ut placerat orci nulla pellentesque dignissim enim sit. Neque volutpat ac tincidunt vitae semper. Vitae auctor eu augue 
      ut. Congue mauris rhoncus aenean vel elit scelerisque. Curabitur gravida arcu ac tortor dignissim convallis.
    ',
    2
  );

COMMIT;