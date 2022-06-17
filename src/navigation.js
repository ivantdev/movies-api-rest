window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else if (location.hash.startsWith('#explore')) {
        explorePage();
    } else {
        homePage();
    }
    location.hash;
}

function homePage() {
    getTrendingMoviesPreview();
    getCategoryMoviesPreview();
    getDiscoverMoviesPreview();
}

function trendsPage() {
    
}

function categoriesPage() {
    
}

function movieDetailsPage() {
    
}

function searchPage() {
    
}

function explorePage() {
    
}