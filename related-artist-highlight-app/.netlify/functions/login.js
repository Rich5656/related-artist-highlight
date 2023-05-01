const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

exports.handler = async (event) => {

    // const code = req.body.code;
    const code = event.queryStringParameters.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000', // change to netlify adress for set up
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });

    // try {
    //     const { data } = await spotifyApi.authorizationCodeGrant(code)

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify(data)
    //     }
    // }
    return spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in
                })
            }
        })
        .catch((err) => {
            const { status, statusText, headers, data } = err.response;
            return {
                statusCode: 400,
                body: JSON.stringify(status, statusText, headers, data)

            }
        })

}