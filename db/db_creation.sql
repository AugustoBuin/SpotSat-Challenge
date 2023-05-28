CREATE DATABASE IF NOT EXISTS spotsatdb;
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS place (
	place_id SERIAL PRIMARY KEY,
	place_name VARCHAR(50) UNIQUE NOT NULL,
	place_latitude FLOAT NOT NULL,
	place_longitude FLOAT NOT NULL
);
CREATE TABLE IF NOT EXISTS area (
	area_id SERIAL PRIMARY KEY,
	area_name VARCHAR(50) UNIQUE NOT NULL,
	polygon_geom geometry(Polygon, 4326)
);