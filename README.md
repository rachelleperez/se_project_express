# WTWR (What to Wear?): Back End

This repository contains the back-end portion of the What to Wear (WTWR) application found [HERE](https://github.com/rachelleperez/se_project_react), deployed in [wtwr.soon.it](https://wtwr.soon.it/). The application outputs the weather and appropriate clothing item recommendations based on a specific location.

This back-end portion represents the server side of the app which receives and processes API calls related to:

- User Signup
- User Login (Authentication)
- User Update
- Adding Clothing Items
- Retrieving clothing items

## Technologies Used

This project relies on the following technologies:

- JavaScript
- Node.js
  - Express framework: to power server
  - CORS: to power middleware
  - Bcrypt: to hash user passwords
- MongoDB: to store data on user and clothing items
  - Mongoose
- JWT (JSON Web Token): to identify authenticated users

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
