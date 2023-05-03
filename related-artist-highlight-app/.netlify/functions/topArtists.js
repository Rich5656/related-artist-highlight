const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    const dataBody = JSON.parse(event.body)
    const accessToken = dataBody.accessToken;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    try {
        const data = await spotifyApi.getMyTopArtists();

        if (data.body.items.length >= 3) {
            const topArtists = data.body.items.slice(0, 3);
            
            return {
                statusCode: 200,
                body: JSON.stringify({topArtistsArray: topArtists})
            };
        } else {
            const topArtists = data.body.items;

            return {
                statusCode: 200,
                body: JSON.stringify({ topArtistsArray: topArtists})
            };
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({err})
        }
    }
    // spotifyApi.getMyTopArtists()
    //     .then(data => {
    //         if (data.body.items.length >= 3) {
    //             const topArtists = data.body.items.slice(0, 3);
    //             res.json({
    //                 topArtistsArray: topArtists
    //             });
    //         } else {
    //             const topArtists = data.body.items;
    //             res.json({
    //                 topArtistsArray: topArtists
    //             })
    //         } 
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.sendStatus(400)
    //     });



}