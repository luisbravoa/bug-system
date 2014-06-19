CREATE TABLE applications
(
    id int PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL
)

CREATE TABLE "environments"
(
    id int PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
)

CREATE TABLE bugs
(
  id INTEGER PRIMARY KEY,
  application_id int NOT NULL,
  environment_id int NOT NULL,
  country TEXT NOT NULL,
  language TEXT NOT NULL,
  os TEXT,
  os_version TEXT,
  application_version TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  steps TEXT,
  booking_id int,
  user_id int,
  driver_id int,
  browser TEXT,
  browser_version TEXT
)

CREATE TABLE files
(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  bug_id int NOT NULL
)

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT,
  created TEXT,
  token TEXT NULL,
  role TEXT NULL,
  name TEXT NULL
)

