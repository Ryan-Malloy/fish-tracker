# Fish Tracker App

## Overview

Fish Tracker is a comprehensive React-based web application engineered to serve hatchery managers. The platform is tailored to facilitate the inventory management and monitoring of fish populations allowing for detailed tracking of fish growth and statistics over time.

### Tech Stack and Architecture

- **Front-end:** React.js
- **Authentication:** Firebase Authentication
- **Database:** Firebase Realtime Database
- **Storage:** Firebase Cloud Storage
- **Styling:** Bootstrap with custom CSS
- **Routing:** React Router

The front-end is built using React.js, creating a single-page application (SPA) that interacts with Firebase for backend operations. Firebase Authentication is used for handling user sign-in and sign-out processes. Firebase Realtime Database is utilized for storing fish data, and Firebase Cloud Storage is used for image uploads. Bootstrap is used for responsive styling, and React Router manages navigation within the app.

### Setup and Installation Instructions

To get this project running on your local machine, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/Ryan-Malloy/fish-tracker.git
cd fish-tracker
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set up Firebase**

Create a Firebase project and add your Firebase config to a **.env** file at the root of your project.

4. **Start the development server**

```bash
npm start
```

The app should now be running on http://localhost:3000.

### Summary of Design and Development Choices
In designing the Fish Tracker App, I aimed to create a responsive, user-friendly interface that could be easily navigated on both desktop and mobile devices. React.js was chosen for its component-based architecture, making the UI modular and maintainable.

Firebase was selected for the backend due to its ease of use, scalability, and seamless integration with the front-end. It eliminated the need for setting up a separate backend server, thus speeding up development.

I also decided to use Bootstrap for styling to ensure a consistent look across different browsers and devices. It also helped in speeding up the development process by providing a set of pre-designed components.

For source control, Git was used, and the repository was hosted on GitHub, providing a comprehensive version control system and easy code reviews.

### Contributors
**Ryan Malloy**

