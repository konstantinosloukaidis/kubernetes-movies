CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    release_year INT NOT NULL,
    duration INT NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_movies (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    review TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

INSERT INTO movie (name, release_year, duration) VALUES
('The Shawshank Redemption', 1994, 142),
('The Godfather', 1972, 175),
('The Dark Knight', 2008, 152),
('Pulp Fiction', 1994, 154),
("Schindler's List", 1993, 195);

INSERT INTO user (username, email) VALUES
('john_doe'),
('jane_smith'),
('alice_jones');

INSERT INTO user_movies (user_id, movie_id, review, rating) VALUES
(1, 1, 'An inspiring story of hope and friendship.', 5),
(1, 2, 'A masterpiece of storytelling.', 5),
(2, 3, 'A thrilling and dark portrayal of crime.', 4),
(3, 4, 'A unique blend of humor and violence.', 4),
(1, 5, 'A powerful depiction of human resilience.', 5),
(2, 1, 'A timeless classic that never gets old.', 5),
(3, 2, 'An epic tale of power and betrayal.', 4);