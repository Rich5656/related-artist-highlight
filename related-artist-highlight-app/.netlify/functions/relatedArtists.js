const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    
    const getRandomInt = (max) => {
            return Math.floor(Math.random() * max);
        }
    const dataBody = JSON.parse(event.body)
    const accessToken = dataBody.accessToken;
    const id = dataBody.id;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    try {
        const data = await spotifyApi.getArtistRelatedArtists(id)
        const sortedResults = data.body.artists.sort((a,b) => a.popularity - b.popularity);
        const randomResults = new Map();
        while (randomResults.size < 3) {
            const pos = getRandomInt(sortedResults.length - 1);
                if (!randomResults.has(pos)) {
                    randomResults.set(pos, sortedResults[pos]);
                }
        }
        const results = Array.from(randomResults.values());

        return {
            statusCode: 200,
            body: JSON.stringify({relatedArtistsResults: results})
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({err})
        }
    }
}