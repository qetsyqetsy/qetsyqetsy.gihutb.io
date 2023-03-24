// Set up API key and base URL
const apiKey = "8142c403b2800719c51e0bde7c70d63f";
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

// Define Last.fm API method to get similar artists
const method = "artist.getsimilar";

// Get references to HTML elements
const artistInput = document.getElementById("artist-input");
const findSimilarButton = document.getElementById("find-similar-button");
const recommendedArtistsList = document.getElementById("recommended-artists-list");

// Set up event listener for Find Similar Artists button
findSimilarButton.addEventListener("click", () => {
  // Get artist name from input field
  const artist = artistInput.value;

  // Set API parameters
  const params = new URLSearchParams({
    method: method,
    artist: artist,
    api_key: apiKey,
    format: "json",
    limit: 100,
  });

  // Send API request
  fetch(`${baseUrl}?${params}`)
    .then((response) => {
      // Check if request was successful
      if (response.ok) {
        // Parse JSON response
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => {
      // Get list of similar artists
      const similarArtists = data.similarartists.artist.map((artist) => artist.name);
      // Randomly select 10 similar artists
      const recommendedArtists = shuffleArray(similarArtists).slice(0, 10);
      // Clear previous results from list
      recommendedArtistsList.innerHTML = "";
      // Add recommended artists to list
      recommendedArtists.forEach((artist) => {
        const listItem = document.createElement("li");
        listItem.textContent = artist;
        recommendedArtistsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
