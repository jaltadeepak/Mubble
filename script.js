const slider = document.getElementById("yearSlider");
const indicator = document.getElementById("yearIndicator");

// Update indicator value when slider value changes
slider.addEventListener("input", function () {
  indicator.textContent = this.value;
});

let movieYear;

function updateMovie() {
  fetch('films_data.json')
  .then(response => response.json())
  .then(data => {
    // Select a random movie
    const randomIndex = Math.floor(Math.random() * data.Films.length);
    const randomMovie = data.Films[randomIndex];

    // Update HTML content with movie details
    document.getElementById('poster').src = randomMovie.Poster;
    document.getElementById('name').textContent = `Name: ${randomMovie.Name}`;
    document.getElementById('director').textContent = `Director: ${randomMovie.Director}`;
    movieYear = randomMovie.Year
  })
  .catch(error => console.error('Error fetching JSON:', error));
}

updateMovie();

let tries = 0;
const maxTries = 5;

var audio = new Audio('click.mp3'); 
audio.preload = 'auto';

document.getElementById('submit-button').addEventListener('mousedown', function(){
  audio.play();
});

function showNotice(score) {
  document.getElementById('final-score').textContent = parseInt(document.getElementById('score-value').innerText);
  document.getElementById('notice-container').classList.remove('hidden');
}

function hideNotice() {
  document.getElementById('notice-container').classList.add('hidden');
}

document.getElementById('submit-button').addEventListener('click', function () {
  const selectedYear = slider.value;
  const actualYear = movieYear;
  let score = parseInt(document.getElementById('score-value').innerText);

  const yearDifference = Math.abs(selectedYear - actualYear);
  score += 5000 - (yearDifference * 50);

  document.getElementById('score-value').innerText = score;

  tries++;
  if (tries === maxTries) {
    tries = 0;
    showNotice();
    return;
    // document.getElementById('score-value').innerText = '0';
  }
  updateMovie();
});

function resetGame() {
  hideNotice();
  document.getElementById('score-value').textContent = '0';
  updateMovie();
}

document.getElementById('reset-button').addEventListener('click', resetGame);