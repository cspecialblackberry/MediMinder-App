# MediMinder-App 
<img width="376" alt="Screenshot 2024-03-16 at 4 27 37 PM" src="https://github.com/cspecialblackberry/MediMinder-App/assets/147653410/6b409377-c3c4-475f-b6bd-0afa2d5cd6e8">

## Description
MediMinder-App is a medication tracking app which allows users to input which medications they are using, how often they take them, and keep track of when they miss doses.

## Installation
Use the Heroku link OR download from the github link, install a sql database tool (such as postgres) and create a .env file with DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, and DB_PORT

## Usage
To use MediMinder, create an account or log into an existing account. When signing into an account, you will be directed to a list of your current medications. When creating a new account, you will be directed to the user account page. You can navigate to other pages through the navigation bar at the top or bottom of the screen. On the account page, you can add what times you wake up, eat meals, and go to bed or delete your account. On the medications page, you can add medications, what time you take them, how often, the start and ending dates for your doses, and toggle on/off notifications. On the history page, you can see a calendar that shows how often you've missed doses (information gathered through notifications, if enabled). Days with missed doses will be red and will display the date and names of the missed medications if clicked on.

## Credits
* This was the website used for finding an icon in SVG format for our login/ logout
https://www.svgrepo.com/collection/web-button-set-2/
* This is where we learned how to change the color of the SVG using the fill property
https://www.shecodes.io/athena/57595-how-to-change-svg-color-with-css#:~:text=To%20change%20the%20color%20of,the%20color%20of%20the%20element.&text=Here%2C%20the%20fill%20property%20is,%23ff0000%20%2C%20which%20is%20red.
* Medication autocomplete:
https://github.com/dariusk/corpora/blob/master/data/medicine/drugs.json


## License
Please refer to the LICENSE in the repo.

## Links
* GITHUB repo: https://github.com/cspecialblackberry/MediMinder-App
* Heroku Link: https://mediminder-e3e3cf63329a.herokuapp.com/
