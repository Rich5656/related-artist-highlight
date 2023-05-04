# Related Artist Highlight :musical_note:

Related Artist Highlight is an application built with React.js that is __*designed to help users find lesser-known artists that are similar to their current favorites.*__ It allows a user to log in with their Spotify account and immediately get automated recommendations that are related to their most-listened to artists. There is also search functionality that returns lesser-known artists that are related to the artist the user searched.  Each recommendation displays the band's name, a photo, and some of the genres of music that the band is associated with.

## Demo :movie_camera:
![GIF Demo](https://github.com/Rich5656/related-artist-highlight/blob/main/related-artist-highlight-demo.gif)

## Version Notes
- __Main Branch__ This is the first version that I built that uses Express.js for the back end.
- __Netlify Version__ This is the version that is running on the deployed netlify site. The original back end is written in Netlify functions for this version to manage all API calls to Spotify.

## Functionality :wrench:
- __OAuth:__ This app uses a redirect URI to allow users to securely log in to their Shopify accounts for authentication, and then redirects them back to the application with access granted to the requested scopes (only their most listened to artists for this app).
- __Automated Recommendations:__ When users log in through the Spotify redirect URI, the application will look at what the users top 3 artists are before making further API requests to the Spotify API's related-artists endpoint. The list of related artists is then filtered down to __*only artists that have a popularity rating of 50 or lower.*__ This measure ensures that only lesser-known artists are getting highlighted by the application. One related artist is selected at random from this filtered list and displayed automatically after the user logs in.
- __Search Recommendations:__ Users also have the ability to get 3 unique recommendations based on a searched for artist. Once an artist is searched for, the application sorts the list by popularity rating and returns 3 unique recommendations for the user to look through. Since there are 210 possible combinations of related artists that can be returned for each searched-for artist, searching for the same artist twice in a row is likely to give some different recommendations. Similar to the automated recommendations, the focus here is on highlighting lesser-known artists.


## Motivation :exclamation:

I am a music lover and voracious consumer of music from and eclectic array of musical genres. I am also a person who loves to listen to full albums from artists as opposed to individual songs. Unfortunately, these preferences don't really align with the Spotify algorithm's approach to recommending music, making it difficult to find new artists that I actually like or haven't heard of before.

So, I decided to make this app to help me search out new artists that I have never heard before and simply provide a way for other people to discover lesser-known artists. Hopefully as a result we can all get to experience that unparalleled joy of finding new music to blast through our head phones on the daily!

## Technologies Used

[![Tech Used](https://skillicons.dev/icons?i=react,express,nodejs,js,html,css,git,github,bootstrap)](https://skillicons.dev)

## Main Takeaways :blue_book:

1. __OAuth:__ This was my first time building an app that uses OAuth for authentication. It was interesting to learn how to implement this and see how effective it is to allow this process to be handled by a more sophisticated organization like Spotify, as opposed to trying to authenticate through using my own database and sign-up/sign-in functionality.
2. __Chaining API Calls:__ Due to the architecture of Spotify's REST API, there was a constant need to chain API calls to get the data that is displayed in this application. Many endpoints rely on having a URI related to an artist to get further data, so I had to become adept at handling the data that was returned from those individual API calls. Handling this properly allowed me to push a condensed JOSN object with all of the needed display data to the front end of the application with a single request.
3. __Back End For Secure API Calls:__ One of the biggest challenges in this project was setting this application up in a way that allowed for all of my API calls to be made from the back end so no confidential information related to API keys would be accessible or made public. This was a great opportunity for me to get more familiar with using environment variables in Node and using dotenv to read those variables from a .env file. 