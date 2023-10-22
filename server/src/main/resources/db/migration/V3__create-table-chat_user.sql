CREATE TABLE chat_user (
    user_id BIGINT NOT NULL,
    chat_id BIGINT NOT NULL,

    PRIMARY KEY (user_id, chat_id),

    FOREIGN KEY (user_id)
    REFERENCES user(id),

    FOREIGN KEY (chat_id)
    REFERENCES chat(id)
);