CREATE DATABASE notes IF NOT EXISTS;
USE notes;
CREATE TABLE IF NOT EXISTS notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    date TEXT NOT NULL,
    route_file VARCHAR(255)
);

INSERT INTO notes.notes (date, text, route_file) VALUES
('2015-02-03', 'asdf', 'asdf'),
('2015-02-03', 'fads', 'fads'),
('2015-02-03', 'jaja', 'jaja');
