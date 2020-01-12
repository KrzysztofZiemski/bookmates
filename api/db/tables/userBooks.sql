CREATE TABLE user_books(
  user_id SERIAL REFERENCES users(id),
  user_book_id SERIAL NOT NULL,
  user_book_title VARCHAR(64) NOT NULL,
  user_book_author VARCHAR(64) NOT NULL,
  user_book_ISBN VARCHAR(16),
  user_book_genre VARCHAR(16) NOT NULL,
  user_book_rating INTEGER,
  user_book_status VARCHAR(16) NOT NULL,
  
  PRIMARY KEY (user_id, user_book_id)
)