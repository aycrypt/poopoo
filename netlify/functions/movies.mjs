let movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi" },
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999, genre: "Action" },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Thriller" },
    { id: 4, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" },
    { id: 5, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" },
    { id: 6, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" }
];

export default async (req) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    // GET /movies - retrieve all
    if (method === 'GET' && pathname === '/movies') {
        return Response.json(movies);
    }

    // GET /movies/search/:title - search by title (must come before /:id)
    const searchMatch = pathname.match(/^\/movies\/search\/(.+)$/);
    if (method === 'GET' && searchMatch) {
        const movieTitle = decodeURIComponent(searchMatch[1]);
        const movie = movies.find(m => m.title.toLowerCase() === movieTitle.toLowerCase());
        if (!movie) return new Response("movie with that title not found", { status: 404 });
        return Response.json(movie);
    }

    // GET /movies/:id - retrieve by ID
    const idMatch = pathname.match(/^\/movies\/(\d+)$/);
    if (method === 'GET' && idMatch) {
        const movie = movies.find(m => m.id === parseInt(idMatch[1]));
        if (!movie) return new Response("Movie not found", { status: 404 });
        return Response.json(movie);
    }

    // POST /movies - add a new movie
    if (method === 'POST' && pathname === '/movies') {
        const body = await req.json();
        const newMovie = {
            id: movies.length + 1,
            title: body.title,
            director: body.director,
            year: body.year,
            genre: body.genre
        };
        movies.push(newMovie);
        return Response.json(newMovie, { status: 201 });
    }

    // DELETE /movies/:id - remove by ID
    const deleteMatch = pathname.match(/^\/movies\/(\d+)$/);
    if (method === 'DELETE' && deleteMatch) {
        const movieId = parseInt(deleteMatch[1]);
        const index = movies.findIndex(m => m.id === movieId);
        if (index === -1) return new Response("Movie not found", { status: 404 });
        movies.splice(index, 1);
        return new Response(`Movie with ID ${movieId} deleted successfully!`);
    }

    return new Response("Not Found", { status: 404 });
};

export const config = {
    path: '/movies*',
};
