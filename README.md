# Note on the live site :exclamation::exclamation::exclamation:

This app is still in development mode with Spotify's develper services. This unfortunately limits the number of users that can use this
app with their own accounts. If you want to see a live demo of this site you will need to use the following tester account when prompted to log in:

- __User:__ anothermark05@gmail.com
- __Pass:__ B0yzMwl1$
- [Link to live site](https://related-artist-highlight.netlify.app/)

If you want to use this app with your own Spotify account, reach out to me through the contact form at the bottom of this [page](portfolio-site-here).

# Related Artist Highlight :musical_note:

Related Artist Highlight is an application built with React.js that is __*designed to help users find lesser-known artists that are similar to their current favorites.*__ It allows a user to log in with their Spotify account and immediately get automated recommendations that are related to their most-listened to artists. There is also search functionality that returns lesser-known artists that are related to the artist the user searched.  Each recommendation displays the band's name, a photo, and some of the genres of music that the band is associated with.

## Demo :movie_camera:
![GIF Demo](https://github.com/Rich5656/related-artist-highlight/blob/main/related-artist-highlight-demo.gif)

## Version Notes
- __Main Branch__ This is the first version that I built that uses Express.js for the back end.
- __Netlify Version__ This is the version that is running on the deployed netlify site. The original back end is written with Express.js.

## Functionality :wrench:
- __OAuth:__ This app uses a redirect URI to allow users to securely log in to their Shopify accounts for authentication, and then redirects them back to the application with access granted to the requested scopes (only their most listened to artists for this app).
- __Automated Recommendations:__ When users log in through the Spotify redirect URI, the application will look at what the users top 3 artists are before making further API requests to the Spotify API's related-artists endpoint. The list of related artists is then filtered down to __*only artists that have a popularity rating of 50 or lower.*__ This measure ensures that only lesser-known artists are getting highlighted by the application. One related artist is selected at random from this filtered list and displayed automatically after the user logs in.
- __Search Recommendations:__ Users also have the ability to get 3 unique recommendations based on a searched for artist. Once an artist is searched for, the application sorts the list by popularity rating and returns 3 unique recommendations for the user to look through. Since there are 210 possible combinations of related artists that can be returned for each searched-for artist, searching for the same artist twice in a row is likely to give some different recommendations. Similar to the automated recommendations, the focus here is on highlighting lesser-known artists.


## Motivation :exclamation:

I am a music lover and voracious consumer of music from and eclectic array of musical genres. I am also a person who loves to listen to full albums from artists as opposed to individual songs. Unfortunately, these preferences don't really align with the Spotify algorithm's approach to recommending music, making it difficult to find new artists that I actually like or haven't heard of before.

So, I decided to make this app to help me search out new artists that I have never heard before and simply provide a way for other people to discover lesser-known artists. Hopefully as a result we can all get to experience that unparalleled joy of finding new music to blast through our head phones on the daily!

## Technologies Used

[![Tech Used](https://skillicons.dev/icons?i=react,express,nodejs,js,html,css,git,github,bootstrap,netlify)](https://skillicons.dev)

## Main Takeaways :blue_book:

1. __OAuth:__ This was my first time building an app that uses OAuth for authentication. It was interesting to learn how to implement this and see how effective it is to allow this process to be handled by a more sophisticated organization like Spotify, as opposed to trying to authenticate users through my own database and sign-up/sign-in functionality.
2. __Navigating API Calls:__ Due to the architecture of Spotify's REST API, there was a constant need to make multiple API calls to get the data that is displayed in this application. Many endpoints rely on having a URI related to an artist to get further data, and this required me to become proficient at making API calls within a loop of artist URIs before unpacking the array of promises that was retruned from that loop. Handling this properly allowed me to push only the needed information to the front end and ultimately making the fron end code more readable.
3. __Back End For Secure API Calls:__ One of the biggest challenges in this project was setting this application up in a way that allowed for all of my API calls to be made from the back end so no confidential information would be accessible or made public. This was a great opportunity for me to get more familiar with using environment variables in Node and using dotenv to read those variables from a .env file. The back end was initially created and tested locally as an Express.js server, but the deployed version of this app has the Express.js server refactored into Netlify Functions to effectively provide the same service. 
4. __asyn/await vs. .then():__ Refactoring the back end of this app into Netlify Functions allowed me to see how clean using async/await can be for handling promises when compared to .then(). It ended up allowing me to get much more comfortable with using asyn/await and opened my eyes to how readable this method is. Ultimately, I wound up using .then() to parse the Netlify function response on the front end since this didn't require an excesive amount of chaining, and I used async/await for the more complex promise handling that occured on the back end to keep things clean. It was nice to have a practical example of how both of these methods can be used in practice and why they both exist.