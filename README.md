# Open Educational Resouces (OER)
![alt text](https://img.shields.io/badge/Northwestern-University-3b1973.svg)
## Set Up
### Required Credentials/API Keys
| APIs | Details |
| ------ | ------ |
| Northwestern Course Data | http://developer.asg.northwestern.edu/docs/ |

Once you have recieved an API key:
* Enter the [management console](https://api.asg.northwestern.edu/manage/login).
* Allow referers depending on the domain(s) from which you will be making request.
* (Add `*` to allow all domains)

| Credentials | Details |
| ------ | ------ |
| Firebase | Admin SDK Privileges |
| LDAP | Authentication |

You should include all required credentials/private keys and environment variables in a `.env` file stored in the root directory of the project. Contact Chris Chen at ChristopherChen2018@u.northwestern.edu to acquire the credentials.

### Required Tools
#### Node.js and npm
Download the most recent version of [Node.js](https://nodejs.org/en/), which should include the [Node Package Manager](https://www.npmjs.com/) (npm), and verify them.
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
* Verify the version
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
Open a browser window and go to ```http://localhost:5000/``` to view the project.

Each time you make changes to the code:
* Stop the heroku server
    * ```ctrl-c```
* Rebuild the project
* Restart the heruko instance.
```
ng build && heroku local
```
## Known Bugs / TODO
* Need to user test and create e2e/unit tests.
* The application only shows and allows for managing courses from the most recent term (Spring 2017).
* You can add a textbook without adding a URL (form validation issue).
* Removing all textbooks from a course does not remove the course from the browse list in real time.
* More informative login errors not showing correctly (appears to be server-side issue with connect-flash).
* Ideally, update all course information (title, catalog number, etc.) on the server side instead of with AngularFire2.
* Styling should be updated on the Professor login side.
* Site needs to be hosted on a Northwestern server.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
