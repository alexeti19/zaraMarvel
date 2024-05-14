React + Vite Marvel Filter App
This application allows users to search and display Marvel characters. Users can type a name in the search bar, displaying up to 50 characters and 20 comics related to the input. The app includes responsive design with dynamic components that communicate efficiently with the Marvel API to display images, names, and descriptions of characters. Additionally, users can favorite characters by clicking a heart icon, which saves to a favorites component for easy access.

Design
The design follows a Figma template, featuring a cool CSS effect where a red background scrolls down over the card details upon hover. It is fully responsive: mobile and tablets versions.

Development
This setup uses Vite for building the React application with Hot Module Replacement (HMR) and includes ESLint rules for code quality.

Plugins
@vitejs/plugin-react: Utilizes Babel for Fast Refresh.
@vitejs/plugin-react-swc: Employs SWC for Fast Refresh.
Commands
npm run dev: Launches the app in development mode at http://localhost:5173.
npm run build: Builds the app for production, optimizing for performance.
Dependencies
axios
react-router-dom
react-icons
jest for testing
