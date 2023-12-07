# MVC-Tech-Blog

## Description

This Tech Blog application is a CMS-style blog site, similar to WordPress, where developers can publish their blog posts and comment on other developers' posts. Built from scratch and deployed on Heroku, this application follows the Model-View-Controller (MVC) paradigm, using Handlebars.js for templating, Sequelize as the ORM, and express-session for authentication.

## Motivation

The project aims to create a platform for developers to share and discuss tech-related topics, enhancing community learning and engagement.

## Key Learnings

- Implementing MVC architecture in a full-stack application.
- Utilizing Handlebars.js for dynamic content rendering.
- Managing user authentication and session control.
- Integrating Sequelize ORM for database management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Tests](#tests)
- [Badges](#badges)

## Installation

1. Clone the repository to your local machine.
2. Install necessary dependencies by running `npm install`.
3. Configure your MySQL database settings in the `.env` file.
4. Initialize the database by running `npm run db:init`.
5. Start the server using `npm start`.
6. Access the application through `http://localhost:3000` on your browser.

## Usage

This is the HEROKU link to use the deployed app: [HEROKU](https://techblogch-9f3ef9103546.herokuapp.com/) 

Upon launching the application, users are greeted with a homepage displaying existing blog posts. Users can sign up or log in to access additional features such as creating, editing, or deleting posts, and commenting on posts.

Video DEMO:
[VIDEO_DEMO](https://youtu.be/P6-8TtZ8Yrs) 

For a visual guide:

<img src="/public/Screenshot.png" alt="Home Page" height="300">

## Features

- **User Authentication**: Sign up, log in, and log out functionalities.
- **Blog Posts**: Users can create, view, edit, and delete their blog posts.
- **Comments**: Users can comment on blog posts.
- **Responsive Design**: The application is fully responsive and accessible on various devices.

## How to Contribute

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes and push to the branch.
4. Open a pull request for review.

For more detailed instructions, refer to the [Contributor Covenant](https://www.contributor-covenant.org/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Tests

To run tests, use the command `npm test`. Ensure that all tests pass to maintain application integrity.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)


