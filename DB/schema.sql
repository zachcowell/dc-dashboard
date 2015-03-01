SET FOREIGN_KEY_CHECKS=0;




CREATE TABLE product
(
	id BIGINT NOT NULL AUTO_INCREMENT,
	url_id BIGINT,
	times_seen INTEGER,
	first_seen DATETIME(0),
	last_seen DATETIME(0),
	PRIMARY KEY (id),
	INDEX IXFK_product_url (url_id ASC)

) 
;


CREATE TABLE tweet
(
	id BIGINT NOT NULL,
	user_id BIGINT,
	text VARCHAR(150),
	created_on DATETIME(0),
	PRIMARY KEY (id),
	INDEX IXFK_tweet_user (user_id ASC)

) 
;


CREATE TABLE url
(
	id BIGINT NOT NULL AUTO_INCREMENT,
	tweet_id BIGINT,
	url VARCHAR(250),
	display_url VARCHAR(250),
	expanded_url VARCHAR(250),
	PRIMARY KEY (id),
	INDEX IXFK_url_tweet (tweet_id ASC)

) 
;


CREATE TABLE user
(
	id BIGINT NOT NULL,
	screen_name VARCHAR(50),
	name VARCHAR(50),
	PRIMARY KEY (id)

) 
;



SET FOREIGN_KEY_CHECKS=1;


ALTER TABLE product ADD CONSTRAINT FK_product_url 
	FOREIGN KEY (url_id) REFERENCES url (id)
;

ALTER TABLE tweet ADD CONSTRAINT FK_tweet_user 
	FOREIGN KEY (user_id) REFERENCES user (id)
;

ALTER TABLE url ADD CONSTRAINT FK_url_tweet 
	FOREIGN KEY (tweet_id) REFERENCES tweet (id)
;
