const express = require('express'); // Importing the Express library to create our server
const app = express(); // Initializing the Express application
app.use(express.json());  // Middleware to parse JSON bodies from incoming requests

// Our "Database" for today - now with more data points!
let movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi" },
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999, genre: "Action" },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Thriller" },
    { id: 4, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" },
    { id: 5, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" },
    { id: 6, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" }
   
];

// 1. GET Method: Retrieve the whole collection
app.get('/movies', (req, res) => {
    res.json(movies); // The "Response" from your lecture
});


// hi this is assignment
// mission: get route that targets the movie title so when user types a title in the url, theyll recieve d matching record
app.get('/movies/search/:title', (req, res) => {
    const movieTitle = req.params.title;
    const movie = movies.find(m => m.title.toLowerCase() === movieTitle.toLowerCase()); //case insensitive cause ai smart

    if (!movie) {
        return res.status(404).send("movie with that title not found");
    }// if no movie found, which has the not found 404 status, user is let know

    res.json(movie); //returns the entire movie object, includes director year n genre
});// hurray
   // also its placed before the id route to prevent conflicts, otherwise it might try to interpret the title as an ID and cause issues


// 3. GET Method: Retrieve a specific movie by ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
});

// 3. POST Method: Add a new movie
app.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre
    }; //same structure as the existing movies to maintain consistency
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// 4. DELETE Method: Remove a movie by ID
app.delete('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id); // Get the ID from the URL
    const index = movies.findIndex(m => m.id === movieId);

    if (index === -1) {
        return res.status(404).send("Movie not found"); // Error if ID doesn't exist
    }

    movies.splice(index, 1); // Delete the movie from the list
    res.send(`Movie with ID ${movieId} deleted successfully!`);
});



app.listen(3000, () => console.log('Movie API running on http://localhost:3000'));