-- Goods
CREATE TABLE goods (
    good_id serial PRIMARY KEY,
    title varchar(256) NOT NULL,
    price numeric NOT NULL,
    in_stock integer DEFAULT 0,
    sale numeric DEFAULT 0
);

CREATE TABLE tags (
    tag_id serial PRIMARY KEY,
    tag varchar(32) NOT NULL
);

CREATE TABLE tags_to_goods (
    tag_id integer NOT NULL,
    good_id integer NOT NULL,
    PRIMARY KEY (tag_id, good_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id),
    FOREIGN KEY (good_id) REFERENCES goods (good_id)
);

-- Customers
CREATE TABLE customers (
    customer_id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    firstname varchar(32) NOT NULL,
    middlename varchar(32),
    lastname varchar(64) NOT NULL,
    birthday date,
    create_date timestamp NOT NULL DEFAULT now(),
    last_enter timestamp NOT NULL DEFAULT now(),
    CONSTRAINT proper_email CHECK (
        email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    )
);

-- Orders
CREATE TABLE order_statuses (
    order_status_id serial PRIMARY KEY,
    next_state integer,
    title varchar(32) NOT NULL UNIQUE,
    FOREIGN KEY (next_state) REFERENCES order_statuses (order_status_id)
);

CREATE TABLE orders (
    order_id serial PRIMARY KEY,
    customer_id integer NOT NULL,
    create_date timestamp NOT NULL DEFAULT now(),
    order_status_id integer NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (order_status_id) REFERENCES order_statuses (order_status_id)
);

CREATE TABLE goods_to_orders (
    order_id integer NOT NULL,
    good_id integer NOT NULL,
    amount integer NOT NULL DEFAULT 1,
    PRIMARY KEY (order_id, good_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (good_id) REFERENCES goods (good_id)
);