-- common info that should be shown at the list of the users.
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar(32) NOT NULL UNIQUE,
    avatar_link varchar(64),
    short_info varchar(128),
    last_enter timestamp NOT NULL DEFAULT now()
);

-- user info to user card.
CREATE TABLE users_data (
    user_id integer NOT NULL PRIMARY KEY,
    firstname varchar(32) NOT NULL,
    middlename varchar(32),
    lastname varchar(64) NOT NULL,
    birthday date,
    city varchar(64),
    bio text,
    create_date timestamp NOT NULL DEFAULT now(),
    email varchar(255) UNIQUE NOT NULL,
    CONSTRAINT proper_email CHECK (
        email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- group of threads and users
CREATE TABLE groups(
    group_id serial PRIMARY KEY,
    group_name varchar(64) NOT NULL,
    group_info varchar(255) NOT NULL,
    create_date timestamp NOT NULL DEFAULT now()
);

-- dialog (thread) in a group
CREATE TABLE threads(
    thread_id serial PRIMARY KEY,
    group_id integer NOT NULL,
    thread_name varchar(64) NOT NULL,
    create_date timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);

-- users in group. Each user can join many groups
CREATE TABLE users_to_groups(
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);

-- messages
-- common data
CREATE TABLE messages(
    message_id serial PRIMARY KEY,
    sender_id integer NOT NULL,
    message_text text,
    FOREIGN KEY (sender_id) REFERENCES users (user_id)
);

-- thread messages. From user to thread
CREATE TABLE thread_messages(
    message_id integer NOT NULL,
    thread_id integer NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (message_id) REFERENCES messages (message_id),
    FOREIGN KEY (thread_id) REFERENCES threads (thread_id)
);

--private messages. From user to user
CREATE TABLE private_messages(
    message_id integer NOT NULL,
    reciever_id integer NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (message_id) REFERENCES messages (message_id),
    FOREIGN KEY (reciever_id) REFERENCES users (user_id)
);