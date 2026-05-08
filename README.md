# Myrage 

## Description

Myrage is a job portal application built using the MERN stack (Mongodb, Express, React and Nodejs).
This job portal website enables three main flow or implementations:

1. Applicant can view jobs and apply for them when authorized.
2. Admin can perform CRUD operations on the user and job routes.
3. Both Admin and Applicant can perform some operations on the application but not all. 
The Admin are entitled to View and Update applications while the applicants are able to apply for applications, view and delete their applications.

### Features:

* Node provide the backend environment for this application.
* Express builds routes, middlewares and handles request.
* Mongoose schema for building schema for the database.
* React for displaying UI and sending request.
* Axios for making HTTP requests.
* Tanstack for handling states and processing request.

## Git Guide

You can clone this project using this command:

````
git clone https://github.com/azra-ninja/myrage-job-portal.git
````

## Install

Use `npm install` on the root directory to install dependencies in both `frontend` and `backend`.

Some commands for this process are:
````
git clone https://github.com/azra-ninja/myrage-job-portal.git
cd myrage
npm install
````

## ENV

Create a `.env` file on the root directory. See examples:

[ENV](.env.example)

## Start Development

For the `backend`: 
````
cd myrage
npm run backend
````

For the `frontend`:
````
cd myrage
npm run backend
````

OR use this command for the `frontend`:
````
cd frontend
npm run dev
````

Lastly to run both `backend` and `frontend`:
````
cd myrage
npm run fullstack
````

## Languages & Tools
- Node
- Express
- Mongoose
- React
- Tanstack (react query)
- Axios
- Typescript (frontend)
- Javascript (backend)
- Tailwind CSS and Daisy UI