-- Create sequences with starting values
CREATE SEQUENCE package_booking_number_seq START 1000 INCREMENT 1;

CREATE SEQUENCE cruise_booking_number_seq START 1000 INCREMENT 1;

-- Create tables using these sequences
CREATE TABLE
    IF NOT EXISTS package_bookings (
        package_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('package_booking_number_seq'),
        customer_id INTEGER NOT NULL,
        package_id INTEGER NOT NULL,
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS cruise_bookings (
        cruise_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('cruise_booking_number_seq'),
        customer_id INTEGER NOT NULL,
        cruise_id INTEGER NOT NULL,
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

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
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address VARCHAR(100),
        date_of_birth DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );