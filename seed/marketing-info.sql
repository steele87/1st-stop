DROP DATABASE IF EXISTS marketing_info;

CREATE DATABASE marketing_info;

\c marketing_info;

CREATE TABLE customer_info (
  id SERIAL PRIMARY KEY,
  sms VARCHAR DEFAULT 'no',
  email VARCHAR DEFAULT 'no',
  telephone VARCHAR DEFAULT 'no',
  post VARCHAR DEFAULT 'no',
  datestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id INT
);

INSERT INTO customer_info (customer_id) VALUES
(166445),(162703),(168027),(162084),(168310),(160155),(167223),(164459),(165888);

SELECT * FROM customer_info;
