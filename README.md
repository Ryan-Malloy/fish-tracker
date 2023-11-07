# Fish Tracker App

## Overview

Fish Tracker is a React-based application designed for fish enthusiasts to track and monitor their fish collections. This app provides a user-friendly interface for managing fish databases, including features for admins such as dashboard access and image uploads.

### Tech Stack and Architecture

- **Front-end:** React.js
- **Authentication:** Firebase Authentication
- **Database:** Firebase Realtime Database
- **Storage:** Firebase Cloud Storage
- **Styling:** Bootstrap with custom CSS

The front-end is built using React.js, creating a single-page application (SPA) that interacts with Firebase for backend operations. The Firebase Authentication is used for handling user sign-in and sign-out processes. Firebase Realtime Database is utilized for storing fish data, and Firebase Cloud Storage is used for image uploads.

### Setup and Installation Instructions

To get this project running on your local machine, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/Ryan-Malloy/fish-tracker.git
cd fish-tracker
```

2. **Install Dependencies**

```npm install```

3. **Set up Firebase**

Create a Firebase project and add your Firebase config to a **.env** file at the root of your project using the template provided in the **.env.example** file.

4. **Start the development server**

```npm start```

The app should now be running on http://localhost:3000.

### Summary of Design and Development Choices
In designing the Fish Tracker App, I aimed to create a responsive, user-friendly interface that could be easily navigated on both desktop and mobile devices. React.js was chosen for its component-based architecture, making the UI modular and maintainable.

Firebase was selected for the backend due to its ease of use, scalability, and seamless integration with the front-end. It eliminated the need for setting up a separate backend server, thus speeding up development.

I also decided to use Bootstrap for styling to ensure a consistent look across different browsers and devices. It also helped in speeding up the development process by providing a set of pre-designed components.

For source control, Git was used, and the repository was hosted on GitHub, providing a comprehensive version control system and easy code reviews.

### Contributors
**Ryan Malloy**