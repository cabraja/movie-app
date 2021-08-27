// TMDB

let currentPage = 1;


const API_KEY = 'api_key=fa929aecdbe4c83a06865565167a4921';
const BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = BASE_URL + '/movie/popular?' + API_KEY + `&page=${currentPage}`;
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + '&query='; 
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');

const form = document.getElementById('form');
const search = document.getElementById('search');

const getMovies = (url) => {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results)
    });
}

const showMovies = (data) => {

    main.innerHTML = '';

    data.forEach(movie => {

        const { poster_path, original_title, overview, vote_average } = movie;

        const element = document.createElement('div');
        element.classList.add('movie');
        element.innerHTML = `
        
        <div class='movie-photo' style = 'background-image: url(${IMG_URL + poster_path})'>
            <div class='overview'>
                <h4>Overview</h4>
                <p>${overview}</p>
            </div>
        </div>
        <div class='movie-bottom'>
            <h5>${original_title}</h5>
            <h6>${vote_average} &#9733;</h6>
        </div>
        
        `;

        main.appendChild(element);
    })

}

getMovies(API_URL);

form.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log('ye');
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCH_URL + searchTerm);
    }else{
        getMovies(API_URL);
    }
})

// ------------------------------------- PAGE SWITCHER
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');

nextPage.addEventListener('click',e => {
    e.preventDefault();
    currentPage++;
    console.log(currentPage);
    prevPage.style.display = 'block';
    API_URL = BASE_URL + '/movie/popular?' + API_KEY + `&page=${currentPage}`;
    getMovies(API_URL);
})

prevPage.addEventListener('click',e => {
    e.preventDefault();
    currentPage--;
    console.log(currentPage);
    
    if(currentPage < 2){
        prevPage.style.display = 'none';
    }
    API_URL = BASE_URL + '/movie/popular?' + API_KEY + `&page=${currentPage}`;
    getMovies(API_URL);
})




