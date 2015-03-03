CREATE TABLE product
(
	product_asin VARCHAR(25),
	tweet_id BIGINT,
	user_id BIGINT,
	tweet_text VARCHAR(150),
	tweet_created_on DATETIME(0),
	user_screen_name VARCHAR(50),
	user_name VARCHAR(50)
) 
;