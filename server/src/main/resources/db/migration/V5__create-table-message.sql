CREATE TABLE message (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(500) NOT NULL,
  sent_at DATETIME NOT NULL,

  sender_id BIGINT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES user(id),

  chat_id BIGINT NOT NULL,
  FOREIGN KEY (chat_id) REFERENCES chat(id)
);