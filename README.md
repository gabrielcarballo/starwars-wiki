# Star Wars Planets Wiki

## Project Overview

This project is a web application that allows users to filter through a list of planets from the Star Wars universe. Developed as part of a bootcamp, the project involves implementing various features using React with Context API and Hooks. The primary focus is on enhancing front-end skills while simulating a real-world scenario.

## Development

### Technologies

- React
- Context API
- React Hooks (useState, useEffect, useContext, useMemo)
- React Testing Library
- Jest
- Custom Hooks

### Project Structure

The project is structured around multiple React components, each serving a specific function:

- **ApiProvider:** This component fetches the data from the Star Wars API and provides it to the rest of the application using Context API.
- **Table:** Responsible for displaying the list of planets and their respective data.
- **Filters:** Renders a form for adding, editing, and removing filters.
- **Sort:** Allows the user to sort the data based on different columns.

### Project Requirements

The project successfully meets the specified requirements from the bootcamp readme:

1. **Fetch Data:** Fetch data from the Star Wars API and display it in a table.
2. **Text Filter:** Implement a text filter that updates the table as the user types.
3. **Numeric Filters:** Implement numeric filters that the user can add, edit, and remove.
4. **Sort:** Allow the user to sort the data based on different columns.
5. **Unit Testing:** Develop unit tests to achieve 30%, 60%, and 90% coverage of the application.

## Code Annotations

The global state of the application is structured as follows:

```javascript
{
  "count": 0, // The total number of planets
  "next": "", // The URL of the next page of results
  "previous": "", // The URL of the previous page of results
  "results": [ // An array of planet objects
    {
      "name": "", // The name of the planet
      "rotation_period": "", // The length of a day on the planet, in hours
      "orbital_period": "", // The length of a year on the planet, in days
      "diameter": "", // The diameter of the planet, in kilometers
      "climate": "", // The climate of the planet
      "gravity": "", // The gravity of the planet
      "terrain": "", // The terrain of the planet
      "surface_water": "", // The percentage of the planet's surface that is covered by water
      "population": "", // The population of the planet
      "films": [""], // An array of URLs, each pointing to an API endpoint for a film that features the planet
      "created": "", // The date and time the planet was added to the database
      "edited": "", // The date and time the planet was last updated in the database
      "url": "" // The URL of the API endpoint for the planet
    }
  ]
}
```

This state is managed using the Context API, Hooks, and memoization techniques. The ApiProvider component fetches the data from the Star Wars API and provides it to the rest of the application. To avoid unnecessary fetches and optimize performance, the fetched data is memoized. This means that the data is stored in memory after the first fetch, and subsequent renders use the stored data instead of fetching it again. The Table component displays the data, and the Filters and Sort components allow the user to manipulate the data.

## Feedback

Your feedback is invaluable! Please share your thoughts and suggestions regarding the project. I am eager to incorporate any insights you may have.

## Portfolio

Check out my [portfolio](my-folio-weld.vercel.app/) for more of my work!