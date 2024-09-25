-- Create the ships table
CREATE TABLE
  IF NOT EXISTS ships (
    ship_id SERIAL PRIMARY KEY,
    ship_name TEXT NOT NULL,
    ship_image TEXT NOT NULL,
    ship_class TEXT NOT NULL
  );

-- Create the cabins table
CREATE TABLE
  IF NOT EXISTS cabins (
    cabin_id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL REFERENCES ships (ship_id) ON DELETE CASCADE,
    cabin_name TEXT NOT NULL,
    cabin_image TEXT NOT NULL
  );

-- Create the cruises table
CREATE TABLE
  IF NOT EXISTS cruises (
    cruise_id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships (ship_id) ON DELETE SET NULL,
    cruise_destination TEXT NOT NULL,
    cruise_name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    embarkation_date DATE NOT NULL,
    disembarkation_date DATE NOT NULL,
    departure_port TEXT NOT NULL,
    cruise_price NUMERIC(10, 2) NOT NULL,
    map_image TEXT NOT NULL,
    cruise_image TEXT NOT NULL,
    CONSTRAINT check_dates CHECK (embarkation_date < disembarkation_date)
  );

-- Create the cruise_itineraries table
CREATE TABLE
  IF NOT EXISTS cruise_itineraries (
    cruise_itinerary_id SERIAL PRIMARY KEY,
    cruise_id INTEGER NOT NULL REFERENCES cruises (cruise_id) ON DELETE CASCADE,
    day VARCHAR(10) NOT NULL,
    location VARCHAR(50) NOT NULL,
    arrive TIME,
    depart TIME
  );

-- Create indexes for faster querying
CREATE INDEX idx_cabins_ship_id ON cabins (ship_id);

CREATE INDEX idx_cruises_ship_id ON cruises (ship_id);

CREATE INDEX idx_cruise_itineraries_cruise_id ON cruise_itineraries (cruise_id);