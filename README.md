# Geospatial Data API

This application integrates with the OpenWeatherMap API to fetch weather data based on latitude and longitude, and stores this data in a MongoDB database. It provides RESTful endpoints to manage and retrieve geospatial data.

## Features

- Fetches weather data from the OpenWeatherMap API.
- Stores geospatial data (latitude, longitude, weather details) in MongoDB.
- Provides RESTful API endpoints for:
  - Creating new geospatial data entries.
  - Retrieving all geospatial data entries.
  - Retrieving a specific geospatial data entry by ID.
  - Updating an existing geospatial data entry by ID.
  - Deleting a geospatial data entry by ID.
  - Fetching fresh weather data without database interaction.

## Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.
- An API key from OpenWeatherMap (sign up at [OpenWeatherMap](https://openweathermap.org/)).

## Installation

1.  Clone the repository:
 ```bash
    git clone https://github.com/AlvarezJhonn-FS/SERVER-SIDE-LANGUAGES/tree/3.3---Geospatial-Data-API
    ```

2.  Install dependencies:
### Dependencies
```bash

* **axios:** `^1.8.4` - Promise based HTTP client for the browser and node.js.
* **dotenv:** `^16.4.7` - Loads environment variables from a `.env` file.
* **express:** `^4.21.2` - Fast, unopinionated, minimalist web framework for Node.js.
* **mongoose:** `^8.12.1` - Elegant MongoDB object modeling for Node.js.
* **morgan:** `^1.10.0` - HTTP request logger middleware for Node.js.
```
### Dev Dependencies

* **nodemon:** `^3.1.9` - Automatically restarts the node application when file changes in the directory are detected.

## Scripts

* **`npm start`:** Starts the server in production mode.
* **`npm run dev`:** Starts the server in development mode using nodemon.

3.  Create a `.env` file in the root directory and add your MongoDB connection string and OpenWeatherMap API key:

4.  Start the application:

## API Endpoints

- **POST /api/geo-data** = Example : http://localhost:3000/api/geo-data
  - Description: Creates a new geospatial data entry.
  - Request body:
    ```json
    {
      "latitude": 40.7128,
      "longitude": -74.006
    }
    ```
  - Response: Success message and the saved document's ID.
- **GET /api/geo-data** Example : http://localhost:3000/api/geo-data
  - Description: Retrieves all stored geospatial data entries.
  - Response: Array of geospatial data entries.

- **GET /api/geo-data/:id** Example : http://localhost:3000/geoData/67dc9bba1e618f7f35764727
  - Description: Retrieves a specific geospatial data entry by its MongoDB ID.
  - Response: The requested geospatial data entry.

- **PUT /api/geo-data/:id** Example : http://localhost:3000/geoData/67dc9bba1e618f7f35764727
  - Description: Updates a specific geospatial data entry by its MongoDB ID.
  - Request body:
    ```json
    {
      "latitude": 41.0,
      "longitude": -73.0
    }
    ```
  - Response: Success message and the updated geospatial data entry.

- **DELETE /api/geo-data/:id** Example : http://localhost:3000/geoData/67dc9d733b52d39af42d88b0
  - Description: Deletes a specific geospatial data entry by its MongoDB ID.
  - Response: Success message and the deleted geospatial data entry.

- **GET /api/geo-data/weather?latitude=:lat&longitude=:lon** Example : http://localhost:3000/api/geo-data/fetch?latitude=37.7749&longitude=-122.4194
  - Description: Fetches fresh weather data from OpenWeatherMap API.
  - Query parameters:
    - `latitude`: Latitude of the location.
    - `longitude`: Longitude of the location.
  - Response: Weather data.

## MongoDB Schema

- `latitude`: Number (required)
- `longitude`: Number (required)
- `createdAt`: Date (default: current date and time)

## API Documentation

- OpenWeatherMap API: [https://openweathermap.org/api](https://openweathermap.org/api)

## Error Handling

The application includes error handling for API calls and database operations. Appropriate HTTP status codes and error messages are returned in case of failures.

## Code Structure

- `server.js`: Main application file.
- `routes/geoData.js`: Route definitions.
- `controllers/geoDataController.js`: Controller functions.
- `models/geoData.js`: MongoDB schema definition.
- `config/.env`: Configuration file (database connection, API key).
