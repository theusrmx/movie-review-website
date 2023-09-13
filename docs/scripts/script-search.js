const apiKey = '557439512040e55c35f758f339c8e1d1';
const searchResultsDiv = document.querySelector('.search-results');

// Função para carregar os filmes populares
function loadPopularMovies() {

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            const popularMovies = data.results;
            popularMovies.forEach(movie => {
                // Verifique se todas as informações necessárias estão presentes
                if (movie.poster_path, movie.overview) {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('card-result');
                    movieDiv.innerHTML = `
                        <div class="left-column">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
                        </div>
                        <div class="right-column">
                            <h1 class="movie-title">${movie.title}<span>(${movie.release_date.slice(0, 4)})</span></h1>
                            <p>${movie.overview}</p>
                        </div>
                    `;

                    // Adicione o evento de clique à div para redirecionar para a página de detalhes
                    movieDiv.addEventListener('click', () => {
                        const movieId = movie.id;
                        const contentType = 'movie'; // Você pode definir o tipo de conteúdo como 'movie' para filmes populares
                        // Redirecione para a página de detalhes com o mediaType e id
                        window.location.href = `movie-details.html?id=${movieId}&mediaType=${contentType}`;
                    });

                    searchResultsDiv.appendChild(movieDiv);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar filmes populares:', error);
        });
}

function loadPopularSeries(){
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=pt-BR`)
    .then(response => response.json())
    .then(data => {
        const popularMovies = data.results;
        popularMovies.forEach(serie => {
            // Verifique se todas as informações necessárias estão presentes
            if (serie.poster_path, serie.overview) {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('card-result');
                movieDiv.innerHTML = `
                    <div class="left-column">
                    <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name} Poster">
                    </div>
                    <div class="right-column">
                        <h1 class="movie-title">${serie.name}<span>(${serie.first_air_date.slice(0, 4)})</span></h1>
                        <p>${serie.overview}</p>
                    </div>
                `;

                // Adicione o evento de clique à div para redirecionar para a página de detalhes
                movieDiv.addEventListener('click', () => {
                    const serieId = serie.id;
                    // Redirecione para a página de detalhes com o mediaType e id
                    window.location.href = `movie-details.html?id=${serieId}&mediaType=tv`;
                });

                searchResultsDiv.appendChild(movieDiv);
            }
        });
    })
    .catch(error => {
        console.error('Erro ao carregar filmes populares:', error);
    });
}


// Função para carregar os filmes populares ou executar uma pesquisa
function searchMovies() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchQuery = searchInput.value;

    if (searchQuery.trim() === "") {
        // Se a consulta de pesquisa estiver em branco, carregue os filmes populares em vez disso
        loadPopularMovies();
        loadPopularSeries();
        return;
    }

    // Limpe os resultados de pesquisa anteriores
    searchResultsDiv.innerHTML = "";

    // Faça uma solicitação à API TMDB para pesquisa de filmes
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.results;
            searchResults.forEach(movie => {
                // Verifique se todas as informações necessárias estão presentes
                if(movie.poster_path){

                    const mediaType = movie.media_type;
                    const posterPath =`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    const year = mediaType === 'movie' ? movie.release_date.slice(0, 4) : (movie.first_air_date ? movie.first_air_date.slice(0, 4) : '');
                    const title = mediaType === 'movie' ? movie.title : movie.name; 
                    const sinopse = movie.overview;

                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('card-result');
                    movieDiv.innerHTML = `
                        <div class="left-column">
                            <img src="${posterPath}" alt="${title} Poster">
                        </div>
                        <div class="right-column">
                            <h1 class="movie-title">${title}<span>(${year})</span></h1>
                            <p>${sinopse}</p>
                        </div>
                    `;

                    // Adicione o evento de clique à div para redirecionar para a página de detalhes
                    movieDiv.addEventListener('click', () => {
                        const movieId = movie.id;
                        const contentType = mediaType; // Você pode definir o tipo de conteúdo como 'movie' para filmes populares
                        // Redirecione para a página de detalhes com o mediaType e id
                        window.location.href = `movie-details.html?id=${movieId}&mediaType=${contentType}`;
                    });

                    searchResultsDiv.appendChild(movieDiv);
            }
            });
        })
        .catch(error => {
            console.error('Erro ao executar a pesquisa:', error);
        });
}

// Adicione um evento de clique ao botão de pesquisa
const searchButton = document.querySelector('button');
searchButton.addEventListener('click', searchMovies);

window.addEventListener('load', () => {
    loadPopularMovies();
    loadPopularSeries();
});


