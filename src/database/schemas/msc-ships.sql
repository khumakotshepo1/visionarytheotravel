CREATE TABLE
  msc_cruise_ships (
    id SERIAL PRIMARY KEY, -- Unique identifier for each ship
    name VARCHAR(255) NOT NULL, -- Name of the ship
    status VARCHAR(20) NOT NULL CHECK (status IN ('operational', 'upcoming')), -- Status of the ship
    class VARCHAR(50) NOT NULL -- Class of the cruise ship
  );

INSERT INTO
  msc_cruise_ships (name, status, class)
VALUES
  ('MSC Grandiosa', 'operational', 'Meraviglia'),
  ('MSC Virtuosa', 'operational', 'Meraviglia'),
  ('MSC Seashore', 'operational', 'Seaside'),
  ('MSC Seaview', 'operational', 'Seaside'),
  ('MSC Bellissima', 'operational', 'Meraviglia'),
  ('MSC Meraviglia', 'operational', 'Meraviglia'),
  ('MSC Lirica', 'operational', 'Lirica'),
  ('MSC Armonia', 'operational', 'Lirica'),
  ('MSC Opera', 'operational', 'Lirica'),
  ('MSC Sinfonia', 'operational', 'Lirica'),
  ('MSC Magnifica', 'operational', 'Musica'),
  ('MSC Divina', 'operational', 'Fantasia'),
  ('MSC Preziosa', 'operational', 'Fantasia'),
  ('MSC Splendida', 'operational', 'Fantasia'),
  ('MSC Fantasia', 'operational', 'Fantasia'),
  ('MSC Orchestra', 'operational', 'Musica'),
  ('MSC Poesia', 'operational', 'Musica'),
  ('MSC World Europa', 'operational', 'World'),
  ('MSC World America', 'upcoming', 'World'),
  ('MSC Euribia', 'operational', 'World'),
  ('MSC Seascape', 'operational', 'Seaside'),
  ('MSC Musica', 'operational', 'Musica');