# Getting Started with the React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## After cloning repository, run

### `npm install`

This command will install all the necessary dependencies listed in 'package.json'.

## Start the application

### `npm start`

This command runs the app in development mode. Open http://localhost:3000 to view it in the browser.

## Struggles

Was unable to access API, received the following error: "Access to fetch at 'https://uccc7nj764.execute-api.us-west-2.amazonaws.com/employees' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."

As a result, I just created mock data and used that rathe than focusing on the API issue.

Had trouble with the onClick effect of saving the data into JSON file, found alternative to save 'Current' and 'Completed' jobs.

# Backend Architecture

## Tech Stack

Web Server: Since Firebase offers a serverless approach, there's no need to set up a traditional web server. Firebase's suite of tools will handle the server-side functionality.
Database: Use Firebase Firestore, a NoSQL cloud database to store and sync data in real-time. It is flexible and scales easily.
Authentication: Utilize Firebase Authentication for managing users and handling authentication securely.
Hosting: Deploy the frontend application on Firebase Hosting for a cohesive ecosystem.
Storage: Use Firebase Storage for storing any files, such as CSV/JSON exports.
APIs/Cloud Functions: For any additional backend logic that cannot be handled directly in Firestore rules, use Firebase Cloud Functions, which allows running backend code in response to HTTP requests or other Firebase events.

## Separation of Work Between Frontend and Backend
Frontend Responsibilities:
User Interface: Displaying UI components like employee lists, job lists, and buttons to interact with the application.
Local State Management: Handling the state of UI components, such as which employee is selected, which jobs are being displayed, and the state of the job tracking (active/inactive).
Sending Requests: Making requests to Firebase to authenticate users, retrieve the list of employees and jobs, and send updates when a job is started or ended.
Real-time Updates: Subscribing to real-time updates from Firestore to reflect changes in the UI without the need for manual refreshes.
Exporting Data: Generating export files based on the data retrieved from Firestore and triggering the download for the user.

Backend Responsibilities:
Data Storage: Persisting employee data, job data, and work logs. The Firestore database will store this structured data, enforce security rules, and allow queries.
Authentication: Managing user sign-up, sign-in, and access control. Firebase Authentication will handle this, using security rules to ensure users can only access appropriate data.
Data Validation: Ensuring the integrity of data being stored. Firestore rules can define validation logic to ensure, for example, that job names conform to certain standards, and timestamps are valid.
File Storage: Managing uploads and downloads of files if needed, using Firebase Storage. This could be used for handling CSV/JSON file exports if they're generated
on the server rather than on the client-side.

Firebase Specifics:
Real-time Sync: Utilizing Firebase's real-time database capabilities, the backend will update the frontend with any changes to the data without the need for a refresh.
Security: Implementing security rules in Firestore to manage read/write access to the database collections based on user roles.
Serverless Functions: Using Firebase Cloud Functions to handle operations that should not be exposed to the frontend, such as generating reports or processing data before storing it.

### Example of Operations:
Frontend:
Authenticating users.
Sending start/end job events.
Displaying real-time updates of active jobs.
Exporting job logs as CSV/JSON, which can be done client-side.

Backend:
Storing user accounts and managing sessions (via Firebase Authentication).
Persisting job start/end times and durations (via Firestore).
Running scheduled tasks or triggered functions for maintenance or report generation (via Cloud Functions).
Storing exported CSV/JSON files if they need to be kept for records or shared (via Firebase Storage).
Enforcing business logic such as verifying job durations or processing time logs.
Sending notifications or emails based on specific triggers, such as a job being overdue (potentially using Firebase Extensions or Cloud Functions).
