-- Create sequences with starting values
CREATE SEQUENCE package_booking_number_seq START 1000 INCREMENT 1;

CREATE SEQUENCE cruise_booking_number_seq START 1000 INCREMENT 1;

CREATE TABLE
    IF NOT EXISTS customers (
        customer_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        id_number VARCHAR(50),
        passport_number VARCHAR(50),
        passport_issue_date DATE,
        passport_expiry_date DATE,
        passport_country VARCHAR(50) NOT NULL,
        customer_email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address VARCHAR(100),
        date_of_birth DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create tables using these sequences
CREATE TABLE
    IF NOT EXISTS package_bookings (
        package_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('package_booking_number_seq'),
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        package_id INTEGER NOT NULL REFERENCES packages (package_id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS cruise_bookings (
        cruise_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('cruise_booking_number_seq'),
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        cruise_id INTEGER NOT NULL REFERENCES cruises (cruise_id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
        cruise_number_of_adults INTEGER NOT NULL,
        cruise_number_of_kids INTEGER NOT NULL,
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS booking_history (
        history_id SERIAL PRIMARY KEY,
        booking_number BIGINT NOT NULL,
        booking_type VARCHAR(20) NOT NULL, -- 'cruise' or 'package'
        status VARCHAR(20),
        change_date TIMESTAMP DEFAULT NOW (),
        notes TEXT
    );