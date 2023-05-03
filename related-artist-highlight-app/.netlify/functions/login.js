const SpotifyWebApi = require('spotify-web-api-node');


const handler = async (event) => {
    console.log(event.queryStringParameters.code);
    // const code = event.queryStringParameters.code;
    // const spotifyApi = new SpotifyWebApi({
    //     redirectUri: 'http://localhost:8888', // change to netlify adress for set up
    //     clientId: process.env.SPOTIFY_ID, 
    //     clientSecret: process.env.SPOTIFY_SECRET, 
    // });

    return {
        statusCode: 200,
        body: JSON.stringify({ someText: 'hello'})
    };
    
    // try {
    //     const data = spotifyApi.authorizationCodeGrant(code);
    //     console.log(data);
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({
    //             accessToken: data.body.access_token,
    //             refreshToken: data.body.refresh_token,
    //             expiresIn: data.body.expires_in
    //         })
    //     }
    // } catch (err) {
    //     const { status, statusText, headers, data } = err.response;
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify(status, statusText, headers, data)
    //     }
    // }


    // spotifyApi.authorizationCodeGrant(code)
    //     .then(data => {
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
    //         console.log(err)
    //         // const { status, statusText, headers, data } = err.response;
    //         // return {
    //         //     statusCode: 400,
    //         //     body: JSON.stringify(status, statusText, headers, data)
    //         // }
    //     })

}

module.exports = { handler }