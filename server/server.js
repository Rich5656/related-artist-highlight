const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json())

// const spotifyAPI = new SpotifyWebApi({})

// refresh authToken
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
        refreshToken
    });

    spotifyApi.refreshAccessToken()  
        .then(data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn 
            });   
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400);
        })
 })

// redirect for authentication
app.post('/login', (req, res) => {
    const code = req.body.code;
    // console.log(process.env)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/topArtists', (req, res) => {
    const accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyTopArtists()
        .then(data => {
            if (data.body.items.length >= 3) {
                const topArtists = data.body.items.slice(0, 3);
                res.json({
                    topArtistsArray: topArtists
                });
            } else {
                const topArtists = data.body.items;
                res.json({
                    topArtistsArray: topArtists
                })
            } 
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
})

app.post('/relatedToTopArtists', (req, res) => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const accessToken = req.body.accessToken;
    const usersTopArtists = req.body.usersTopArtists;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    const relatedArrayPormises = usersTopArtists.map(artistItem => {
        // get the related artists to the current artist
        return spotifyApi.getArtistRelatedArtists(artistItem.id)
            .then(data => {
                const filteredArray = data.body.artists.filter(artist => artist.popularity <= 50)
                const pos = getRandomInt(filteredArray.length -1);
                return filteredArray[pos];
            })
            .catch(err => console.log(err))
    });

    Promise.all(relatedArrayPormises)
        .then(vals => res.json({ vals }))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});




app.post('/searchArtist', (req, res) => {
    const accessToken = req.body.accessToken;
    const artistSearch = req.body.artistSearch;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchArtists(artistSearch)
        .then(data => data.body.artists.items)
        .then(artistsArray => {
            return artistsArray.map(artistItem => {
                return {
                    name: artistItem.name,
                    id: artistItem.id
                }
            })
        })
        .then(serachResults => res.json({ topFive: serachResults.slice(0,5) }))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});

app.post('/relatedArtists', (req, res) => {
    const accessToken = req.body.accessToken;
    const id = req.body.id;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_ID, 
        clientSecret: process.env.SPOTIFY_SECRET, 
    });
    spotifyApi.setAccessToken(accessToken);



    spotifyApi.getArtistRelatedArtists(id)
        .then(data => data.body.artists)
        .then(artistRelatedToSearchArray => {
            // sorting the query results low to high by popularity O(n log n)
            const sortedResults = artistRelatedToSearchArray.sort((a,b) => a.popularity - b.popularity);
            // take sorted results and randomly get three unique artists from the bottom 7 O(n)
            const getRandomInt = (max) => {
                return Math.floor(Math.random() * max);
            };
            let randomResults = new Map();
            while (randomResults.size < 3) {
                const pos = getRandomInt(sortedResults.length - 1);
                if (!randomResults.has(pos)) {
                    randomResults.set(pos, sortedResults[pos]);
                }
            }

            res.json({
                relatedArtistsResults: Array.from(randomResults.values())
            });
            // reutning the 3 lowest O(n) for the array conversion
            // setReturnedSearchArtists(Array.from(randomResults.values()));
        })       
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
});


app.listen(3001)
