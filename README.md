## SpotSat-Challenge

 A JSON REST API focused in geographic data for the mapping of areas, to simple manage places and areas. It allows you to create, retrieve, update, and delete places. Additionally, it provides a search functionality to find places within a given radius.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL and PostGIS

## Getting Started

 Before you run the program, make sure that you already have the Technologies used installed.

### Installation

1. Create a directory and navigates to it: 
    ```console
    mkdir <directory name>
    cd <directory name>
    ```

2. Clone the repository:
   ```shell
   git clone https://github.com/AugustoBuin/SpotSat-Challenge.git . 
   ```

3. Navigate to root of the directory and Install the packages:
   ```shell 
   cd <directory name>
   npm install 
   ```

4. Configurate your Database in the file 'src\config.js' and in your postgres database by using the file 'db\db_creation.sql'
   
5. Start the server: 
   ```shell
   node .\src\server.js 
   ```

6. Navigate to localhost:3000 in your browser
   You can also change the port in the 'src\server.js' if you want

7. Start testing the endpoints

## Endpoints

// base route: http://localhost:3000/api/

### Places
| Method | Endpoint          |             Functionality                |
|   GET  |    '/places'      |        Returns all the places            |
|  POST  |    '/places'      |          Creates a new place             |
|   GET  |  '/places/:id'    |   Returns the place with the given id    |
| DELETE |  '/places/:id'    |   Deletes the place with the given id    |
|   GET  | '/places/search'  |    Search for place within a circle      |
|   GET  | '/places/distance'|Calculates the distance between two places|
|   GET  |  '/places/within' |     Get the places within an area        |

### Areas
| Method |  Endpoint  |          Functionality           |
|   GET  |  '/areas'  |      Returns all the areas       |
|  POST  |  '/areas'  |       Creates a new area         |
|   GET  |'/areas/:id'|Returns the area with the given id|
| DELETE |'/areas/:id'|Deletes the area with the given id|
