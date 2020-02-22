create TABLE books
 (
   id SERIAL,
   isbn INTEGER UNIQUE NOT NULL,
   title VARCHAR(256) NOT NULL,
   authors VARCHAR(128) ARRAY NOT NULL,
   publishedYear INTEGER(4) NOT NULL,
   imageURL VARCHAR(100),
   description VARCHAR(1000),
     primary key(id)
 )
 