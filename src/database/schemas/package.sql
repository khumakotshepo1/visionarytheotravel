-- Create the package_itineraries table
CREATE TABLE
  IF NOT EXISTS package_itineraries (
    package_itinerary_id SERIAL PRIMARY KEY,
    package_itinerary_name TEXT NOT NULL,
    day DATE NOT NULL,
    location VARCHAR(50) NOT NULL,
    arrive TIME NOT NULL,
    depart TIME NOT NULL,
    CONSTRAINT check_arrive_depart CHECK (arrive < depart)
  );

-- Create the excursions table
CREATE TABLE
  IF NOT EXISTS excursions (
    excursion_id SERIAL PRIMARY KEY,
    excursion_name TEXT NOT NULL,
    excursion_image TEXT NOT NULL
  );

-- Create the accommodations table
CREATE TABLE
  IF NOT EXISTS accommodations (
    accommodation_id SERIAL PRIMARY KEY,
    accommodation_name TEXT NOT NULL,
    accommodation_address TEXT NOT NULL,
    accommodation_image TEXT NOT NULL
  );

-- Create the transportation table
CREATE TABLE
  IF NOT EXISTS transportation (
    transportation_id SERIAL PRIMARY KEY,
    transportation_name TEXT NOT NULL,
    transportation_type TEXT NOT NULL, -- Specify type (e.g., bus, train)
    transportationimage TEXT NOT NULL
  );

-- Create the packages table
CREATE TABLE
  IF NOT EXISTS packages (
    package_id SERIAL PRIMARY KEY,
    accommodation_id INTEGER REFERENCES accommodations (accommodation_id) ON DELETE SET NULL,
    transportation_id INTEGER REFERENCES transportation (transportation_id) ON DELETE SET NULL,
    package_itinerary_id INTEGER REFERENCES package_itineraries (package_itinerary_id) ON DELETE SET NULL,
    excursion_id INTEGER REFERENCES excursions (excursion_id) ON DELETE SET NULL,
    package_name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    departure_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    package_map TEXT NOT NULL,
    package_image TEXT NOT NULL,
    package_price NUMERIC(10, 2) NOT NULL,
    CONSTRAINT check_dates CHECK (arrival_date < departure_date)
  );

-- Create indexes for improved query performance
CREATE INDEX idx_packages_excursion_id ON packages (excursion_id);

CREATE INDEX idx_packages_accommodation_id ON packages (accommodation_id);

CREATE INDEX idx_packages_transportation_id ON packages (transportation_id);

CREATE INDEX idx_packages_itinerary_id ON packages (package_itinerary_id);