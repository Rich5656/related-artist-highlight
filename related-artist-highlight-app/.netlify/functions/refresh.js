const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    const refreshToken = event.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
        refreshToken
    });

    return spotifyApi.refreshAccessToken()  
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    accessToken: data.body.accessToken,
                    expiresIn: data.body.expiresIn
                }) 
            };   
        })
        .catch(err => {
            const { status, statusText, headers, data } = err.response;
            return {
                statusCode: 400,
                body: JSON.stringify(status, statusText, headers, data)
            }
        })
}





    
}