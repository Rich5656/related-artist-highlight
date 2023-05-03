const SpotifyWebApi = require('spotify-web-api-node');


const handler = async (event) => {
    // console.log(event);
    const code = event.queryStringParameters.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:8888', // change to netlify adress for set up
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });

    try {
        const data = await spotifyApi.authorizationCodeGrant(code);

        return {
            statusCode: 200,
                body: JSON.stringify({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in
                })
        }
    } catch (err) {
        // const { errorMessage } = err.errorMessage;

        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }

    // return spotifyApi.authorizationCodeGrant(code)
    //     .then(data => {
    //         console.log(data)
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({
    //                 accessToken: data.body.access_token,
    //                 refreshToken: data.body.refresh_token,
    //                 expiresIn: data.body.expires_in
    //             })
    //         }
    //     })
    //     .catch((err) => {
    //         // console.log(err)
    //         const { errorMessage } = err.errorMessage;
    //         return {
    //             statusCode: 400,
    //             body: JSON.stringify(errorMessage)
    //         }
    //     })

}

module.exports = { handler }