# JS SQS Queue API
This API is to be used as a queue producer/consumer service

---

- [Motivation](#motivation)
- [Code Style](#code-style)
- [Techs](#techs)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Tests](#tests)
- [Deploying to production](#deploying-to-production)
- [License](#license)

# Motivation
This project was created as a test for a startup company

# Code Style

[standard](https://standardjs.com)

[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
`extending standard`
  ```{
    "extends": [
      "standard"
    ]
  }
  ```

# Techs
- Language
    - JavaScript
- Environment
    - [NodeJS 14](https://nodejs.org/docs/v14.17.0/api)
- Frameworks
    - [ExpressJS](https://expressjs.com/pt-br/)
- Libraries
    - [npm](https://www.npmjs.com/)
    - [yarn](https://yarnpkg.com/) `(optional)`
    - Configuration
        - [dotenv](https://www.npmjs.com/package/dotenv)
        - [esm](https://www.npmjs.com/package/esm)
        - [module-alias](https://www.npmjs.com/package/module-alias)


# Quick Start


### Steps
1. Clone this repository into your local machine using http or
    ssh
    ```bash
      git clone https://github.com/deborapoh/js-queue-api.git
    ```


2. Inside the root folder of this project, run `yarn` command to install dependencies
    ```bash
      yarn
    ```


3. Create a file called `.env` in the root of the project and copy `.env.sample`'s content.


4. Run the project:
    ```bash
      # to run the application
      yarn serve

      # to run the application with nodemon
      yarn dev

      # to run lint and fix style issues
      yarn lint --fix
    ```

5. Checkout the API Reference


# API Reference

You can find Postman documentation [here](https://documenter.getpostman.com/view/1786741/TzzEpaM5)


# Tests
```bash
  # to test application
  yarn test
```


# Deploying to production
  When deploying the queue, if there is need for scale. One can go to a few directions:

  - If deploying in AWS:
        - You can create an auto scaling group to manage EC2 instances, together with a Amazon CloudWatch that measures the number of messages in the queue per EC2 instance in the Auto Scaling group and an alarm that invokes the scaling policy.

  - You can also increase the number of threads and add more clients.

  - You can also use KafkaJS that is already highly recomended for handling too many messages concurrently.

  - You can also use RabbitMQ, although rabbit is not recomended for handling too many messages concurrently.

  - You can also use AWS SQS.


# License
MIT
