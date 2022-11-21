DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255) NOT NULL,
  sent_from INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sent_to INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);