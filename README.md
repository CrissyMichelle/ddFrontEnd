# dfacDash App front end
Deployed at: [dfacDash Live Site](https://dfacdash-front.onrender.com)

## Description
Single-page React application front end that mimics menutigr.com's user interface for placing meal orders online. Connects with the dfacDash backend API [https://github.com/CrissyMichelle/dfacDash](https://github.com/CrissyMichelle/dfacDash)

## Features
- **Browse available meals, login, and place orders online**: Allows users to view all available meals, the meals available at a specific restaurant (DFAC). They can then login and place an order for what they would like.
- **Real-Time Order Tracking**: Culinarians working at the DFACs can see customer orders and update their status. The user will be able to refresh their personal order history and see exactly when the DFAC has their meal ready for pickup.
- **Responsive Design**: @media viewscreen CSS styles ensure a seamless experience across both desktop and mobile devices.

## User Flow
1. **Home Page**: Upon visiting the [dfacDash landing page](https://dfacdash-front.onrender.com) users can easily navigate to the list of available meals or interact with the intuitive navigation bar.
2. **DFACs page**: Customers can see at a glance the different hours and locations of all the available dining facilities and then decide from where to order their meal.
3. **Selecting Meals and Placing Orders**: Users can add/remove meals from their cart. After creating/logging into their account they can place an order from their cart's page.
4. **Culinarian Users**: Meanwhile 92 Golfs working at the DFAC can see all the orders customers place from their culinarian account, and update the status with ready-for-pickup and order complete (customer came and picked up the meal).
5. **Order Confirmation and Tracking**: Customers can visit their order history page and see the status of their orders in real-time as DFAC personnel update the order from the 92G account.

## API Integration
The dfacDash frontend integrates with a custom backend API available at [https://github.com/CrissyMichelle/dfacDash](https://github.com/CrissyMichelle/dfacDash).

Authentication through JWT tokens ensures secure access via unique usernames and hashed passwords.

## Technologies Used
- React, Create-React-App, react-router
- Backend uses Node.js and Express
- PostgreSQL database

## Setup and Installation
Default instructions from the npx create-react-app boiler plate:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Status and Future Plans

- Special thanks to my Springboard Software Engineering Career Course mentor, Himank Bhalla, and a very special thanks to my colleagues at the Lightning Labs Software Dev Team!
- Features still under development:
  - more detailed pages specific to a single DFAC
  - editing capabilities for users to customize/update information on their accounts or meals or their DFAC, etc.
  - Surrogate ordering where an authorized individual can pickup meals for their teammates
- Future goals include building a React Native front end for mobile apps, enabling stream-lined login process utilizing ID scanning, and connecting the backend API with larger databases and national systems of record.

## Contact
- [CrissyMichelle on GitHub](https://github.com/CrissyMichelle)
- [CrissyMichelle on LinkedIn](www.linkedin.com/in/crissy-michelle-cabrera)
