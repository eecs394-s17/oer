# Open Educational Resouces (OER)
![alt text](https://img.shields.io/badge/Northwestern-University-3b1973.svg)
## Set Up
### Required Credentials/API Keys
| APIs | Details |
| ------ | ------ |
| Northwestern Course Data | http://developer.asg.northwestern.edu/docs/ |

Once you have recieved an API key:
* Enter the [management console](https://api.asg.northwestern.edu/manage/login).
* Allow referers depending on the domain(s) from which you will be making requests (add `*` to allow all domains; useful in case you want to use multiple machines for development/staging, but remember to change this setting when app is production-ready).

| Credentials | Details |
| ------ | ------ |
| Firebase | Admin SDK Privileges |
| LDAP | Authentication |

You should include all required credentials/private keys and environment variables in a `.env` file stored in the root directory of the project. Contact Chris Chen at ChristopherChen2018@u.northwestern.edu to acquire the credentials and get access to the Firebase project.

### Required Tools
#### Node.js and npm
Download the most recent version of [Node.js](https://nodejs.org/en/), which should include the [Node Package Manager](https://www.npmjs.com/) (npm), and verify that they installed correctly.
```sh
node -v
npm -v
```
#### Angular 2 CLI
Download the [Angular Command Line Interface](https://cli.angular.io/).
```
npm install -g @angular/cli
```
#### Heruku CLI
After downloading the correct [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli) for your OS:
* Verify the version.
* Login in with a Heroku account.
```
heroku --version
heroku login
```
## Running the App Locally
Clone the GitHub repository.
```
git clone https://github.com/eecs394-s17/oer.git
cd oer
```
Install the dependencies.
```
npm install
```
Build the angular project.
```
ng build
```
Start the local heroku instance.
```
heroku local
```
Open a browser window and go to ```http://localhost:5000/``` to view the project. You must be connected to the Northwestern network (or possibly the Northwestern VPN, though this hasn't been verified) for the user authentication to work properly.

Each time you make changes to the code:
* Stop the Heroku server.
    * ```ctrl-c```
* Rebuild the project.
* Restart the Heroku instance.
```
ng build && heroku local
```
## Known Bugs / TODO
* BUG: You can add a textbook without adding a URL (form validation issue).
* BUG: Removing all textbooks from a course does not remove the course from the browse list in real time.
* BUG: More informative login errors not showing correctly (appears to be server-side issue with connect-flash).
* TODO: Create e2e/unit tests.
* TODO: Allow professors and students to manage/view courses from multiple terms (currently, only Spring 2017 courses can be seen/edited).
* TODO: Ideally, update all course information (title, catalog number, etc.) on the server side instead of with AngularFire2.
* TODO: Update styling on the professor side of the application.
* TODO: Host the site on a Northwestern server.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
