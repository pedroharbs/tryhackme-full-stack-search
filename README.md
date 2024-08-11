# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

<img src="./assets/search-example.png" width="400px" />

### Write-up

**GENERAL:**

- **Introduced Shared Package Schema:** Created a new shared package schema to standardize data structures and facilitate code sharing between different projects.

**API:**

- **Standardized JSON field names:** Updated naming conventions to camelCase to align with common JavaScript practices, enhancing consistency and readability.
- **Added Zod library for Environment Variable Validation:** Implemented Zod to enhance environment variable validation, offering robust validation rules, default values, and detailed error reporting.
- **Refactored MongoDB Connection Logic:** MongoDB connection logic out of route handlers to a dedicated module for improved organization and reusability.
- **Implemented Controller and Service Pattern:** Introduced a controller and service pattern to enhance separation of concerns and streamline business logic management.
- **Added Dependency Injection:** Integrated dependency injection to better manage dependencies, improving testability and flexibility.
- **Centralized Error Handling:** Added a consistent error handling mechanism to improve reliability and user experience across the application.
- **Refactored Route Management:** Moved hotel-related routes to a dedicated routes folder, enhancing code organization and maintainability.
- **Improved Code Organization:** Relocated code to the src directory, resulting in a more organized and readable project structure.

**FRONTEND:**

- **Standardized JSON field names:** Updated naming conventions to camelCase to align with common JavaScript practices, enhancing consistency and readability.
- **Separated API Call and Added Debounce:** Refactored the API call logic into a dedicated service and implemented a debounce mechanism to optimize search performance and reduce unnecessary API requests.
- **Enhanced Hotel Search Functionality:** Improved search functionality to filter hotels based on user input, providing a more dynamic and responsive search experience.
- **Split Search Bar into Components:** Refactored the search bar into a standalone component, improving code organization and reusability across different parts of the application.
- **Implemented Routing with React Router DOM:** Added routing capabilities using React Router DOM to manage navigation within the application, including dynamic route handling for hotel details.

### Database structure

#### Hotels Collection

```json
[
  {
    "chainName": "Samed Resorts Group",
    "hotelName": "Sai Kaew Beach Resort",
    "addressLine1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressLine2": "",
    "zipCode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryIsoCode": "TH",
    "starRating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryIsoCode": "BE"
  },
  {
    /* ... */
  }
]
```
