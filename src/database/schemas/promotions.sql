CREATE TABLE promotions (
    promotion_id SERIAL PRIMARY KEY,
    promotion_name VARCHAR(255) NOT NULL,
    promotion_image VARCHAR(255) NOT NULL,
    promotion_url VARCHAR(255) NOT NULL
);
