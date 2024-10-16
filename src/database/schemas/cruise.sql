-- Create the ships table
CREATE TABLE
  IF NOT EXISTS ships (
    ship_id SERIAL PRIMARY KEY,
    ship_name TEXT NOT NULL,
    ship_image TEXT NOT NULL,
    ship_class TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW (),
    UNIQUE (ship_name) -- Unique index on ship_name
  );

-- Create the cabins table
CREATE TABLE
  IF NOT EXISTS cabins (
    cabin_id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL REFERENCES ships (ship_id) ON DELETE CASCADE,
    cabin_name TEXT NOT NULL,
    cabin_image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW (),
    UNIQUE (cabin_name, ship_id) -- Unique index on cabin_name within the same ship
  );


-- Create the cruises table
CREATE TABLE
  IF NOT EXISTS cruises (
    cruise_id SERIAL PRIMARY KEY,
    cruise_name TEXT NOT NULL,
    description TEXT NOT NULL,
    cruise_image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  IF NOT EXISTS cruise_dates (
    cruise_date_id SERIAL PRIMARY KEY,
    cruise_id INTEGER NOT NULL REFERENCES cruises (cruise_id) ON DELETE CASCADE,
    ship_id INTEGER REFERENCES ships (ship_id) ON DELETE SET NULL ON UPDATE CASCADE,
    embarkation_date DATE NOT NULL,
    disembarkation_date DATE NOT NULL,
    duration VARCHAR(20) NOT NULL,
    departure_port TEXT NOT NULL,
    cruise_destination TEXT NOT NULL,
    cruise_price NUMERIC(10, 2) NOT NULL CHECK (cruise_price >= 0),
    map_image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW (),
    CONSTRAINT check_dates CHECK (embarkation_date < disembarkation_date),
    UNIQUE (cruise_id, embarkation_date) -- Unique index on embarkation_date for each cruise
  );

-- Create the cruise_itineraries table
CREATE TABLE
  IF NOT EXISTS cruise_itineraries (
    cruise_itinerary_id SERIAL PRIMARY KEY,
    cruise_date_id INTEGER NOT NULL REFERENCES cruise_dates (cruise_date_id) ON DELETE CASCADE,
    day VARCHAR(10) NOT NULL,
    location VARCHAR(50) NOT NULL,
    arrive TIME,
    depart TIME,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW (),
    UNIQUE (cruise_date_id, day, location) -- Unique index on day and location for each cruise date
  );


CREATE TABLE prev_cruise_total_price(
    id SERIAL PRIMARY KEY,
    prev_cruise_total_price NUMERIC(10, 2) DEFAULT 0.00,  -- Previous total price, defaults to 0.00
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the record was last updated
);

-- Create optimized indexes for faster querying
CREATE INDEX idx_cabins_ship_id ON cabins (ship_id);

CREATE INDEX idx_cruises_ship_id ON cruises (ship_id);

CREATE INDEX idx_cruise_itineraries_cruise_id ON cruise_itineraries (cruise_id);

CREATE INDEX idx_cruise_destination_embarkation ON cruises (cruise_destination, embarkation_date);

-- Composite index
CREATE INDEX idx_departure_port ON cruises (departure_port);

-- Index for departure port
