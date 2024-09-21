CREATE TABLE
  IF NOT EXISTS ships (
    ship_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    type TEXT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS cabins (
    cabin_id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL REFERENCES ships (ship_id),
    name TEXT NOT NULL,
    image TEXT NOT NULL
  );

INSERT INTO
  cabins (name, image, ship_id)
VALUES
  ('Inside', 'path/to/inside_cabin.jpg', 1),
  ('Oceanview', 'path/to/oceanview_cabin.jpg', 1),
  ('Balcony', 'path/to/balcony_cabin.jpg', 1),
  ('Suite', 'path/to/suite_cabin.jpg', 1);

CREATE TABLE
  IF NOT EXISTS cruise_itineraries (
    cruise_itinerary_id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    location VARCHAR(50) NOT NULL,
    arrive TIME NOT NULL,
    depart TIME NOT NULL,
    map TEXT NOT NULL,
    CONSTRAINT check_times CHECK (arrive < depart)
  );

CREATE TABLE
  IF NOT EXISTS cruises (
    cruise_id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships (ship_id),
    cruise_itinerary_id INTEGER REFERENCES cruise_itineraries (cruise_itinerary_id),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    embarkation_date DATE NOT NULL,
    disembarkation_date DATE NOT NULL,
    departure_port TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
  );

CREATE INDEX idx_cabins_ship_id ON cabins (ship_id);

CREATE INDEX idx_cruises_ship_id ON cruises (ship_id);

CREATE INDEX idx_cruises_itinerary_id ON cruises (cruise_itinerary_id);