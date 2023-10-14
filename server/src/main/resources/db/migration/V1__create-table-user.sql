CREATE TABLE user (
    id bigint NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL UNIQUE,
    username varchar(100) NOT NULL UNIQUE,
    userAlias varchar(100),
    password varchar(100) NOT NULL,

    PRIMARY KEY(id)
)