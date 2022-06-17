const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header: {
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

async function getTrendingMoviesPreview() {
    const { data } = await api("trending/movie/day");
    const movies = data.results;
    
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('content__movie');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieDiv.appendChild(movieImg);

        trendingPreviewList.appendChild(movieDiv);

    });
}

async function getCategoryMoviesPreview() {
    const { data } = await api("genre/movie/list");
    const categories = data.genres;
    
    categories.forEach(category => {
        const categoryContainer = document.createElement('li');

        const categoryTitle = document.createElement('button');
        categoryTitle.setAttribute('type', 'button')
        categoryTitle.classList.add('category__item-2', 'category__item');
        categoryTitle.setAttribute('id', category.id,);

        const categoryTitleText = document.createTextNode(category.name);
        
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

    });
}

async function getDiscoverMoviesPreview() {
    const { data } = await api("discover/movie");
    const movies = data.results;
    
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('content__movie');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieDiv.appendChild(movieImg);

        discoverPreviewList.appendChild(movieDiv);

    });
}

async function getTvPreview() {
    const { data } = await api("tv/popular");
    const shows = data.results;
    
    shows.forEach(show => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('content__movie');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie__image');
        movieImg.setAttribute('alt', show.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + show.poster_path,);
        
        movieDiv.appendChild(movieImg);

        tvPreviewList.appendChild(movieDiv);

    });
}
