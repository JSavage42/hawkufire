# Question Air v0.43.0

## Install Locally

### Install Node and NPM

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Clone Repository and Install Packages

`git clone https://github.com/JSavage42/questionair.git`

`cd questionair`

`npm i`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using Question Air

### Sign Up

You must sign up before using the application. When you sign up you are allowed to request permissions. Please check all desired permissions. Once the administrator has approved your requests you'll be able to access those pages.

### Sign In

You may sign in with email/password or if you have linked accounts: Google, Facebook, or Twitter.

### Account Page

In the Account Page you can make changes to your account. You can reset your password, or link social media accounts. Users can request permissions from account page.

### Student Page

You can add a Test ID to open a page that displays all the test questions and options.

Working on getting the functionality of showing one question at a time controlled by the Instructor.

### Instructor Page

The Instructor Page shows all the test banks you've created. It also displays links to create a new test bank or add questions to an existing test bank.

Working on ability to edit a question. Also, the ability to control the hosted test. Also, to show **ONLY** your tests.

#### Create Test Bank

Here you can create a new test bank. Enter an ID number, total points possible, and passing score and click submit.

#### New Question

Here you can add questions to test banks.

1. Enter the Test Bank ID number
2. Enter the first reference (optional)
3. Enter the second reference (optional)
4. Enter the question number
5. Enter the question text
6. Upload a .jpg or .png (optional)
7. Enter your options (at least two)
8. Enter the text of the correct answer. (Example if the answer is Paris you would enter Pairs).
9. Click Submit

#### Instructor View of Test Page

To view the Instructor view of the test page, click on one of the blue test IDs under Available Quizzes on the Instructor Page.

Here you can view metadata about the test (test ID, possible points, passing score, number of questions) and also the questions, their options and the correct answers.

### Admin Page

Here you can view and reset user's passwords. You can also approve user permission requests via the admin dashboard. You can also remove permissions from users. Admins can only grant permissions via a request. This is a security feature.
