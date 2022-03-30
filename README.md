# E2E P&P 🔌

Repository designed to perform end-to-end tests using Cypress in our plugins.

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

- #### Installation on Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.9.1

    $ npm --version
    7.23.0

## Installation ( project dependency )

After cloning this repository, go to project root folder and use the package manager [npm](https://npmjs.org/) to install all projects dependencies listed in package.json.

```bash
npm install
```

## Usage

### Plugin script

The project uses a shell script to handle the need to run tests according to the plugin, to parameterize the shell script follow the instructions below.

- In your terminal, inside the project folder, run the command:

```bash
pwd
```

- Copy the result of the command.
- Inside the lib/ folder, open the plugins-e2e.sh file
- Paste the path of the folder in the variable E2E_PATH
- In your terminal, in the project root, run the following commands:

```bash
$ cp lib/plugins-e2e.sh /usr/local/bin/.
$ mv /usr/local/bin/plugins-e2e.sh /usr/local/bin/plugins-e2e
$ chmod +x /usr/local/bin/plugins-e2e
```

Ready, the command _'plugins-e2e + plugin-platform'_ will now be working from anywhere and will run all tests. Example:

```bash
plugins-e2e woocommerce
```

### Cypress.env

We use Cypress.env to handle fixtures that have sensitive data (like credit card numbers) or that are personal to each developer (like test user email and password). The cypress.env.json file is listed in gitignore, so it will not be present when you clone the project. You need to create it manually so, create a file called cypress.env.json in the root of the project and for each siteID put the fields as exemplified below:

```json
{
  "mlb": {
    "user": {
      "email": "some@email.com",
      "password": "somePass"
    },
    "document": {
      "cpf": "some doc number",
      "cnpj": "some doc number"
    },
    "cards": {
      "amex": {
        "number": "credit card number",
        "expirationDate": "00/00",
        "cvv": "0000"
      },
      "master": {
        "number": "credit card number",
        "expirationDate": "00/00",
        "cvv": "000"
      }
    }
  },
  "mla": {
    //other fields
  }
}
```

## Contributing ( how to write new tests )

As already mentioned, the project uses Cypress as a testing framework, so the basis for all testing can be found in the [official Cypress website](https://www.cypress.io/).

### Cypress folder

- in the cypress/fixtures folder should be the test helper data.
- in the cypress/fixtures folder should be the test scenarios, written with [Gherkin syntax](https://cucumber.io/docs/gherkin/)

### Plugin folder

To control the platform and plugin pages we use patter [Page Objects](https://martinfowler.com/bliki/PageObject.html), so:

- in the plugin-name/support/elements folder should be the elements that make up the canvas.
- in the plugin-name/support/pageObjects folder should be the abstract representation of the page itself.

and finally, the execution of the test itself must be in plugin-name/support/steps folder.

remember:
<img src="https://files.slack.com/files-pri/T02AJUT0S-F039D9XREFN/bugs.jpeg" alt="bugs" style="height: 100px; width:100px;"/>
