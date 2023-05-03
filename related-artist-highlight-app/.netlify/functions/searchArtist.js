const SpotifyWebApi = require("spotify-web-api-node");

exports.handler = async (event) => {
    const dataBody = JSON.parse(event.body);
    const accessToken = dataBody.accessToken;
    const artistSearch = dataBody.artistSearch;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);


    try {
        const data = await spotifyApi.searchArtists(artistSearch);
        const artistsArray = data.body.artists.items;
        const searchResults = artistsArray.map(artistItem => {
            return {
                name: artistItem.name,
                id: artistItem.id
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({topFive: searchResults.slice(0, 5)})
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({err})
        }
    }
    // spotifyApi.searchArtists(artistSearch)
    //     .then(data => data.body.artists.items)
    //     .then(artistsArray => {
    //         return artistsArray.map(artistItem => {
    //             return {
    //                 name: artistItem.name,
    //                 id: artistItem.id
    //             }
    //         })
    //     })
    //     .then(serachResults => res.json({ topFive: serachResults.slice(0,5) }))
    //     .catch(err => {
    //         console.log(err);
    //         res.sendStatus(400);
    //     });
}