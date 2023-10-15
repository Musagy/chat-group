CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email varchar(100) NOT NULL UNIQUE,
    username varchar(100) NOT NULL UNIQUE,
    userAlias varchar(100),
    password varchar(100) NOT NULL
);