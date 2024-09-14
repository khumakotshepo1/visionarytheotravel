CREATE TABLE
  IF NOT EXISTS verification_token (
    expires TIMESTAMP NOT NULL,
    token TEXT PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    password TEXT,
    role VARCHAR(8) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'AGENT', 'MANAGER')),
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  IF NOT EXISTS accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    providerAccount_id VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at TIMESTAMP,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT
  );

CREATE TABLE
  IF NOT EXISTS sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE
  );