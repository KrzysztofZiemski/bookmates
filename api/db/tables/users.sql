
 CREATE TABLE users (

  id SERIAL,
   password_salt VARCHAR(16) NOT NULL,
   passworh_hash VARCHAR(128) NOT NULL,
   name VARCHAR(32) NOT NULL,
   surname VARCHAR(32) NOT NULL,
   country VARCHAR(32) NOT NULL,
   city VARCHAR(64) NOT NULL,
   postal_code VARCHAR(32) NOT NULL,
   region VARCHAR(32),
   street_name varchar(64) NOT NULL,
   street_number VARCHAR(16) NOT NULL,
   local_number VARCHAR (16),
   coordinates point not NULL,
   gender VARCHAR(16),
   birth VARCHAR(16)
     primary key(id)
 )