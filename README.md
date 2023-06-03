# Contacts App in React Native with Apk

This project is a native application that can run on **android**, **ios** and **web** as well this app can request app permissions and after getting contacts permission it can fetch whole list of contacts which is available in phone user can search contacts as well while we click on contact it will display contact details in dismissable modal user can dismiss it by clicking close or outside of the app.

## Download App From Releases at right or apk linked in repo or From Gdrive

**https://drive.google.com/file/d/19GJIco5rWBg3_yg15YuW7smW6LJDV42n/view?usp=sharing**

## Tech Stack

**Client:** react-native, expo, CSS, expo-contacts, eas.

**React-native:** React Native is a popular open-source framework developed by Facebook that allows developers to build cross-platform mobile applications using JavaScript and React. It enables the creation of native mobile apps for iOS and Android platforms, sharing a significant amount of code between them.

**expo:** Expo is an open-source platform that provides a set of tools and services for building and deploying React Native apps with ease. It offers a streamlined development experience, including features like hot reloading, built-in device testing, and simplified app distribution.

**expo-contacts Module:** Expo Contacts is a module provided by Expo SDK that simplifies access to the device's contact list in React Native apps, allowing developers to easily retrieve, create, update, and delete contacts. It provides a unified interface for working with contacts across iOS and Android platforms, saving development time and effort.

**eas:** It's a CLI tool to deploy our app on expo servers and get back apk.

## Code Explanation

### ContactCard.js:

Renders a contact card with the contact's name and phone number, allowing the user to interact with the contact by pressing on the card.

### SearchInput.js:

Displays a search input field where users can enter search queries to filter the displayed contacts based on their names.

### ModalBox.js:

Renders a modal box with contact details including the contact's name and phone number, providing a way to view additional information about a selected contact.

### Heading.js:

Displays a header with the title "Contact App" and an image, providing a visual branding element for the contact app.

### ContactsScreen.js:

Serves as the main component for the contact app, managing the state of contacts, search queries, filtered contacts, and the visibility of the modal box. It also handles the retrieval of contacts from the device and renders the contact list along with the search input and the modal box.

## Screenshots

![](https://github.com/nikhil-banga/contacts-app-react-native/blob/master/Screenshots/2.png?raw=true)

![](https://github.com/nikhil-banga/contacts-app-react-native/blob/master/Screenshots/3.png?raw=true)

![](https://github.com/nikhil-banga/contacts-app-react-native/blob/master/Screenshots/4.png?raw=true)

## Running the Project

### Run Locally

Clone the project

```bash
  git clone https://github.com/nikhil-banga/contacts-app-react-native
```

Go to the project directory

```bash
  cd contacts-app-react-native
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
