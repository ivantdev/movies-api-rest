const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header: {
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// utils

function cleanNode(element) {
    let n = element.childElementCount;
    for(;0!=n;) {
        try {
            n = element.childElementCount;
            element.removeChild(element.childNodes[0]);
        } catch {
            continue;
        }
    }
    
}

function addMovies(movies, container, tv=false, clean=true) {
    if(clean){
        cleanNode(container);
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('content__movie');
        movieDiv.addEventListener('click', () => {
            location.hash = tv ? `#tv=${movie.id}` : `#movie=${movie.id}`;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieDiv.appendChild(movieImg);

        container.appendChild(movieDiv);

    });
}

function addCategories(categories, container) {
    cleanNode(container);

    categories.forEach(category => {
        const categoryContainer = document.createElement('li');

        const categoryButton = document.createElement('button');
        categoryButton.setAttribute('type', 'button')
        categoryButton.classList.add('category__item-2', 'category__item');
        categoryButton.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })

        const categoryTitle = document.createTextNode(category.name);
        
        categoryButton.appendChild(categoryTitle);
        categoryContainer.appendChild(categoryButton);
        container.appendChild(categoryContainer);

    });
}

// API calls

async function getTrendingMoviesPreview() {
    const { data } = await api("trending/movie/day");
    const movies = data.results;

    addMovies(movies, trendingPreviewList);
}

async function getCategoryMoviesPreview() {
    const { data } = await api("genre/movie/list");
    const categories = data.genres;
    
    addCategories(categories, categoriesPreviewList);
}

async function getDiscoverMoviesPreview() {
    const { data } = await api("discover/movie");
    const movies = data.results;
    
    addMovies(movies, discoverPreviewList);
}

async function getTvPreview() {
    const { data } = await api("tv/on_the_air");
    const shows = data.results;

    addMovies(shows, tvPreviewList, true);
}

async function getMovies() {
    const { data } = await api('movie/popular');
    const movies = data.results;

    addMovies(movies, generalContent);
}

async function getTvShows() {
    const { data } = await api('tv/popular');
    const shows = data.results;

    addMovies(shows, generalContent, true);
}

async function getTrendingMovies() {
    const { data } = await api('trending/tv/day');
    const shows = data.results;

    addMovies(shows, generalContent);
    window.scrollTo(0,0);
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            'with_genres': id,
        },
    })
    const movies = data.results;    
    addMovies(movies, generalContent);
    window.scrollTo(0,0);
}

async function getDiscoverMovies() {
    const { data } = await api('discover/movie');
    const results = data.results;

    addMovies(results, generalContent);
    window.scrollTo(0,0);
}

async function getMovieDetails(id) {
    const { data: movie } = await api('movie/' + id);
    const moviePosterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    header.style.background = `url(${moviePosterUrl})`;
    detailsHeroTitle.textContent = movie.title;
    detailsHeroScore.textContent = movie.vote_average;
    detailsDescription.textContent = movie.overview;

    getSimilarMovie(id);
}

async function getTvShowDetails(id) {
    const { data: movie } = await api('tv/' + id);
    const moviePosterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    header.style.background = `url(${moviePosterUrl})`;
    detailsHeroTitle.textContent = movie.name;
    detailsHeroScore.textContent = movie.vote_average;
    detailsDescription.textContent = movie.overview;

    getSimilarTvShow(id);
}

async function getSimilarMovie(id) {
    const { data } = await api(`movie/${id}/similar`);
    const movies = data.results;

    addMovies(movies, detailsSimilarContainer);
}

async function getSimilarTvShow(id) {
    const { data } = await api(`tv/${id}/similar`);
    const movies = data.results;

    addMovies(movies, detailsSimilarContainer, true);
}

async function getQuery(query) {
    const { data: data_movies } = await api('search/movie', {
        params: {
            query: encodeURI(query),
        },
    });
    const movies = data_movies.results;
    console.log(movies);
    addMovies(movies, generalContent);

    const { data: data_tv } = await api('search/tv', {
        params: {
            query: encodeURI(query),
        },
    });
    const shows = data_tv.results;
    console.log(shows);
    addMovies(shows, generalContent, tv=true, clean=false);
}
