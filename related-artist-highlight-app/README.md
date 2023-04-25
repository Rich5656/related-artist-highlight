# Related Artist Highlight

Related Artist Highlight is an application built with React.js that is __*designed to help users find lesser-known artists that are similar to their current favorites.*__ It allows a user to log in with their Spotify account and immediately get automated recommendations that are related to their most-listened to artists. There is also search functionality that returns lesser-known artists that are related to the artist the user searched.  Each recommendation displays the band's name, a photo, and some of the genres of music that the band is associated with.

## Demo
![GIF Demo](https://github.com/Rich5656/nutrition-app/blob/main/nutrition-app-video.gif)

## Functionality
- __Automated Recommendations:__ When users log in through the Spotify redirect URI, the application will look at what the users top 3 artists are and then makes further API requests to the Spotify API's related-artists endpoint. The list of related artists is then filtered down to __*only artists that have a popularity rating of 50 or lower.*__ This measure ensures that only lesser-known artists are getting highlighted by the application. One related artist is selected at random from this filtered list and displayed automatically after the user logs in.
- __Search Recommendations:__ Users also have the ability to get 3 unique recommendations based on a searched for artist. Once an artist is searched for, the application sorts the list by popularity rating and returns 3 unique recommendations for the user to look through. Since there are 210 possible combinations of related artists that can be returned for each searched-for artist, searching for the same artist twice in a row is likely to give some different recommendations. Similar to the automated recommendations, the focus here is on highlighting lesser-known artists.


## Motivation

I am a music lover and voracious consumer of music from and eclectic array of musical genres. I am also a person who loves to listen to full albums from artists as opposed to individual songs. However, these preferences don't really align with the Spotify algorithm's approach to recommending music, making it difficult to find new artists that I actually like or haven't heard of before.

So I decided to make this app to help me search out new artists that I have never heard or to provide a way for other people to find artist that simply find lesser known artists and experience that unparalleled joy of finding a new music to blast through their head phones on the daily. 

## Technologies Used

[![Tech Used](https://skillicons.dev/icons?i=react,express,nodejs,js,html,css,git,github)](https://skillicons.dev)

## Main Takeaways

1. __React's Context API:__ I wanted to use this project to improve my skills with using state in React and also explore some new features that React offers for state management. This led me to use React's context API to access and update state globally throughout the application, as opposed to prop drilling like I have done in the past. It was interesting to learn how this worked (useReducer, createContext), and it opened my eyes to how effective this could be for larger applications with more complicated state management than this one has.
2. __API Calls / Netlify Functions:__ Building this also gave me a chance to work with making API calls securely without having to implement a full back end with Express.js to manage gathering the data. It wound up being a great opportunity to learn about making a serverless app and take advantage of Netlify Functions to securely make the necessary API calls. Being diligent and taking precautions regarding security is something that is of great importance to me. 