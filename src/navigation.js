// events for buttons

arrowBackButton.addEventListener('click', () => {
    history.back();
});

headerInputQuery.addEventListener('keypress', () => {
    if(event.key === "Enter") {
        headerSearchButton.click();
    }
});

headerSearchButton.addEventListener('click', () => {
    if(headerInputQuery.classList.contains('showing__input')) {
        timing(true);
        if (headerInputQuery.value != ''){
            location.hash = "#search="+ headerInputQuery.value;
        }
    } else {
        headerInputQuery.classList.add('showing__input');
        timing();
    }
});

sectionHomeButton.addEventListener('click', () =>{
    location.hash = '';
});
navHomeButton.addEventListener('click', () =>{
    location.hash = '';
});

sectionMoviesButton.addEventListener('click', () =>{
    location.hash = '#home=movies';
});

sectionTvButton.addEventListener('click', () =>{
    location.hash = '#home=tv';
});

navTrendingButton.addEventListener('click', () =>{
    location.hash = '#trends';
});

trendingPreviewButton.addEventListener('click', () =>{
    location.hash = '#trends';
});

discoverPreviewButton.addEventListener('click', () =>{
    location.hash = '#discover';
});

navDiscoverButton.addEventListener('click', () =>{
    location.hash = '#discover';
});

navCategoriesButton.addEventListener('click', () =>{
    location.hash = '#movies';
});

tvPreviewButton.addEventListener('click', () =>{
    location.hash = '#tvShows';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// utils

async function timing (reverse=false) {
    let currentTime = 0;
    return await new Promise(resolve => {
        const interval = setInterval(() => {
            currentTime += 1;
            if (reverse) {
                headerInputQuery.style.width = `${176-currentTime*2}px`;
            } else {
                headerInputQuery.style.width = `${currentTime*2}px`;
            }
            if (currentTime === 88) {
                if (reverse) {
                    headerInputQuery.classList.remove('showing__input');
                }
                resolve(true);
                clearInterval(interval);
            }
        }, 1);
    })
}

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if(location.hash.startsWith('#tv=')){
        tvShowDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else if (location.hash.startsWith('#discover')) {
        discoverPage();
    } else if (location.hash.startsWith('#home=movies')) {
        homeExplore('movies');
    } else if (location.hash.startsWith('#home=tv')) {
        homeExplore('tv');
    } else if (location.hash.startsWith('#movies')) {
        moviesPage();
    } else if (location.hash.startsWith('#tvShows')) {
        tvShowsPage();
    } else {
        homePage();
    }
    location.hash;
}

function homePage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.remove('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.add('inactive');
    sectionHome.classList.remove('inactive');
    sectionHomeButton.classList.add('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.add('inactive');
    sectionGeneral.classList.remove('noheader');

    getTrendingMoviesPreview();
    getCategoryMoviesPreview();
    getDiscoverMoviesPreview();
    getTvPreview()
}

function homeExplore(type) {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.remove('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.add('inactive');
    sectionHome.classList.remove('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.add('inactive');
    categoriesPreview.classList.add('inactive');
    discoverPreview.classList.add('inactive');
    tvPreview.classList.add('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    switch (type){
        case 'movies':
            sectionMoviesButton.classList.add('category__item__active');
            generalTitle.textContent = 'Popular Movies';
            getMovies();
            break;
        case 'tv':
            sectionTvButton.classList.add('category__item__active');
            generalTitle.textContent = 'Popular Tv Shows and Series';
            getTvShows();
            break;
    }
}

function trendsPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    getTrendingMovies();
    generalTitle.textContent = ('Trending Movies');
}

function categoriesPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    const [id, name] = location.hash.split('=')[1].split('-');
    getMoviesByCategory(id);
    generalTitle.textContent = decodeURI(name);
}

function movieDetailsPage() {
    header.classList.add('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.remove('inactive');
    sectionGeneral.classList.add('inactive');
    sectionGeneral.classList.add('noheader');

    const id = location.hash.split('=')[1];
    getMovieDetails(id);
    window.scrollTo(0,0);
}

function tvShowDetailsPage() {
    header.classList.add('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.remove('inactive');
    sectionGeneral.classList.add('inactive');
    sectionGeneral.classList.add('noheader');

    const id = location.hash.split('=')[1];
    getTvShowDetails(id);
    window.scrollTo(0,0);
}

function searchPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    const query = location.hash.split('=')[1];
    generalTitle.textContent = 'Results for: ' + decodeURI(query);

    getQuery(query);
    window.scrollTo(0,0);
}

function discoverPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    getDiscoverMovies();
    generalTitle.textContent = "Discover";
}

async function moviesPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    generalTitle.textContent = 'Popular Movies';
    getMovies();
    window.scrollTo(0,0);
}

async function tvShowsPage() {
    header.classList.remove('header__background-content');
    header.style.background = "";
    headerLogoSearch.classList.add('inactive');
    headerInputQuery.classList.remove('showing__input');
    arrowBackButton.classList.remove('inactive');
    sectionHome.classList.add('inactive');
    sectionHomeButton.classList.remove('category__item__active');
    sectionMoviesButton.classList.remove('category__item__active');
    sectionTvButton.classList.remove('category__item__active');
    trendingPreview.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    discoverPreview.classList.remove('inactive');
    tvPreview.classList.remove('inactive');
    sectionDetails.classList.add('inactive');
    sectionGeneral.classList.remove('inactive');
    sectionGeneral.classList.add('noheader');

    generalTitle.textContent = 'Popular Tv Shows and Series';
    getTvShows();
    window.scrollTo(0,0);
}