// Set up API key and base URL
const apiKey = "8142c403b2800719c51e0bde7c70d63f";
const baseUrl = "https://ws.audioscrobbler.com/2.0/";

// Define Last.fm API method to get similar artists
const method = "artist.getsimilar";

// Get references to HTML elements
const artistInput = document.getElementById("artist-input");
const findSimilarButton = document.getElementById("find-similar-button");
const recommendedArtistsList = document.getElementById("recommended-artists-list");

// Add event listener to button
findSimilarButton.addEventListener("click", () => {
  // Get user input
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
      // Clear existing list items
      recommendedArtistsList.innerHTML = "";
      // Add each recommended artist to the list
      recommendedArtists.forEach((artist) => {
        const li = document.createElement("li");
        li.textContent = artist;
        recommendedArtistsList.appendChild(li);
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
