const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    //  genreates random number between 0 and arg range
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    // spotify api set up
    const dataBody = JSON.parse(event.body)
    const accessToken = dataBody.accessToken;
    const usersTopArtists = dataBody.usersTopArtists;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    const relatedArrayPormises = await usersTopArtists.map(artistItem => {
        // get the related artists to the current artist
        return spotifyApi.getArtistRelatedArtists(artistItem.id)
            .then(data => {
                const filteredArray = data.body.artists.filter(artist => artist.popularity <= 50)
                const pos = getRandomInt(filteredArray.length -1);
                return filteredArray[pos];
            })
            .catch(err => console.log(err))
    })

    return Promise.all(relatedArrayPormises)
        .then(vals => {
            return {
                statusCode: 200,
                body: JSON.stringify({ vals: vals})
            }
        })
        .catch(err => {
            return {
                statusCode: 400,
                body: JSON.stringify({err})
            }
        });
}