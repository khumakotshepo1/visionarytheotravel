CREATE TABLE
  IF NOT EXISTS package_itineraries (
    package_itinerary_id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    location VARCHAR(50) NOT NULL,
    arrive TIME NOT NULL,
    depart TIME NOT NULL,
    map TEXT NOT NULL,
    CONSTRAINT check_times CHECK (arrive < depart)
  );

CREATE TABLE
  IF NOT EXISTS excursions (
    excursion_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS accommodations (
    accommodation_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    image TEXT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS transportation (
    transportation_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    image TEXT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS packages (
    package_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    departure_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    departure_port TEXT NOT NULL,
    excursion_id INTEGER REFERENCES excursions (excursion_id),
    accommodation_id INTEGER REFERENCES accommodations (accommodation_id),
    transportation_id INTEGER REFERENCES transportation (transportation_id),
    package_itinerary_id INTEGER REFERENCES package_itineraries (package_itinerary_id),
    price NUMERIC(10, 2) NOT NULL
  );

CREATE INDEX idx_packages_excursion_id ON packages (excursion_id);

CREATE INDEX idx_packages_accommodation_id ON packages (accommodation_id);

CREATE INDEX idx_packages_transportation_id ON packages (transportation_id);

CREATE INDEX idx_packages_itinerary_id ON packages (package_itinerary_id);