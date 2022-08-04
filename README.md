# Project Proposal: Fight club

### Demo link: https://youtu.be/fABrh_cSvno
### Website Link: https://www.fight-club.tech/

### Controls:

### ATTACK: s, JUMP: w, LEFT: a, RIGHT: d

# Title:

Fight club.

## Description of Web application:
The web application that we are going to create is called Fight club, which is a multiplayer fighting game. In order to play Fight club, users will have to create an account by entering their email, username, and password. Once the user has created their account they will have the ability to join available game rooms, create game rooms,play against randoms and view the weekly leaderboard. The weekly leaderboard will display a list of top 10 users who have the most wins accumulated within that week and will reset once the next week begins. When the user joins a game room they will be able to compete against their opponent using variations of different attacks. The game will end when either user’s health bar hits 0.

## Concepts used for challenge factor:
The concepts that we plan to include in our project are:
1. OAuth 2 client:
- The web application requires users to sign up/sign in to access game rooms and leaderboards.
- Therefore,  the app will interact with OAuth 2 providers for authentication/authorization of the user information. 
2. Real-time interactions:
- A player and the opponent will interact in real-time, in game rooms.
- Player and opponent will have access to real-time audio/video of each-other.
3. Non-trivial frontend:
- We will use animation and 3d rendering to elevate the user experience in our application. 
- Initial ideas include 3d character modeling and leaderboard animations.
4. Integration with cloud technologies:
- The application provides the users to play with friends or with random players.
- Cloud services will be used for multiplayer matchmaking when users decide to play with randoms.

## Technoloy Stack: MERN
- MongoDB
- Express.js
- React
- Node.js

  Frontend: 
  For the front end of our tech stack we will be using to build our application we will be using the React front end framework and we will also look into using the NextJs framework for React. We will also be using various react libraries such as Material UI, React-Bootstrap, React-Router, etc.  
  
  Backend:
  For the backend of our tech stack we will be using a MongoDB database to store all of our collections, as well as Nodejs/Express for our backend server. We will also be using additional libraries such as Passport.js for OAuth, Mongoose, Socket.io for real time interactions, express-validator / other libraries with security in mind, etc. 

## Method of deployment: Docker + Kubernetes

  To deploy our web application we will deploy the containerized frontend and backend to Kubernetes. To help us with our deployment we will be referring to online resources.

- Relevant link: https://www.labsexplorer.com/news/deploying-a-containerized-web-application-on-kubernetes_490
  
## Key Features of application that we will aim to complete by beta:
  The key functionality that we aim to complete for our beta version is the actual game functionality in our website in which we allow users to play with each other in real time, for our beta version we aim to allow users to either invite friends or play in random public matches with other users. We also aim to have a login/sign up system done for our beta that has OAuth 2.0 for a major provider such as Google/Facebook/Twitter, etc. 

## Additional Features of application that we will aim to complete by final:

For the final version of the application we want to introduce the following features:
- Random multiplayer matchmaking: Allow users to play users without a room code.
- Real-time game leaderboard.
- Add video chat functionality in game rooms. 
- Add 3d rendering and animations to our application. 
- Tournaments (optional).

## Documentation

### API DOCUMENTATION: 

- https://app.swaggerhub.com/apis-docs/ICLEMJACKO/Fight-Club/1.0.0#/

## Team Members

- [Clement Tran 1005412144](https://github.com/CTprogram)
- [Abdullah Khan 1004787279](https://github.com/khanm253)
- [Sahil Hakimi 1005262243](https://github.com/SahilHakimiUofT)



