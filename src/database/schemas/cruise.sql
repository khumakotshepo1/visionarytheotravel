CREATE TABLE
  IF NOT EXISTS cabins (
    cabin_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL -- Changed to NUMERIC for fractional prices
  );

CREATE TABLE
  IF NOT EXISTS ships (
    ship_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    cabin_id INTEGER REFERENCES cabins (cabin_id) -- Removed NOT NULL if cabins might not always be associated
  );

CREATE TABLE
  IF NOT EXISTS cruise_itineraries (
    cruise_itinerary_id SERIAL PRIMARY KEY,
    day DATE NOT NULL, -- Changed to DATE for more precise data handling
    location VARCHAR(50) NOT NULL,
    arrive TIME NOT NULL,
    depart TIME NOT NULL,
    map TEXT NOT NULL,
    CONSTRAINT check_times CHECK (arrive < depart) -- Added constraint to ensure arrive time is before depart time
  );

CREATE TABLE
  IF NOT EXISTS cruises (
    cruise_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    embarkation_date DATE NOT NULL,
    disembarkation_date DATE NOT NULL,
    departure_port TEXT NOT NULL,
    ship_id INTEGER REFERENCES ships (ship_id),
    cruise_itinerary_id INTEGER REFERENCES cruise_itineraries (cruise_itinerary_id)
  );

CREATE INDEX idx_ships_cabin_id ON ships (cabin_id);

CREATE INDEX idx_cruises_ship_id ON cruises (ship_id);

CREATE INDEX idx_cruises_itinerary_id ON cruises (cruise_itinerary_id);