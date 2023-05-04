const SpotifyWebApi = require('spotify-web-api-node');

exports.handler = async (event) => {
    const bodyData = JSON.parse(event.body)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://related-artist-highlight.netlify.app/',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
        refreshToken: bodyData.refreshToken
    });

    try {
        const data = await spotifyApi.refreshAccessToken();
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            }) 
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({err})
        }
    }
}
