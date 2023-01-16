# Workout
## Overview

I created this project because I wanted to make something that reflected my interests as of late: working out. I noticed that each time I would work out, I would want to track my progress using Google Docs. However, I wanted to personalize and implement features that would make this process much more seamless!

## Key Features

My website has a few key features. First, there is a login/register page that will authenticate the user. The user is required to have specific requirements when they register their account.

1. Email must be valid.
2. Password needs to be 10 digits.
3. Username must not already exist in database.

After the user correctly enters their login information, they get redirected to the main workout page. On this page, the user can add a new workout. Inside each workout, they can add exercises, sets corresponding to each exercise, and reps/weight/notes for each set. 

If the user has already entered previous workout data (from other days), they have the option to Get Previous, which will load in their last saved changes.

Once the user is finished, they can click the Save Changes button. There is a logout feature which will sign the user out. Note that unauthorized users will not be able to open the main workout page.

## How to run

This project was created using React.js for the UI, and Express.js on the server side. 

1. Install Node.js.
2. Download both frontend and server folders from the workout repository. 
3. Open your IDE, with two windows, one for "frontend" and one for the "backend" folder.
4. In the terminal, use the command "npm start" on the "frontend" folder, and "npm run devStart" on the "backend" folder.

That's it! The project should open on your web browser now.
