CREATE TABLE users (
  user_id serial PRIMARY KEY,
  firstname varchar(24) NOT NULL,
  lastname varchar(64) NOT NULL,
  username varchar(64) NOT NULL
);

CREATE TABLE tasks (
  task_id serial PRIMARY KEY,
  title varchar(256),
  create_date timestamp NOT NULL DEFAULT now(),
  due_date timestamp,
  finish_date timestamp,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);