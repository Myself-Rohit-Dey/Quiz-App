# Quiz App

This is a mobile application for taking quizzes.

## Description

The Quiz App allows users to take quizzes on various topics. It provides features such as viewing quiz results, starting new quizzes, and logging in/out.

## Features

- User authentication: Users can create accounts, log in, and log out.
- Quiz taking: Users can take quizzes on different topics.
- View results: Users can view their quiz results.
- Admin panel: Admin users have access to additional features like managing quizzes.

## Technologies Used

- React Native: for building the mobile application.
- Node.js: for building the backend server.
- Express.js: for handling server-side routing and logic.
- MySQL: for storing user data and quiz information.

## Use:

You can get the Apk in the Releases for testing.

## Installation

### Locally

1. Clone the repository: 
```bash
git clone https://github.com/your-username/quiz-app.git
```

2. Run the React-Native Expo:
```bash
cd quiz-app
npm install
npx expo start --tunnel --reset-cache
```

3. Set up the backend server:
```bash
cd server
npm install
nodemon server.mjs
```
4. Set up an ngrok for port 3000 creating a account by signup and following ngrok documentation : https://ngrok.com

5. Open the Expo app on your mobile device and scan the QR code to run the app.

### Online (Deploy):

1. Create a account and deploy the server on Vercel or render for free

2. For Hosting Database you can use Clever Cloud.

3. Bulid the apk using EAS builds from Expo by creating a documentation and following documentation : https://docs.expo.dev/build/introduction/

## Usage

- Register a new account or log in with existing credentials.
- Start taking quizzes on various topics.
- View your quiz results.
- Admin users can access additional features from the admin panel.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please create a GitHub issue or submit a pull request.

<!-- ## License

This project is licensed under the [MIT License](LICENSE). -->
