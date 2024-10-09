-- Create sequences with starting values
CREATE SEQUENCE package_booking_number_seq START 1000 INCREMENT 1;

CREATE SEQUENCE cruise_booking_number_seq START 1000 INCREMENT 1;

-- Create the customers table
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
        passport_country VARCHAR(50),
        customer_email VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20),
        address VARCHAR(100),
        date_of_birth DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create the package_bookings table
CREATE TABLE
    IF NOT EXISTS package_bookings (
        package_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('package_booking_number_seq'),
        accommodation_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        transportation_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        excursion_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        package_id INTEGER NOT NULL REFERENCES packages (package_id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
        package_balance_due NUMERIC(10, 2) NOT NULL DEFAULT 0,
        cruise_number_of_adults INTEGER NOT NULL,
        cruise_number_of_kids INTEGER NOT NULL,
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create the cruise_bookings table
CREATE TABLE
    IF NOT EXISTS cruise_bookings (
        cruise_booking_number BIGINT PRIMARY KEY DEFAULT nextval ('cruise_booking_number_seq'),
        msc_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        cruise_id INTEGER NOT NULL REFERENCES cruises (cruise_id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL CHECK (
            status IN ('pending', 'confirmed', 'completed', 'cancelled')
        ) DEFAULT 'pending',
        cruise_balance_due NUMERIC(10, 2) NOT NULL DEFAULT 0,
        cruise_number_of_adults INTEGER NOT NULL,
        cruise_number_of_kids INTEGER NOT NULL,
        booked_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE 
    IF NOT EXISTS cruise_booking_payments (
    cruise_booking_payment_id SERIAL PRIMARY KEY,
    cruise_booking_number BIGINT NOT NULL REFERENCES cruise_bookings (cruise_booking_number) ON DELETE CASCADE,
    cruise_payment_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    cruise_payment_method VARCHAR(100) NOT NULL DEFAULT 'cash',
    recieved_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
)

CREATE TABLE 
    IF NOT EXISTS package_booking_payments (
    package_booking_payment_id SERIAL PRIMARY KEY,
    package_booking_number BIGINT NOT NULL REFERENCES package_bookings (package_booking_number) ON DELETE CASCADE,
    package_payment_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    package_payment_method VARCHAR(100) NOT NULL DEFAULT 'cash',
    recieved_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
)

-- Create the cruise_booking_history table
CREATE TABLE
    IF NOT EXISTS cruise_booking_history (
        cruise_booking_history_id SERIAL PRIMARY KEY,
        cruises_booking_number BIGINT NOT NULL,
        msc_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        status VARCHAR(20),
        cruise_payment_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
        booked_by INTEGER NOT NULL,
        deleted_by INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

-- Create the package_booking_history table
CREATE TABLE
    IF NOT EXISTS package_booking_history (
        package_booking_history_id SERIAL PRIMARY KEY,
        package_booking_number BIGINT NOT NULL,
        accommodation_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        transportation_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        excursion_ref_number VARCHAR(100) NOT NULL DEFAULT '0',
        customer_id INTEGER NOT NULL REFERENCES customers (customer_id) ON DELETE CASCADE,
        status VARCHAR(20),
        package_payment_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
        booked_by INTEGER NOT NULL,
        deleted_by INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );
